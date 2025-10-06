import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { v4 as uuidv4 } from 'uuid'

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' })
const docClient = DynamoDBDocumentClient.from(client)

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'nyasc-prod'

// Sample blog posts
const blogPosts = [
  {
    id: 'post_1',
    title: 'Building Strong Relationships with Students',
    slug: 'building-strong-relationships-with-students',
    content: `# Building Strong Relationships with Students

As a school counselor, one of the most important aspects of your role is building strong, trusting relationships with your students. These relationships form the foundation for effective counseling and support.

## Why Relationships Matter

Strong relationships with students are crucial because they:

- Create a safe space for students to share their concerns
- Build trust and rapport
- Increase student engagement in counseling sessions
- Improve academic and social outcomes

## Key Strategies

### 1. Active Listening
- Give students your full attention
- Use reflective listening techniques
- Ask open-ended questions
- Validate their feelings and experiences

### 2. Consistency
- Be reliable and predictable
- Follow through on commitments
- Maintain consistent boundaries
- Show up consistently for students

### 3. Empathy and Understanding
- Put yourself in their shoes
- Acknowledge their struggles
- Show genuine care and concern
- Avoid judgment

## Building Trust

Trust is earned over time through:
- Confidentiality and privacy
- Honest communication
- Respect for student autonomy
- Professional boundaries

Remember, every student is unique and may require different approaches to relationship building. Stay flexible and adapt your strategies to meet individual needs.`,
    excerpt: 'Learn how to build strong, trusting relationships with your students that form the foundation for effective counseling and support.',
    status: 'published',
    publishedAt: new Date('2024-01-15T08:00:00Z').toISOString(),
    createdAt: new Date('2024-01-10T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-15T08:00:00Z').toISOString(),
    authorId: 'user_admin',
    authorName: 'NYASC Team',
    category: 'Relationships',
    tags: ['students', 'relationships', 'trust', 'communication'],
    gradeLevels: ['elementary', 'middle', 'high'],
    featured: true,
    views: 245,
    readTime: 5,
    seoTitle: 'Building Strong Relationships with Students - School Counseling Guide',
    seoDescription: 'Learn proven strategies for building strong, trusting relationships with students in your school counseling practice.',
    featuredImage: '/images/blog/relationships.jpg'
  },
  {
    id: 'post_2',
    title: 'Creating Effective Study Habits',
    slug: 'creating-effective-study-habits',
    content: `# Creating Effective Study Habits

Helping students develop effective study habits is one of the most valuable skills you can teach as a school counselor. Good study habits lead to better academic performance and reduced stress.

## The Foundation of Good Study Habits

### 1. Time Management
- Create a study schedule
- Use a planner or digital calendar
- Set realistic goals
- Take regular breaks

### 2. Organization
- Keep materials organized
- Use folders and binders
- Create a dedicated study space
- Minimize distractions

### 3. Active Learning Techniques
- Summarize information in your own words
- Create flashcards
- Teach others what you've learned
- Use mnemonic devices

## Study Strategies by Subject

### Math
- Practice problems regularly
- Show your work
- Review mistakes
- Use visual aids

### Reading
- Preview before reading
- Take notes while reading
- Summarize key points
- Discuss with others

### Science
- Conduct experiments
- Create diagrams
- Use real-world examples
- Review lab reports

## Overcoming Common Challenges

### Procrastination
- Break tasks into smaller parts
- Set deadlines
- Remove distractions
- Reward yourself for progress

### Test Anxiety
- Practice relaxation techniques
- Prepare thoroughly
- Get adequate sleep
- Eat a healthy breakfast

Remember, developing good study habits takes time and practice. Be patient with students and celebrate their progress along the way.`,
    excerpt: 'Help students develop effective study habits that lead to better academic performance and reduced stress.',
    status: 'scheduled',
    publishedAt: new Date('2024-01-20T09:00:00Z').toISOString(),
    createdAt: new Date('2024-01-12T14:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-12T14:00:00Z').toISOString(),
    authorId: 'user_admin',
    authorName: 'NYASC Team',
    category: 'Academic Support',
    tags: ['study', 'habits', 'organization', 'time-management'],
    gradeLevels: ['middle', 'high'],
    featured: false,
    views: 0,
    readTime: 7,
    seoTitle: 'Creating Effective Study Habits - School Counselor Guide',
    seoDescription: 'Learn how to help students develop effective study habits for better academic performance and reduced stress.',
    featuredImage: '/images/blog/study-habits.jpg'
  },
  {
    id: 'post_3',
    title: 'Managing Stress in High School',
    slug: 'managing-stress-in-high-school',
    content: `# Managing Stress in High School

High school can be an incredibly stressful time for students. As school counselors, we play a vital role in helping students develop healthy coping strategies and stress management techniques.

## Understanding Student Stress

### Common Stressors
- Academic pressure and expectations
- Social relationships and peer pressure
- Family dynamics and expectations
- Future planning and college preparation
- Extracurricular activities and commitments

### Signs of Stress
- Changes in sleep patterns
- Irritability or mood swings
- Difficulty concentrating
- Physical symptoms (headaches, stomachaches)
- Withdrawal from activities

## Stress Management Strategies

### 1. Mindfulness and Relaxation
- Deep breathing exercises
- Progressive muscle relaxation
- Meditation and mindfulness
- Yoga or gentle stretching

### 2. Time Management
- Prioritize tasks
- Break large projects into smaller steps
- Use a planner or calendar
- Learn to say no to overcommitment

### 3. Healthy Lifestyle Habits
- Regular exercise
- Balanced nutrition
- Adequate sleep
- Limited caffeine and sugar

### 4. Social Support
- Maintain healthy friendships
- Communicate with family
- Seek help when needed
- Join support groups

## Creating a Supportive Environment

### For Counselors
- Provide a safe, non-judgmental space
- Teach stress management techniques
- Connect students with resources
- Collaborate with teachers and parents

### For Schools
- Implement stress reduction programs
- Provide mental health resources
- Create a positive school climate
- Train staff to recognize stress signs

Remember, stress is a normal part of life, but when it becomes overwhelming, students need support and tools to manage it effectively.`,
    excerpt: 'Help high school students manage stress with proven strategies and create a supportive environment for their mental health.',
    status: 'draft',
    createdAt: new Date('2024-01-14T16:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-14T16:00:00Z').toISOString(),
    authorId: 'user_admin',
    authorName: 'NYASC Team',
    category: 'Mental Health',
    tags: ['stress', 'anxiety', 'coping', 'mental-health'],
    gradeLevels: ['high'],
    featured: false,
    views: 0,
    readTime: 6,
    seoTitle: 'Managing Stress in High School - Counselor Guide',
    seoDescription: 'Learn effective strategies to help high school students manage stress and create a supportive environment for mental health.',
    featuredImage: '/images/blog/stress-management.jpg'
  }
]

// Sample products
const products = [
  {
    id: 'prod_1',
    name: 'Counseling Toolkit',
    description: 'A comprehensive toolkit with worksheets, activities, and resources for school counselors.',
    price: 29.99,
    status: 'active',
    category: 'Tools',
    tags: ['worksheets', 'activities', 'resources'],
    gradeLevels: ['elementary', 'middle', 'high'],
    fileKey: 'products/counseling-toolkit.pdf',
    fileSize: 2048576, // 2MB
    downloads: 156,
    featured: true,
    createdAt: new Date('2024-01-01T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-15T10:00:00Z').toISOString(),
    seoTitle: 'Counseling Toolkit - School Counselor Resources',
    seoDescription: 'Comprehensive toolkit with worksheets, activities, and resources for school counselors.',
    imageUrl: '/images/products/counseling-toolkit.jpg'
  },
  {
    id: 'prod_2',
    name: 'Student Assessment Forms',
    description: 'Professional assessment forms for evaluating student needs and progress.',
    price: 19.99,
    status: 'active',
    category: 'Assessment',
    tags: ['assessment', 'forms', 'evaluation'],
    gradeLevels: ['elementary', 'middle', 'high'],
    fileKey: 'products/assessment-forms.pdf',
    fileSize: 1536000, // 1.5MB
    downloads: 89,
    featured: false,
    createdAt: new Date('2024-01-05T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-10T14:00:00Z').toISOString(),
    seoTitle: 'Student Assessment Forms - School Counselor Tools',
    seoDescription: 'Professional assessment forms for evaluating student needs and progress.',
    imageUrl: '/images/products/assessment-forms.jpg'
  },
  {
    id: 'prod_3',
    name: 'Parent Communication Templates',
    description: 'Ready-to-use templates for effective parent communication and collaboration.',
    price: 24.99,
    status: 'active',
    category: 'Communication',
    tags: ['parent', 'communication', 'templates'],
    gradeLevels: ['elementary', 'middle', 'high'],
    fileKey: 'products/parent-templates.pdf',
    fileSize: 1024000, // 1MB
    downloads: 67,
    featured: false,
    createdAt: new Date('2024-01-08T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-12T09:00:00Z').toISOString(),
    seoTitle: 'Parent Communication Templates - School Counselor Resources',
    seoDescription: 'Ready-to-use templates for effective parent communication and collaboration.',
    imageUrl: '/images/products/parent-templates.jpg'
  }
]

// Sample bundles
const bundles = [
  {
    id: 'bundle_1',
    name: 'Complete Bundle',
    description: 'Everything you need to get started as a school counselor.',
    price: 49.99,
    originalPrice: 74.97,
    status: 'active',
    productIds: ['prod_1', 'prod_2', 'prod_3'],
    featured: true,
    createdAt: new Date('2024-01-10T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-15T12:00:00Z').toISOString(),
    seoTitle: 'Complete School Counselor Bundle - All Resources',
    seoDescription: 'Everything you need to get started as a school counselor in one comprehensive bundle.',
    imageUrl: '/images/bundles/complete-bundle.jpg'
  }
]

// Sample coupons
const coupons = [
  {
    id: 'coupon_1',
    code: 'WELCOME20',
    description: 'Welcome discount for new customers',
    type: 'percentage',
    value: 20,
    minAmount: 0,
    maxUses: 100,
    usedCount: 23,
    validFrom: new Date('2024-01-01T00:00:00Z').toISOString(),
    validUntil: new Date('2024-12-31T23:59:59Z').toISOString(),
    status: 'active',
    createdAt: new Date('2024-01-01T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-15T10:00:00Z').toISOString()
  },
  {
    id: 'coupon_2',
    code: 'BUNDLE10',
    description: 'Bundle discount',
    type: 'fixed',
    value: 10,
    minAmount: 50,
    maxUses: 50,
    usedCount: 12,
    validFrom: new Date('2024-01-01T00:00:00Z').toISOString(),
    validUntil: new Date('2024-06-30T23:59:59Z').toISOString(),
    status: 'active',
    createdAt: new Date('2024-01-01T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-10T14:00:00Z').toISOString()
  }
]

// Sample users
const users = [
  {
    id: 'user_admin',
    email: 'admin@nyasc.com',
    name: 'NYASC Admin',
    role: 'superadmin',
    status: 'active',
    createdAt: new Date('2024-01-01T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-15T10:00:00Z').toISOString(),
    lastLoginAt: new Date('2024-01-15T08:00:00Z').toISOString(),
    preferences: {
      emailNotifications: true,
      newsletter: true,
      marketing: false
    }
  },
  {
    id: 'user_1',
    email: 'counselor@school.edu',
    name: 'Sarah Johnson',
    role: 'user',
    status: 'active',
    createdAt: new Date('2024-01-05T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-14T16:00:00Z').toISOString(),
    lastLoginAt: new Date('2024-01-14T14:00:00Z').toISOString(),
    preferences: {
      emailNotifications: true,
      newsletter: true,
      marketing: true
    }
  },
  {
    id: 'user_2',
    email: 'teacher@district.org',
    name: 'Michael Chen',
    role: 'user',
    status: 'active',
    createdAt: new Date('2024-01-08T14:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-13T11:00:00Z').toISOString(),
    lastLoginAt: new Date('2024-01-13T09:00:00Z').toISOString(),
    preferences: {
      emailNotifications: true,
      newsletter: false,
      marketing: false
    }
  }
]

// Sample orders
const orders = [
  {
    id: 'ord_1',
    userId: 'user_1',
    customerEmail: 'counselor@school.edu',
    customerName: 'Sarah Johnson',
    status: 'completed',
    total: 29.99,
    subtotal: 29.99,
    tax: 2.40,
    currency: 'USD',
    items: [
      {
        id: 'prod_1',
        name: 'Counseling Toolkit',
        price: 29.99,
        quantity: 1,
        type: 'product'
      }
    ],
    stripeSessionId: 'cs_test_123',
    stripePaymentIntentId: 'pi_test_123',
    createdAt: new Date('2024-01-10T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-10T10:05:00Z').toISOString(),
    completedAt: new Date('2024-01-10T10:05:00Z').toISOString()
  },
  {
    id: 'ord_2',
    userId: 'user_2',
    customerEmail: 'teacher@district.org',
    customerName: 'Michael Chen',
    status: 'completed',
    total: 49.99,
    subtotal: 49.99,
    tax: 4.00,
    currency: 'USD',
    items: [
      {
        id: 'bundle_1',
        name: 'Complete Bundle',
        price: 49.99,
        quantity: 1,
        type: 'bundle'
      }
    ],
    stripeSessionId: 'cs_test_124',
    stripePaymentIntentId: 'pi_test_124',
    createdAt: new Date('2024-01-12T14:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-12T14:03:00Z').toISOString(),
    completedAt: new Date('2024-01-12T14:03:00Z').toISOString()
  }
]

async function seedData() {
  console.log('Starting data seeding...')

  try {
    // Seed blog posts
    console.log('Seeding blog posts...')
    for (const post of blogPosts) {
      await docClient.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: `POST#${post.id}`,
          SK: `POST#${post.id}`,
          GSI1PK: `POST#${post.status}`,
          GSI1SK: post.publishedAt || post.createdAt,
          GSI2PK: `POST#${post.category}`,
          GSI2SK: post.publishedAt || post.createdAt,
          ...post,
          entityType: 'BlogPost'
        }
      }))
    }

    // Seed products
    console.log('Seeding products...')
    for (const product of products) {
      await docClient.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: `PRODUCT#${product.id}`,
          SK: `PRODUCT#${product.id}`,
          GSI1PK: `PRODUCT#${product.status}`,
          GSI1SK: product.createdAt,
          GSI2PK: `PRODUCT#${product.category}`,
          GSI2SK: product.createdAt,
          ...product,
          entityType: 'Product'
        }
      }))
    }

    // Seed bundles
    console.log('Seeding bundles...')
    for (const bundle of bundles) {
      await docClient.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: `BUNDLE#${bundle.id}`,
          SK: `BUNDLE#${bundle.id}`,
          GSI1PK: `BUNDLE#${bundle.status}`,
          GSI1SK: bundle.createdAt,
          ...bundle,
          entityType: 'Bundle'
        }
      }))
    }

    // Seed coupons
    console.log('Seeding coupons...')
    for (const coupon of coupons) {
      await docClient.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: `COUPON#${coupon.id}`,
          SK: `COUPON#${coupon.id}`,
          GSI1PK: `COUPON#${coupon.status}`,
          GSI1SK: coupon.createdAt,
          ...coupon,
          entityType: 'Coupon'
        }
      }))
    }

    // Seed users
    console.log('Seeding users...')
    for (const user of users) {
      await docClient.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: `USER#${user.id}`,
          SK: `USER#${user.id}`,
          GSI1PK: `USER#${user.role}`,
          GSI1SK: user.createdAt,
          GSI2PK: `USER#${user.status}`,
          GSI2SK: user.createdAt,
          ...user,
          entityType: 'User'
        }
      }))
    }

    // Seed orders
    console.log('Seeding orders...')
    for (const order of orders) {
      await docClient.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: `ORDER#${order.id}`,
          SK: `ORDER#${order.id}`,
          GSI1PK: `ORDER#${order.userId}`,
          GSI1SK: order.createdAt,
          GSI2PK: `ORDER#${order.status}`,
          GSI2SK: order.createdAt,
          ...order,
          entityType: 'Order'
        }
      }))
    }

    console.log('Data seeding completed successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  }
}

// Run the seeding function
if (require.main === module) {
  seedData()
}

export { seedData }
