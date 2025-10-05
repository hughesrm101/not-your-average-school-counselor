import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getCurrentUser, signIn, signOut } from '@/lib/auth'

// Mock the AWS SDK
vi.mock('@aws-sdk/client-cognito-identity-provider', () => ({
  CognitoIdentityProviderClient: vi.fn(),
  GetUserCommand: vi.fn(),
  InitiateAuthCommand: vi.fn(),
  GlobalSignOutCommand: vi.fn(),
}))

describe('Auth utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getCurrentUser', () => {
    it('should return null when no token is provided', async () => {
      const result = await getCurrentUser()
      expect(result).toBeNull()
    })

    it('should return user data when valid token is provided', async () => {
      // Mock successful Cognito response
      const mockUser = {
        Username: 'test-user',
        UserAttributes: [
          { Name: 'email', Value: 'test@example.com' },
          { Name: 'name', Value: 'Test User' },
        ],
      }

      vi.mocked(require('@aws-sdk/client-cognito-identity-provider').GetUserCommand).mockImplementation(() => ({
        send: vi.fn().mockResolvedValue(mockUser),
      }))

      // Mock localStorage or cookies for token
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: vi.fn().mockReturnValue('mock-token'),
        },
        writable: true,
      })

      const result = await getCurrentUser()
      expect(result).toEqual({
        id: 'test-user',
        email: 'test@example.com',
        name: 'Test User',
      })
    })
  })

  describe('signIn', () => {
    it('should throw error for invalid credentials', async () => {
      vi.mocked(require('@aws-sdk/client-cognito-identity-provider').InitiateAuthCommand).mockImplementation(() => ({
        send: vi.fn().mockRejectedValue(new Error('Invalid credentials')),
      }))

      await expect(signIn('test@example.com', 'wrong-password')).rejects.toThrow('Invalid credentials')
    })

    it('should return user data for valid credentials', async () => {
      const mockAuthResult = {
        AuthenticationResult: {
          AccessToken: 'mock-access-token',
          IdToken: 'mock-id-token',
          RefreshToken: 'mock-refresh-token',
        },
      }

      vi.mocked(require('@aws-sdk/client-cognito-identity-provider').InitiateAuthCommand).mockImplementation(() => ({
        send: vi.fn().mockResolvedValue(mockAuthResult),
      }))

      const result = await signIn('test@example.com', 'correct-password')
      expect(result).toBeDefined()
    })
  })

  describe('signOut', () => {
    it('should clear tokens and redirect', async () => {
      const mockSignOut = vi.fn().mockResolvedValue({})
      vi.mocked(require('@aws-sdk/client-cognito-identity-provider').GlobalSignOutCommand).mockImplementation(() => ({
        send: mockSignOut,
      }))

      // Mock window.location
      delete (window as any).location
      window.location = { href: '' } as any

      await signOut()
      
      expect(mockSignOut).toHaveBeenCalled()
    })
  })
})
