import { NextRequest, NextResponse } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filterExpression = 'EntityType = :entityType AND status = :status';
    let expressionAttributeValues: any = {
      ':entityType': 'BlogPost',
      ':status': 'published'
    };

    if (tag) {
      filterExpression += ' AND contains(tags, :tag)';
      expressionAttributeValues[':tag'] = tag;
    }

    if (featured === 'true') {
      filterExpression += ' AND featured = :featured';
      expressionAttributeValues[':featured'] = true;
    }

    const command = new ScanCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME || 'nyasc-counselor-main',
      FilterExpression: filterExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      Limit: limit
    });

    const result = await docClient.send(command);
    
    // Sort by publishedAt date
    const posts = (result.Items || []).sort((a: any, b: any) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length
    });

  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
