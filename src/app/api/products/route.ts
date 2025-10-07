import { NextRequest, NextResponse } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const gradeLevel = searchParams.get('gradeLevel');
    const search = searchParams.get('search');

    // Build filter expression
    let filterExpression = 'EntityType = :entityType';
    let expressionAttributeValues: any = {
      ':entityType': 'Product'
    };

    if (category) {
      filterExpression += ' AND category = :category';
      expressionAttributeValues[':category'] = category;
    }

    if (gradeLevel) {
      filterExpression += ' AND gradeLevel = :gradeLevel';
      expressionAttributeValues[':gradeLevel'] = gradeLevel;
    }

    const command = new ScanCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME || 'nyasc-counselor-main',
      FilterExpression: filterExpression,
      ExpressionAttributeValues: expressionAttributeValues
    });

    const result = await docClient.send(command);
    
    let products = result.Items || [];

    // Client-side search if needed
    if (search) {
      products = products.filter((product: any) => 
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase()) ||
        product.tags?.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
