import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { User, Product, Order, BlogPost, NewsletterSubscriber, EmailCampaign } from './schema';

const client = new DynamoDBClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
});

const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.NEXT_PUBLIC_DYNAMODB_TABLE || 'nyasc-platform';

// Generic CRUD operations
export class DatabaseService {
  // Users
  static async createUser(user: Omit<User, 'createdAt' | 'updatedAt'>): Promise<User> {
    const now = new Date().toISOString();
    const newUser: User = {
      ...user,
      createdAt: now,
      updatedAt: now,
    };

    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `USER#${user.id}`,
        SK: `USER#${user.id}`,
        ...newUser,
      },
    }));

    return newUser;
  }

  static async getUser(id: string): Promise<User | null> {
    const result = await docClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `USER#${id}`,
        SK: `USER#${id}`,
      },
    }));

    return result.Item as User || null;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const result = await docClient.send(new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    }));

    return result.Items?.[0] as User || null;
  }

  // Products
  static async createProduct(product: Omit<Product, 'createdAt' | 'updatedAt'>): Promise<Product> {
    const now = new Date().toISOString();
    const newProduct: Product = {
      ...product,
      createdAt: now,
      updatedAt: now,
    };

    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `PRODUCT#${product.id}`,
        SK: `PRODUCT#${product.id}`,
        ...newProduct,
      },
    }));

    return newProduct;
  }

  static async getProduct(id: string): Promise<Product | null> {
    const result = await docClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `PRODUCT#${id}`,
        SK: `PRODUCT#${id}`,
      },
    }));

    return result.Item as Product || null;
  }

  static async getProducts(category?: string, type?: string): Promise<Product[]> {
    const result = await docClient.send(new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: 'begins_with(PK, :pk) AND #status = :status',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':pk': 'PRODUCT#',
        ':status': 'active',
      },
    }));

    let products = result.Items as Product[] || [];

    if (category) {
      products = products.filter(p => p.category === category);
    }

    if (type) {
      products = products.filter(p => p.type === type);
    }

    return products;
  }

  static async getProductBySlug(slug: string): Promise<Product | null> {
    const result = await docClient.send(new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: 'begins_with(PK, :pk) AND slug = :slug',
      ExpressionAttributeValues: {
        ':pk': 'PRODUCT#',
        ':slug': slug,
      },
    }));

    return result.Items?.[0] as Product || null;
  }

  static async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const updateExpression = Object.keys(updates)
      .filter(key => key !== 'id')
      .map((key, index) => `${key} = :val${index}`)
      .join(', ');

    const expressionAttributeValues = Object.entries(updates)
      .filter(([key]) => key !== 'id')
      .reduce((acc, [key, value], index) => {
        acc[`:val${index}`] = value;
        return acc;
      }, {} as Record<string, any>);

    expressionAttributeValues[':updatedAt'] = new Date().toISOString();

    const result = await docClient.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `PRODUCT#${id}`,
        SK: `PRODUCT#${id}`,
      },
      UpdateExpression: `SET ${updateExpression}, updatedAt = :updatedAt`,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    }));

    return result.Attributes as Product || null;
  }

  static async deleteProduct(id: string): Promise<boolean> {
    await docClient.send(new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `PRODUCT#${id}`,
        SK: `PRODUCT#${id}`,
      },
    }));

    return true;
  }

  // Orders
  static async createOrder(order: Omit<Order, 'createdAt' | 'updatedAt'>): Promise<Order> {
    const now = new Date().toISOString();
    const newOrder: Order = {
      ...order,
      createdAt: now,
      updatedAt: now,
    };

    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `ORDER#${order.id}`,
        SK: `ORDER#${order.id}`,
        GSI1PK: `USER#${order.userId}`,
        GSI1SK: `ORDER#${newOrder.createdAt}`,
        ...newOrder,
      },
    }));

    return newOrder;
  }

  static async getOrder(id: string): Promise<Order | null> {
    const result = await docClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `ORDER#${id}`,
        SK: `ORDER#${id}`,
      },
    }));

    return result.Item as Order || null;
  }

  static async getUserOrders(userId: string): Promise<Order[]> {
    const result = await docClient.send(new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :pk',
      ExpressionAttributeValues: {
        ':pk': `USER#${userId}`,
      },
    }));

    return result.Items as Order[] || [];
  }

  // Blog Posts
  static async createBlogPost(post: Omit<BlogPost, 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const now = new Date().toISOString();
    const newPost: BlogPost = {
      ...post,
      createdAt: now,
      updatedAt: now,
    };

    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `BLOG#${post.id}`,
        SK: `BLOG#${post.id}`,
        GSI1PK: 'BLOG',
        GSI1SK: post.published ? `PUBLISHED#${post.publishedAt || now}` : `DRAFT#${now}`,
        ...newPost,
      },
    }));

    return newPost;
  }

  static async getBlogPost(id: string): Promise<BlogPost | null> {
    const result = await docClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `BLOG#${id}`,
        SK: `BLOG#${id}`,
      },
    }));

    return result.Item as BlogPost || null;
  }

  static async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const result = await docClient.send(new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: 'begins_with(PK, :pk) AND slug = :slug',
      ExpressionAttributeValues: {
        ':pk': 'BLOG#',
        ':slug': slug,
      },
    }));

    return result.Items?.[0] as BlogPost || null;
  }

  static async getPublishedBlogPosts(): Promise<BlogPost[]> {
    const result = await docClient.send(new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :pk AND begins_with(GSI1SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': 'BLOG',
        ':sk': 'PUBLISHED#',
      },
      ScanIndexForward: false,
    }));

    return result.Items as BlogPost[] || [];
  }

  // Newsletter Subscribers
  static async createNewsletterSubscriber(subscriber: Omit<NewsletterSubscriber, 'subscribedAt'>): Promise<NewsletterSubscriber> {
    const now = new Date().toISOString();
    const newSubscriber: NewsletterSubscriber = {
      ...subscriber,
      subscribedAt: now,
    };

    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `NEWSLETTER#${subscriber.id}`,
        SK: `NEWSLETTER#${subscriber.id}`,
        GSI1PK: 'NEWSLETTER',
        GSI1SK: `SUBSCRIBED#${now}`,
        ...newSubscriber,
      },
    }));

    return newSubscriber;
  }

  static async getNewsletterSubscriber(id: string): Promise<NewsletterSubscriber | null> {
    const result = await docClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `NEWSLETTER#${id}`,
        SK: `NEWSLETTER#${id}`,
      },
    }));

    return result.Item as NewsletterSubscriber || null;
  }

  static async getNewsletterSubscriberByEmail(email: string): Promise<NewsletterSubscriber | null> {
    const result = await docClient.send(new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: 'begins_with(PK, :pk) AND email = :email',
      ExpressionAttributeValues: {
        ':pk': 'NEWSLETTER#',
        ':email': email,
      },
    }));

    return result.Items?.[0] as NewsletterSubscriber || null;
  }

  static async getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    const result = await docClient.send(new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :pk',
      ExpressionAttributeValues: {
        ':pk': 'NEWSLETTER',
      },
    }));

    return result.Items as NewsletterSubscriber[] || [];
  }

  static async updateNewsletterSubscriber(id: string, updates: Partial<NewsletterSubscriber>): Promise<NewsletterSubscriber | null> {
    const updateExpression = Object.keys(updates)
      .filter(key => key !== 'id')
      .map((key, index) => `${key} = :val${index}`)
      .join(', ');

    const expressionAttributeValues = Object.entries(updates)
      .filter(([key]) => key !== 'id')
      .reduce((acc, [key, value], index) => {
        acc[`:val${index}`] = value;
        return acc;
      }, {} as Record<string, any>);

    expressionAttributeValues[':updatedAt'] = new Date().toISOString();

    const result = await docClient.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `NEWSLETTER#${id}`,
        SK: `NEWSLETTER#${id}`,
      },
      UpdateExpression: `SET ${updateExpression}, updatedAt = :updatedAt`,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    }));

    return result.Attributes as NewsletterSubscriber || null;
  }

  static async unsubscribeNewsletter(email: string): Promise<boolean> {
    const subscriber = await this.getNewsletterSubscriberByEmail(email);
    if (!subscriber) return false;

    await this.updateNewsletterSubscriber(subscriber.id, {
      status: 'unsubscribed',
      unsubscribedAt: new Date().toISOString(),
    });

    return true;
  }

  // Email Campaigns
  static async createEmailCampaign(campaign: Omit<EmailCampaign, 'createdAt' | 'updatedAt'>): Promise<EmailCampaign> {
    const now = new Date().toISOString();
    const newCampaign: EmailCampaign = {
      ...campaign,
      createdAt: now,
      updatedAt: now,
    };

    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `CAMPAIGN#${campaign.id}`,
        SK: `CAMPAIGN#${campaign.id}`,
        GSI1PK: 'CAMPAIGN',
        GSI1SK: `STATUS#${campaign.status}#${now}`,
        ...newCampaign,
      },
    }));

    return newCampaign;
  }

  static async getEmailCampaign(id: string): Promise<EmailCampaign | null> {
    const result = await docClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `CAMPAIGN#${id}`,
        SK: `CAMPAIGN#${id}`,
      },
    }));

    return result.Item as EmailCampaign || null;
  }

  static async getAllEmailCampaigns(): Promise<EmailCampaign[]> {
    const result = await docClient.send(new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :pk',
      ExpressionAttributeValues: {
        ':pk': 'CAMPAIGN',
      },
      ScanIndexForward: false,
    }));

    return result.Items as EmailCampaign[] || [];
  }

  static async updateEmailCampaign(id: string, updates: Partial<EmailCampaign>): Promise<EmailCampaign | null> {
    const updateExpression = Object.keys(updates)
      .filter(key => key !== 'id')
      .map((key, index) => `${key} = :val${index}`)
      .join(', ');

    const expressionAttributeValues = Object.entries(updates)
      .filter(([key]) => key !== 'id')
      .reduce((acc, [key, value], index) => {
        acc[`:val${index}`] = value;
        return acc;
      }, {} as Record<string, any>);

    expressionAttributeValues[':updatedAt'] = new Date().toISOString();

    const result = await docClient.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `CAMPAIGN#${id}`,
        SK: `CAMPAIGN#${id}`,
      },
      UpdateExpression: `SET ${updateExpression}, updatedAt = :updatedAt`,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    }));

    return result.Attributes as EmailCampaign || null;
  }
}
