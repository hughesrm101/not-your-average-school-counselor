import { CognitoIdentityProviderClient, GetUserCommand, AdminGetUserCommand, AdminListGroupsForUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { jwtVerify, createRemoteJWKSet } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { User, UserRole } from '@/types';

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION || 'us-east-1',
});

const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID!;
const CLIENT_ID = process.env.COGNITO_CLIENT_ID!;

// JWKS endpoint for token verification
const JWKS_URL = `https://cognito-idp.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${USER_POOL_ID}/.well-known/jwks.json`;
const JWKS = createRemoteJWKSet(new URL(JWKS_URL));

export interface CognitoUser {
  sub: string;
  email: string;
  email_verified: boolean;
  given_name: string;
  family_name: string;
  name: string;
  'cognito:groups'?: string[];
  'cognito:username': string;
  token_use: string;
  scope: string;
  auth_time: number;
  iss: string;
  exp: number;
  iat: number;
  jti: string;
}

export interface Session {
  user: CognitoUser;
  accessToken: string;
  idToken: string;
  refreshToken?: string;
  expiresAt: number;
}

// Get session from cookies (server-side only)
export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    const idToken = cookieStore.get('id_token')?.value;
    const refreshToken = cookieStore.get('refresh_token')?.value;
    const expiresAt = cookieStore.get('expires_at')?.value;

    if (!accessToken || !idToken || !expiresAt) {
      return null;
    }

    // Check if token is expired
    if (Date.now() >= parseInt(expiresAt)) {
      return null;
    }

    // Verify the token
    const { payload } = await jwtVerify(accessToken, JWKS, {
      issuer: `https://cognito-idp.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${USER_POOL_ID}`,
      audience: CLIENT_ID,
    });

    return {
      user: payload as unknown as CognitoUser,
      accessToken,
      idToken,
      refreshToken,
      expiresAt: parseInt(expiresAt),
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

// Get current user (server-side only)
export async function getCurrentUser(): Promise<CognitoUser | null> {
  const session = await getSession();
  return session?.user || null;
}

// Check if user is authenticated (server-side only)
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

// Get user roles from Cognito groups
export function getUserRoles(user: CognitoUser): UserRole[] {
  const groups = user['cognito:groups'] || [];
  const roles: UserRole[] = ['user']; // Default role

  if (groups.includes('superadmin')) {
    roles.push('superadmin');
  }
  if (groups.includes('admin')) {
    roles.push('admin');
  }

  return roles;
}

// Check if user has specific role
export function hasRole(user: CognitoUser, role: UserRole): boolean {
  const roles = getUserRoles(user);
  return roles.includes(role);
}

// Check if user is admin (admin or superadmin)
export function isAdmin(user: CognitoUser): boolean {
  return hasRole(user, 'admin') || hasRole(user, 'superadmin');
}

// Check if user is superadmin
export function isSuperAdmin(user: CognitoUser): boolean {
  return hasRole(user, 'superadmin');
}

// Require authentication middleware (server-side only)
export async function requireAuth(): Promise<CognitoUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/auth/login');
  }
  return user;
}

// Require admin role middleware (server-side only)
export async function requireAdmin(): Promise<CognitoUser> {
  const user = await requireAuth();
  if (!isAdmin(user)) {
    redirect('/unauthorized');
  }
  return user;
}

// Require superadmin role middleware (server-side only)
export async function requireSuperAdmin(): Promise<CognitoUser> {
  const user = await requireAuth();
  if (!isSuperAdmin(user)) {
    redirect('/unauthorized');
  }
  return user;
}

// Get user details from Cognito
export async function getUserDetails(username: string): Promise<any> {
  try {
    const command = new AdminGetUserCommand({
      UserPoolId: USER_POOL_ID,
      Username: username,
    });
    
    const response = await cognitoClient.send(command);
    return response;
  } catch (error) {
    console.error('Error getting user details:', error);
    throw error;
  }
}

// Get user groups from Cognito
export async function getUserGroups(username: string): Promise<string[]> {
  try {
    const command = new AdminListGroupsForUserCommand({
      UserPoolId: USER_POOL_ID,
      Username: username,
    });
    
    const response = await cognitoClient.send(command);
    return response.Groups?.map(group => group.GroupName || '') || [];
  } catch (error) {
    console.error('Error getting user groups:', error);
    return [];
  }
}

// Check if MFA is required for user
export async function isMFARequired(user: CognitoUser): Promise<boolean> {
  // MFA is required for admin users
  return isAdmin(user);
}

// Generate referral code for user
export function generateReferralCode(user: CognitoUser): string {
  const username = user['cognito:username'];
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${username.substring(0, 3)}${random}`;
}

// Validate referral code format
export function isValidReferralCode(code: string): boolean {
  return /^[A-Z0-9]{6,8}$/.test(code);
}

// Get user from database by Cognito user
export async function getDbUser(cognitoUser: CognitoUser): Promise<User | null> {
  try {
    const { db } = await import('@/lib/db/dynamo');
    const users = await db.queryItems('USER', 'GSI1PK = :email', { ':email': cognitoUser.email }, 'GSI1');
    return users[0] as User || null;
  } catch (error) {
    console.error('Error getting database user:', error);
    return null;
  }
}

// Create or update user in database
export async function syncUserToDatabase(cognitoUser: CognitoUser): Promise<User> {
  try {
    const { db, generateId } = await import('@/lib/db/dynamo');
    
    // Check if user exists
    const existingUsers = await db.queryItems('USER', 'GSI1PK = :email', { ':email': cognitoUser.email }, 'GSI1');
    
    if (existingUsers.length > 0) {
      // Update existing user
      const existingUser = existingUsers[0] as User;
      const updatedUser = {
        ...existingUser,
        name: cognitoUser.name,
        firstName: cognitoUser.given_name,
        lastName: cognitoUser.family_name,
        lastLoginAt: new Date().toISOString(),
      };
      
      await db.putItem(updatedUser);
      return updatedUser;
    } else {
      // Create new user
      const userId = generateId('user');
      const referralCode = generateReferralCode(cognitoUser);
      const roles = getUserRoles(cognitoUser);
      
      const newUser: User = {
        PK: `USER#${userId}`,
        SK: 'PROFILE',
        GSI1PK: cognitoUser.email,
        GSI1SK: 'USER',
        GSI4PK: referralCode,
        GSI4SK: 'USER',
        userId,
        email: cognitoUser.email,
        name: cognitoUser.name,
        firstName: cognitoUser.given_name,
        lastName: cognitoUser.family_name,
        roles,
        mfaEnabled: false, // Will be updated when MFA is set up
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        referralCode,
        preferences: {
          topics: [],
          frequency: 'weekly',
          notifications: {
            email: true,
            marketing: true,
            updates: true,
          },
        },
      };
      
      await db.putItem(newUser);
      return newUser;
    }
  } catch (error) {
    console.error('Error syncing user to database:', error);
    throw error;
  }
}

// Clear session (logout) - server-side only
export function clearSession() {
  const cookieStore = cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('id_token');
  cookieStore.delete('refresh_token');
  cookieStore.delete('expires_at');
}

// Set session cookies - server-side only
export function setSessionCookies(session: Session) {
  const cookieStore = cookies();
  const expiresAt = new Date(session.expiresAt);
  
  cookieStore.set('access_token', session.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
  });
  
  cookieStore.set('id_token', session.idToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
  });
  
  if (session.refreshToken) {
    cookieStore.set('refresh_token', session.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });
  }
  
  cookieStore.set('expires_at', session.expiresAt.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
  });
}

// Auth configuration for Next.js
export const authConfig = {
  userPoolId: USER_POOL_ID,
  clientId: CLIENT_ID,
  region: process.env.AWS_REGION || 'us-east-1',
  domain: process.env.COGNITO_DOMAIN || 'nyasc-auth',
  redirectUri: process.env.COGNITO_REDIRECT_URI || 'http://localhost:3000/auth/callback',
  logoutUri: process.env.COGNITO_LOGOUT_URI || 'http://localhost:3000/',
};
