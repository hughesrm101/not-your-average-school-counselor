#!/usr/bin/env node

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, BatchWriteCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.DYNAMODB_TABLE_NAME || 'nyasc-counselor-main';

console.log('🌱 Seeding initial data for NYASC...\n');

// Sample products
const products = [
  {
    PK: 'PRODUCT#1',
    SK: 'PRODUCT#1',
    GSI1PK: 'PRODUCT',
    GSI1SK: 'ACTIVE#2024-01-01',
    GSI2PK: 'CATEGORY#lesson-plans',
    GSI2SK: 'PRODUCT#1',
    EntityType: 'Product',
    id: '1',
    name: 'Social-Emotional Learning Toolkit',
    description: 'Comprehensive SEL resources for elementary students',
    price: 29.99,
    category: 'lesson-plans',
    gradeLevel: 'elementary',
    tags: ['SEL', 'elementary', 'social-emotional'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
    downloadUrl: 'https://example.com/downloads/sel-toolkit.pdf',
    fileSize: '2.5MB',
    pages: 45
  },
  {
    PK: 'PRODUCT#2',
    SK: 'PRODUCT#2',
    GSI1PK: 'PRODUCT',
    GSI1SK: 'ACTIVE#2024-01-01',
    GSI2PK: 'CATEGORY#worksheets',
    GSI2SK: 'PRODUCT#2',
    EntityType: 'Product',
    id: '2',
    name: 'Career Exploration Workbook',
    description: 'Interactive workbook for high school career planning',
    price: 19.99,
    category: 'worksheets',
    gradeLevel: 'high-school',
    tags: ['career', 'high-school', 'planning'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
    downloadUrl: 'https://example.com/downloads/career-workbook.pdf',
    fileSize: '1.8MB',
    pages: 32
  },
  {
    PK: 'PRODUCT#3',
    SK: 'PRODUCT#3',
    GSI1PK: 'PRODUCT',
    GSI1SK: 'ACTIVE#2024-01-01',
    GSI2PK: 'CATEGORY#activities',
    GSI2SK: 'PRODUCT#3',
    EntityType: 'Product',
    id: '3',
    name: 'Mindfulness Activities Pack',
    description: '50 mindfulness activities for middle school students',
    price: 24.99,
    category: 'activities',
    gradeLevel: 'middle-school',
    tags: ['mindfulness', 'middle-school', 'wellness'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    downloadUrl: 'https://example.com/downloads/mindfulness-pack.pdf',
    fileSize: '3.2MB',
    pages: 68
  }
];

// Sample blog posts
const blogPosts = [
  {
    PK: 'BLOG#1',
    SK: 'BLOG#1',
    GSI1PK: 'BLOG',
    GSI1SK: 'PUBLISHED#2024-01-15',
    GSI2PK: 'TAG#mental-health',
    GSI2SK: 'BLOG#1',
    EntityType: 'BlogPost',
    id: '1',
    title: 'Building Resilience in Students: A Counselor\'s Guide',
    slug: 'building-resilience-in-students',
    excerpt: 'Learn practical strategies to help students develop resilience and coping skills.',
    content: '# Building Resilience in Students\n\nResilience is a crucial skill...',
    author: 'Dr. Sarah Johnson',
    publishedAt: '2024-01-15T10:00:00Z',
    status: 'published',
    tags: ['mental-health', 'resilience', 'counseling'],
    readingTime: 8,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800'
  },
  {
    PK: 'BLOG#2',
    SK: 'BLOG#2',
    GSI1PK: 'BLOG',
    GSI1SK: 'PUBLISHED#2024-01-10',
    GSI2PK: 'TAG#career-guidance',
    GSI2SK: 'BLOG#2',
    EntityType: 'BlogPost',
    id: '2',
    title: 'Career Exploration Activities for High School Students',
    slug: 'career-exploration-activities-high-school',
    excerpt: 'Engaging activities to help students explore career options and plan their future.',
    content: '# Career Exploration Activities\n\nCareer exploration is essential...',
    author: 'Michael Chen',
    publishedAt: '2024-01-10T14:30:00Z',
    status: 'published',
    tags: ['career-guidance', 'high-school', 'planning'],
    readingTime: 6,
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'
  }
];

// Sample bundles
const bundles = [
  {
    PK: 'BUNDLE#1',
    SK: 'BUNDLE#1',
    GSI1PK: 'BUNDLE',
    GSI1SK: 'ACTIVE#2024-01-01',
    GSI2PK: 'CATEGORY#comprehensive',
    GSI2SK: 'BUNDLE#1',
    EntityType: 'Bundle',
    id: '1',
    name: 'Complete SEL Toolkit',
    description: 'Everything you need for social-emotional learning',
    price: 99.99,
    originalPrice: 149.97,
    savings: 49.98,
    category: 'comprehensive',
    products: ['1', '2', '3'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400'
  }
];

// Sample coupons
const coupons = [
  {
    PK: 'COUPON#WELCOME10',
    SK: 'COUPON#WELCOME10',
    GSI1PK: 'COUPON',
    GSI1SK: 'ACTIVE#2024-01-01',
    EntityType: 'Coupon',
    code: 'WELCOME10',
    description: '10% off your first purchase',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 0,
    maxUses: 1000,
    usedCount: 0,
    validFrom: '2024-01-01T00:00:00Z',
    validUntil: '2024-12-31T23:59:59Z',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

async function seedData() {
  try {
    console.log('📦 Seeding products...');
    for (const product of products) {
      await docClient.send(new PutCommand({
        TableName: tableName,
        Item: product
      }));
    }
    console.log(`✅ ${products.length} products seeded`);

    console.log('\n📝 Seeding blog posts...');
    for (const post of blogPosts) {
      await docClient.send(new PutCommand({
        TableName: tableName,
        Item: post
      }));
    }
    console.log(`✅ ${blogPosts.length} blog posts seeded`);

    console.log('\n📚 Seeding bundles...');
    for (const bundle of bundles) {
      await docClient.send(new PutCommand({
        TableName: tableName,
        Item: bundle
      }));
    }
    console.log(`✅ ${bundles.length} bundles seeded`);

    console.log('\n🎫 Seeding coupons...');
    for (const coupon of coupons) {
      await docClient.send(new PutCommand({
        TableName: tableName,
        Item: coupon
      }));
    }
    console.log(`✅ ${coupons.length} coupons seeded`);

    console.log('\n🎉 Data seeding complete!');
    console.log('\n📊 Summary:');
    console.log(`- ${products.length} products`);
    console.log(`- ${blogPosts.length} blog posts`);
    console.log(`- ${bundles.length} bundles`);
    console.log(`- ${coupons.length} coupons`);

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedData();