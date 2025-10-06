import { CognitoIdentityProviderClient, InitiateAuthCommand, GlobalSignOutCommand } from '@aws-sdk/client-cognito-identity-provider';
import { User, UserRole } from '@/types';

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
});

const USER_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!;
const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;

// Client-side authentication functions

// Sign in with email and password
export async function signIn(email: string, password: string): Promise<any> {
  try {
    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    const response = await cognitoClient.send(command);
    
    if (response.AuthenticationResult) {
      // Store tokens in localStorage for client-side access (only in browser)
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', response.AuthenticationResult.AccessToken || '');
        localStorage.setItem('id_token', response.AuthenticationResult.IdToken || '');
        localStorage.setItem('refresh_token', response.AuthenticationResult.RefreshToken || '');
        localStorage.setItem('expires_at', (Date.now() + (response.AuthenticationResult.ExpiresIn || 3600) * 1000).toString());
      }
      
      return response.AuthenticationResult;
    }
    
    throw new Error('Authentication failed');
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

// Sign out
export async function signOut(): Promise<void> {
  try {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('access_token');
      
      if (accessToken) {
        const command = new GlobalSignOutCommand({
          AccessToken: accessToken,
        });
        
        await cognitoClient.send(command);
      }
    }
  } catch (error) {
    console.error('Sign out error:', error);
  } finally {
    // Clear local storage (only in browser)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('expires_at');
      
      // Redirect to home page
      window.location.href = '/';
    }
  }
}

// Get current user from localStorage (client-side)
export function getCurrentUser(): User | null {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const idToken = localStorage.getItem('id_token');
    
    if (!idToken) {
      return null;
    }
    
    // Decode JWT token (client-side only, not verified)
    const payload = JSON.parse(atob(idToken.split('.')[1]));
    
    return {
      id: payload['cognito:username'] || payload.sub,
      email: payload.email,
      name: payload.name || `${payload.given_name} ${payload.family_name}`,
      avatar: payload.picture || '',
      role: 'user', // Default role, will be updated by RBAC
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as any;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Check if user is authenticated (client-side)
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const accessToken = localStorage.getItem('access_token');
  const expiresAt = localStorage.getItem('expires_at');
  
  if (!accessToken || !expiresAt) {
    return false;
  }
  
  // Check if token is expired
  return Date.now() < parseInt(expiresAt);
}

// Get access token (client-side)
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem('access_token');
}

// Get ID token (client-side)
export function getIdToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem('id_token');
}

// Get refresh token (client-side)
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem('refresh_token');
}

// Check if token is expired
export function isTokenExpired(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }
  
  const expiresAt = localStorage.getItem('expires_at');
  
  if (!expiresAt) {
    return true;
  }
  
  return Date.now() >= parseInt(expiresAt);
}

// Redirect to Cognito hosted UI
export function redirectToCognitoHostedUI(): void {
  const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN || 'nyasc-auth';
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
  const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
  const responseType = 'code';
  const scope = 'email openid profile';
  
  const hostedUIUrl = `https://${domain}.auth.${process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1'}.amazoncognito.com/login?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}`;
  
  window.location.href = hostedUIUrl;
}

// Handle Cognito callback
export async function handleCognitoCallback(code: string): Promise<any> {
  try {
    const response = await fetch('/api/auth/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
    
    if (!response.ok) {
      throw new Error('Authentication callback failed');
    }
    
    const result = await response.json();
    
    // Store tokens (only in browser)
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', result.accessToken);
      localStorage.setItem('id_token', result.idToken);
      localStorage.setItem('refresh_token', result.refreshToken);
      localStorage.setItem('expires_at', result.expiresAt.toString());
    }
    
    return result;
  } catch (error) {
    console.error('Callback error:', error);
    throw error;
  }
}

// Auth configuration for client-side
export const authConfig = {
  userPoolId: USER_POOL_ID,
  clientId: CLIENT_ID,
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
  domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN || 'nyasc-auth',
  redirectUri: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI || 'http://localhost:3000/auth/callback',
  logoutUri: process.env.NEXT_PUBLIC_COGNITO_LOGOUT_URI || 'http://localhost:3000/',
};