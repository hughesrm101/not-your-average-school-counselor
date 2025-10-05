import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand, DeleteCommand, QueryCommand, ScanCommand, BatchGetCommand, BatchWriteCommand } from '@aws-sdk/lib-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
});

const docClient = DynamoDBDocumentClient.from(client);

export const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'nyasc-main-table';

// Helper functions for DynamoDB operations
export class DynamoDBService {
  private client = docClient;
  private tableName = TABLE_NAME;

  // Get single item
  async getItem(pk: string, sk: string) {
    try {
      const command = new GetCommand({
        TableName: this.tableName,
        Key: { PK: pk, SK: sk },
      });
      const result = await this.client.send(command);
      return result.Item;
    } catch (error) {
      console.error('Error getting item:', error);
      throw error;
    }
  }

  // Put item
  async putItem(item: Record<string, any>) {
    try {
      const command = new PutCommand({
        TableName: this.tableName,
        Item: item,
      });
      await this.client.send(command);
      return item;
    } catch (error) {
      console.error('Error putting item:', error);
      throw error;
    }
  }

  // Update item
  async updateItem(pk: string, sk: string, updates: Record<string, any>) {
    try {
      const updateExpression = Object.keys(updates)
        .map((key, index) => `${key} = :val${index}`)
        .join(', ');
      
      const expressionAttributeValues = Object.keys(updates).reduce((acc, key, index) => {
        acc[`:val${index}`] = updates[key];
        return acc;
      }, {} as Record<string, any>);

      const command = new UpdateCommand({
        TableName: this.tableName,
        Key: { PK: pk, SK: sk },
        UpdateExpression: `SET ${updateExpression}`,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
      });
      
      const result = await this.client.send(command);
      return result.Attributes;
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  }

  // Delete item
  async deleteItem(pk: string, sk: string) {
    try {
      const command = new DeleteCommand({
        TableName: this.tableName,
        Key: { PK: pk, SK: sk },
      });
      await this.client.send(command);
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  }

  // Query items
  async queryItems(
    pk: string,
    skCondition?: string,
    skValues?: Record<string, any>,
    indexName?: string,
    limit?: number,
    scanIndexForward?: boolean
  ) {
    try {
      const command = new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: `PK = :pk${skCondition ? ` AND ${skCondition}` : ''}`,
        ExpressionAttributeValues: {
          ':pk': pk,
          ...skValues,
        },
        IndexName: indexName,
        Limit: limit,
        ScanIndexForward: scanIndexForward,
      });
      
      const result = await this.client.send(command);
      return result.Items || [];
    } catch (error) {
      console.error('Error querying items:', error);
      throw error;
    }
  }

  // Scan items
  async scanItems(
    filterExpression?: string,
    expressionAttributeValues?: Record<string, any>,
    limit?: number
  ) {
    try {
      const command = new ScanCommand({
        TableName: this.tableName,
        FilterExpression: filterExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        Limit: limit,
      });
      
      const result = await this.client.send(command);
      return result.Items || [];
    } catch (error) {
      console.error('Error scanning items:', error);
      throw error;
    }
  }

  // Batch get items
  async batchGetItems(keys: Array<{ PK: string; SK: string }>) {
    try {
      const command = new BatchGetCommand({
        RequestItems: {
          [this.tableName]: {
            Keys: keys,
          },
        },
      });
      
      const result = await this.client.send(command);
      return result.Responses?.[this.tableName] || [];
    } catch (error) {
      console.error('Error batch getting items:', error);
      throw error;
    }
  }

  // Batch write items
  async batchWriteItems(items: Array<{ PutRequest?: { Item: any }; DeleteRequest?: { Key: any } }>) {
    try {
      const command = new BatchWriteCommand({
        RequestItems: {
          [this.tableName]: items,
        },
      });
      
      await this.client.send(command);
    } catch (error) {
      console.error('Error batch writing items:', error);
      throw error;
    }
  }

  // Paginated query
  async queryPaginated(
    pk: string,
    skCondition?: string,
    skValues?: Record<string, any>,
    indexName?: string,
    limit: number = 20,
    lastEvaluatedKey?: Record<string, any>
  ) {
    try {
      const command = new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: `PK = :pk${skCondition ? ` AND ${skCondition}` : ''}`,
        ExpressionAttributeValues: {
          ':pk': pk,
          ...skValues,
        },
        IndexName: indexName,
        Limit: limit,
        ExclusiveStartKey: lastEvaluatedKey,
      });
      
      const result = await this.client.send(command);
      return {
        items: result.Items || [],
        lastEvaluatedKey: result.LastEvaluatedKey,
        count: result.Count,
        scannedCount: result.ScannedCount,
      };
    } catch (error) {
      console.error('Error querying paginated items:', error);
      throw error;
    }
  }

  // Paginated scan
  async scanPaginated(
    filterExpression?: string,
    expressionAttributeValues?: Record<string, any>,
    limit: number = 20,
    lastEvaluatedKey?: Record<string, any>
  ) {
    try {
      const command = new ScanCommand({
        TableName: this.tableName,
        FilterExpression: filterExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        Limit: limit,
        ExclusiveStartKey: lastEvaluatedKey,
      });
      
      const result = await this.client.send(command);
      return {
        items: result.Items || [],
        lastEvaluatedKey: result.LastEvaluatedKey,
        count: result.Count,
        scannedCount: result.ScannedCount,
      };
    } catch (error) {
      console.error('Error scanning paginated items:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const db = new DynamoDBService();

// Utility functions for common operations
export const generateId = (prefix: string = '') => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
};

export const generateSK = (type: string, id: string) => `${type}#${id}`;

export const generatePK = (type: string, id: string) => `${type}#${id}`;

// Common query patterns
export const getUserByEmail = async (email: string) => {
  return db.queryItems('USER', 'GSI1PK = :email', { ':email': email }, 'GSI1');
};

export const getUserByReferralCode = async (referralCode: string) => {
  return db.queryItems('USER', 'GSI4PK = :code', { ':code': referralCode }, 'GSI4');
};

export const getOrdersByUser = async (userId: string, limit?: number) => {
  return db.queryItems('ORDER', 'GSI2PK = :userId', { ':userId': userId }, 'GSI2', limit, false);
};

export const getOrdersByDate = async (date: string, limit?: number) => {
  return db.queryItems('ORDER', 'GSI3PK = :date', { ':date': date }, 'GSI3', limit, false);
};

export const getCreditsByUser = async (userId: string, limit?: number) => {
  return db.queryItems('USER', 'GSI2PK = :userId AND begins_with(SK, :credit)', 
    { ':userId': userId, ':credit': 'CREDIT#' }, 'GSI2', limit, false);
};

export const getCommentsByPost = async (postId: string, limit?: number) => {
  return db.queryItems('POST', 'begins_with(SK, :comment)', 
    { ':comment': 'COMMENT#' }, undefined, limit, true);
};

export const getEmailEventsByMessage = async (messageId: string, limit?: number) => {
  return db.queryItems('EMAIL', 'begins_with(SK, :event)', 
    { ':event': 'EVENT#' }, undefined, limit, true);
};

// Batch operations
export const batchGetProducts = async (productIds: string[]) => {
  const keys = productIds.map(id => ({ PK: `PRODUCT#${id}`, SK: 'META' }));
  return db.batchGetItems(keys);
};

export const batchGetUsers = async (userIds: string[]) => {
  const keys = userIds.map(id => ({ PK: `USER#${id}`, SK: 'PROFILE' }));
  return db.batchGetItems(keys);
};

// Search index queue operations
export const addToSearchIndexQueue = async (entityType: string, entityId: string, operation: 'upsert' | 'delete', payload: any) => {
  const timestamp = Date.now().toString();
  const item = {
    PK: `INDEX#${entityType}`,
    SK: `${entityId}#${timestamp}`,
    entityType,
    entityId,
    operation,
    payload,
    processed: false,
    timestamp,
  };
  return db.putItem(item);
};

// Audit log operations
export const logAdminAction = async (userId: string, userName: string, action: string, resource: string, resourceId: string, changes?: Record<string, any>, ip?: string, userAgent?: string) => {
  const auditId = generateId('audit');
  const item = {
    PK: `AUDIT#${auditId}`,
    SK: 'META',
    auditId,
    userId,
    userName,
    action,
    resource,
    resourceId,
    changes,
    ip,
    userAgent,
    timestamp: new Date().toISOString(),
  };
  return db.putItem(item);
};

// Get dashboard statistics
export async function getDashboardStats() {
  try {
    // Get total revenue from orders
    const orders = await db.queryItems('ORDER', 'GSI2PK = :status', { ':status': 'ORDER#completed' }, 'GSI2');
    const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
    
    // Get total orders
    const totalOrders = orders.length;
    
    // Get total users
    const users = await db.queryItems('USER', 'GSI1PK = :type', { ':type': 'USER#user' }, 'GSI1');
    const totalUsers = users.length;
    
    // Get total blog posts
    const posts = await db.queryItems('POST', 'GSI1PK = :status', { ':status': 'POST#published' }, 'GSI1');
    const totalPosts = posts.length;
    
    // Calculate changes (mock data for now)
    const revenueChange = 12.5;
    const ordersChange = 8.3;
    const usersChange = 15.2;
    const postsChange = 5.7;
    
    return {
      totalRevenue,
      totalOrders,
      totalUsers,
      totalPosts,
      revenueChange,
      ordersChange,
      usersChange,
      postsChange,
    };
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    return {
      totalRevenue: 0,
      totalOrders: 0,
      totalUsers: 0,
      totalPosts: 0,
      revenueChange: 0,
      ordersChange: 0,
      usersChange: 0,
      postsChange: 0,
    };
  }
}

// Get all products
export async function getAllProducts() {
  try {
    const products = await db.queryItems('PRODUCT', 'GSI1PK = :status', { ':status': 'PRODUCT#active' }, 'GSI1');
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
}

// Get all blog posts
export async function getAllBlogPosts() {
  try {
    const posts = await db.queryItems('POST', 'GSI1PK = :status', { ':status': 'POST#published' }, 'GSI1');
    return posts;
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return [];
  }
}

// Export types for use in other modules
// export type { DynamoDBService };
