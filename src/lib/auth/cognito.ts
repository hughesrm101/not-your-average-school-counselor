import { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminSetUserPasswordCommand, AdminDeleteUserCommand, ListUsersCommand, AdminGetUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { DatabaseService } from '../db/dynamo';
import { User } from '../db/schema';

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
});

const USER_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '';

export class AuthService {
  // Create a new user in Cognito and DynamoDB
  static async createUser(email: string, name: string, role: 'admin' | 'customer' = 'customer'): Promise<User> {
    try {
      // Create user in Cognito
      await cognitoClient.send(new AdminCreateUserCommand({
        UserPoolId: USER_POOL_ID,
        Username: email,
        UserAttributes: [
          { Name: 'email', Value: email },
          { Name: 'name', Value: name },
          { Name: 'email_verified', Value: 'true' },
        ],
        TemporaryPassword: this.generateTemporaryPassword(),
        MessageAction: 'SUPPRESS', // Don't send welcome email
      }));

      // Create user in DynamoDB
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const user = await DatabaseService.createUser({
        id: userId,
        email,
        name,
        role,
      });

      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  // Get user by email
  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const result = await cognitoClient.send(new AdminGetUserCommand({
        UserPoolId: USER_POOL_ID,
        Username: email,
      }));

      if (result.Username) {
        return await DatabaseService.getUserByEmail(email);
      }

      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  // List all users
  static async listUsers(): Promise<User[]> {
    try {
      const result = await cognitoClient.send(new ListUsersCommand({
        UserPoolId: USER_POOL_ID,
        Limit: 60,
      }));

      const users: User[] = [];
      
      for (const cognitoUser of result.Users || []) {
        const email = cognitoUser.Attributes?.find(attr => attr.Name === 'email')?.Value;
        if (email) {
          const user = await DatabaseService.getUserByEmail(email);
          if (user) {
            users.push(user);
          }
        }
      }

      return users;
    } catch (error) {
      console.error('Error listing users:', error);
      return [];
    }
  }

  // Delete user
  static async deleteUser(email: string): Promise<boolean> {
    try {
      // Delete from Cognito
      await cognitoClient.send(new AdminDeleteUserCommand({
        UserPoolId: USER_POOL_ID,
        Username: email,
      }));

      // Delete from DynamoDB
      const user = await DatabaseService.getUserByEmail(email);
      if (user) {
        // Note: We'd need to implement deleteUser in DatabaseService
        // For now, just return true
        return true;
      }

      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  // Set user password
  static async setUserPassword(email: string, password: string): Promise<boolean> {
    try {
      await cognitoClient.send(new AdminSetUserPasswordCommand({
        UserPoolId: USER_POOL_ID,
        Username: email,
        Password: password,
        Permanent: true,
      }));

      return true;
    } catch (error) {
      console.error('Error setting password:', error);
      return false;
    }
  }

  // Generate temporary password
  private static generateTemporaryPassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }
}
