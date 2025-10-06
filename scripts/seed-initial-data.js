const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = 'nyasc-platform';

// Sample products
const products = [
  {
    PK: 'PRODUCT#social-emotional-learning-toolkit',
    SK: 'PRODUCT#social-emotional-learning-toolkit',
    GSI1PK: 'CATEGORY#social-emotional-learning',
    GSI1SK: 'PRODUCT#social-emotional-learning-toolkit',
    type: 'product',
    id: 'social-emotional-learning-toolkit',
    title: 'Complete Social-Emotional Learning Toolkit',
    description: 'A comprehensive toolkit with 50+ activities, lesson plans, and resources for teaching social-emotional skills to K-12 students.',
    price: 49.99,
    category: 'social-emotional-learning',
    gradeLevels: ['elementary', 'middle-school', 'high-school'],
    tags: ['SEL', 'activities', 'lesson-plans', 'comprehensive'],
    features: [
      '50+ ready-to-use activities',
      'Grade-specific lesson plans',
      'Assessment rubrics',
      'Parent engagement resources',
      'Digital and printable formats'
    ],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    PK: 'PRODUCT#college-readiness-workbook',
    SK: 'PRODUCT#college-readiness-workbook',
    GSI1PK: 'CATEGORY#college-career',
    GSI1SK: 'PRODUCT#college-readiness-workbook',
    type: 'product',
    id: 'college-readiness-workbook',
    title: 'High School College Readiness Workbook',
    description: 'A step-by-step workbook to help high school students prepare for college applications, financial aid, and career planning.',
    price: 29.99,
    category: 'college-career',
    gradeLevels: ['high-school'],
    tags: ['college-prep', 'applications', 'financial-aid', 'career-planning'],
    features: [
      'College application timeline',
      'Financial aid worksheets',
      'Career assessment tools',
      'Scholarship search guide',
      'Interview preparation tips'
    ],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    PK: 'PRODUCT#crisis-intervention-guide',
    SK: 'PRODUCT#crisis-intervention-guide',
    GSI1PK: 'CATEGORY#crisis-intervention',
    GSI1SK: 'PRODUCT#crisis-intervention-guide',
    type: 'product',
    id: 'crisis-intervention-guide',
    title: 'School Crisis Intervention Guide',
    description: 'Essential protocols and resources for handling crisis situations in schools, including suicide prevention and trauma response.',
    price: 39.99,
    category: 'crisis-intervention',
    gradeLevels: ['elementary', 'middle-school', 'high-school'],
    tags: ['crisis', 'intervention', 'suicide-prevention', 'trauma', 'protocols'],
    features: [
      'Crisis response protocols',
      'Suicide prevention resources',
      'Trauma-informed practices',
      'Staff training materials',
      'Parent communication templates'
    ],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Sample blog posts
const blogPosts = [
  {
    PK: 'BLOG#building-resilience-students',
    SK: 'BLOG#building-resilience-students',
    GSI1PK: 'BLOG#published',
    GSI1SK: '2024-10-05T15:00:00.000Z',
    type: 'blog-post',
    id: 'building-resilience-students',
    title: 'Building Resilience in Students: 5 Evidence-Based Strategies',
    slug: 'building-resilience-students',
    excerpt: 'Learn how to help students develop resilience and coping skills that will serve them throughout their lives.',
    content: `# Building Resilience in Students: 5 Evidence-Based Strategies

Resilience is the ability to bounce back from adversity, and it's a crucial skill for students to develop. Here are five evidence-based strategies to help build resilience in your students:

## 1. Foster Growth Mindset

Help students understand that abilities can be developed through dedication and hard work. Encourage them to see challenges as opportunities for growth rather than threats.

## 2. Build Strong Relationships

Positive relationships with teachers, peers, and family members provide the support network students need during difficult times.

## 3. Teach Problem-Solving Skills

Equip students with concrete strategies for approaching problems systematically and finding solutions.

## 4. Encourage Self-Reflection

Help students develop the ability to reflect on their experiences and learn from both successes and failures.

## 5. Model Resilience

As educators, we can model resilience by showing students how we handle our own challenges and setbacks.

These strategies, when implemented consistently, can help students develop the resilience they need to thrive in school and beyond.`,
    author: 'Dr. Sarah Johnson',
    status: 'published',
    publishedAt: '2024-10-05T15:00:00.000Z',
    tags: ['resilience', 'mental-health', 'student-support', 'evidence-based'],
    category: 'student-support',
    readingTime: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    PK: 'BLOG#college-application-timeline',
    SK: 'BLOG#college-application-timeline',
    GSI1PK: 'BLOG#published',
    GSI1SK: '2024-10-03T10:00:00.000Z',
    type: 'blog-post',
    id: 'college-application-timeline',
    title: 'The Ultimate College Application Timeline for High School Students',
    slug: 'college-application-timeline',
    excerpt: 'A month-by-month guide to help high school students stay on track with their college applications.',
    content: `# The Ultimate College Application Timeline for High School Students

Planning for college applications can feel overwhelming, but with the right timeline, students can stay organized and reduce stress. Here's a comprehensive guide:

## Junior Year (11th Grade)

### Fall Semester
- Take the PSAT
- Research colleges and universities
- Start building relationships with teachers for recommendations

### Spring Semester
- Take the SAT or ACT
- Visit college campuses
- Begin narrowing down college choices

## Senior Year (12th Grade)

### August-September
- Finalize college list
- Request recommendation letters
- Start working on essays

### October-November
- Submit early decision/early action applications
- Complete FAFSA
- Continue working on regular decision applications

### December-January
- Submit regular decision applications
- Apply for scholarships
- Complete CSS Profile if required

### February-April
- Wait for admission decisions
- Compare financial aid packages
- Make final college decision

### May
- Submit enrollment deposit
- Notify other schools of your decision
- Prepare for college transition

This timeline ensures students stay organized and don't miss important deadlines.`,
    author: 'Michael Chen',
    status: 'published',
    publishedAt: '2024-10-03T10:00:00.000Z',
    tags: ['college-prep', 'timeline', 'applications', 'high-school'],
    category: 'college-career',
    readingTime: 7,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Sample bundles
const bundles = [
  {
    PK: 'BUNDLE#nyasc-essential-counseling-resources-bundle',
    SK: 'BUNDLE#nyasc-essential-counseling-resources-bundle',
    GSI1PK: 'BUNDLE#active',
    GSI1SK: 'BUNDLE#nyasc-essential-counseling-resources-bundle',
    type: 'bundle',
    id: 'nyasc-essential-counseling-resources-bundle',
    title: 'NYASC Essential Counseling Resources Bundle',
    description: 'Get all the essential resources you need for effective school counseling in one comprehensive bundle.',
    price: 149.99,
    originalPrice: 199.97,
    discount: 25,
    productIds: [
      'social-emotional-learning-toolkit',
      'college-readiness-workbook',
      'crisis-intervention-guide'
    ],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

async function seedData() {
  console.log('🌱 Seeding initial data for NYASC platform...\n');

  try {
    // Seed products
    console.log('📦 Adding products...');
    for (const product of products) {
      await docClient.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: product
      }));
      console.log(`✅ Added product: ${product.title}`);
    }

    // Seed blog posts
    console.log('\n📝 Adding blog posts...');
    for (const post of blogPosts) {
      await docClient.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: post
      }));
      console.log(`✅ Added blog post: ${post.title}`);
    }

    // Seed bundles
    console.log('\n🎁 Adding bundles...');
    for (const bundle of bundles) {
      await docClient.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: bundle
      }));
      console.log(`✅ Added bundle: ${bundle.title}`);
    }

    console.log('\n🎉 Initial data seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- ${products.length} products added`);
    console.log(`- ${blogPosts.length} blog posts added`);
    console.log(`- ${bundles.length} bundles added`);

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
