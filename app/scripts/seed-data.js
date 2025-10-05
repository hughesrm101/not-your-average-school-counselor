#!/usr/bin/env node

/**
 * NYASC Seed Data Script
 * Creates sample data for development and testing
 */

const fs = require('fs');
const path = require('path');

// Sample blog posts
const blogPosts = [
  {
    id: 'post-1',
    slug: 'building-resilience-students-evidence-based-strategies',
    title: 'Building Resilience in Students: Evidence-Based Strategies',
    excerpt: 'Discover proven techniques to help students develop emotional resilience and coping skills in today\'s challenging educational environment.',
    content: `# Building Resilience in Students: Evidence-Based Strategies

As school counselors, we play a crucial role in helping students develop the resilience they need to navigate life's challenges. This comprehensive guide explores evidence-based strategies that have proven effective in building student resilience.

## Understanding Resilience

Resilience is the ability to bounce back from adversity, adapt to change, and maintain mental well-being despite facing difficult circumstances. For students, this means developing the skills to handle academic pressure, social challenges, and personal setbacks.

## Key Strategies for Building Student Resilience

### 1. Growth Mindset Development

Help students understand that abilities can be developed through dedication and hard work. This mindset shift can significantly impact their approach to challenges.

**Implementation:**
- Teach students about neuroplasticity
- Encourage effort over ability
- Celebrate progress, not just outcomes

### 2. Emotional Regulation Skills

Students need tools to manage their emotions effectively, especially during stressful situations.

**Techniques:**
- Deep breathing exercises
- Mindfulness practices
- Cognitive reframing strategies

### 3. Social Connection Building

Strong relationships with peers, teachers, and family members provide crucial support during difficult times.

**Activities:**
- Peer mentoring programs
- Community service projects
- Family engagement initiatives

## Practical Applications

### Classroom Integration

Work with teachers to integrate resilience-building activities into daily classroom routines. This might include:

- Morning check-ins
- Stress management breaks
- Collaborative problem-solving exercises

### Individual Counseling

For students facing specific challenges, individual counseling sessions can provide targeted support and skill development.

## Measuring Success

Track student progress through:
- Self-assessment surveys
- Teacher observations
- Academic performance indicators
- Attendance and behavior data

## Conclusion

Building resilience in students is an ongoing process that requires consistent effort and support. By implementing these evidence-based strategies, we can help students develop the skills they need to thrive in school and beyond.

Remember, every student's journey is unique, and our approach should be tailored to meet their individual needs and circumstances.`,
    authorName: 'Dr. Sarah Johnson',
    authorEmail: 'sarah.johnson@nyasc.com',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    status: 'published',
    categories: ['Student Support', 'Mental Health'],
    tags: ['resilience', 'mental-health', 'student-support', 'evidence-based'],
    grades: ['K-5', '6-8', '9-12'],
    readingTime: 8,
    featured: true,
    seo: {
      title: 'Building Student Resilience: Evidence-Based Strategies for School Counselors',
      description: 'Learn proven techniques to help students develop emotional resilience and coping skills. Evidence-based strategies for school counselors.',
      keywords: ['student resilience', 'mental health', 'school counseling', 'evidence-based strategies']
    }
  },
  {
    id: 'post-2',
    slug: 'crisis-intervention-protocols-school-counselors',
    title: 'Crisis Intervention Protocols for School Counselors',
    excerpt: 'Essential protocols and procedures for handling crisis situations in educational settings, from immediate response to long-term recovery.',
    content: `# Crisis Intervention Protocols for School Counselors

Crisis situations in schools require immediate, coordinated responses to ensure student safety and well-being. This guide outlines essential protocols for school counselors.

## Understanding Crisis Types

### Immediate Threats
- Violence or threats of violence
- Medical emergencies
- Natural disasters
- Active shooter situations

### Mental Health Crises
- Suicidal ideation
- Self-harm behaviors
- Severe anxiety or panic attacks
- Substance abuse incidents

## Response Protocols

### Phase 1: Immediate Response (0-15 minutes)

1. **Assess the Situation**
   - Determine the nature and severity of the crisis
   - Identify immediate safety concerns
   - Activate appropriate response team

2. **Ensure Safety**
   - Remove students from danger
   - Secure the area if necessary
   - Contact emergency services if required

3. **Communicate**
   - Notify administration
   - Alert crisis response team
   - Begin documentation

### Phase 2: Stabilization (15-60 minutes)

1. **Provide Immediate Support**
   - Offer emotional support to affected students
   - Implement de-escalation techniques
   - Connect with mental health resources

2. **Coordinate Response**
   - Work with administration and support staff
   - Communicate with families
   - Prepare for media inquiries if necessary

### Phase 3: Recovery (1-7 days)

1. **Follow-up Support**
   - Individual counseling sessions
   - Group debriefing sessions
   - Classroom presentations

2. **Resource Connection**
   - Referrals to community mental health services
   - Family support resources
   - Academic accommodations if needed

## Prevention Strategies

### Building Resilient School Communities
- Implement comprehensive mental health programs
- Train staff in crisis recognition and response
- Develop strong relationships with community resources

### Early Warning Systems
- Regular mental health screenings
- Behavior monitoring systems
- Peer support networks

## Documentation and Reporting

### Essential Documentation
- Incident reports
- Student support plans
- Resource referrals
- Follow-up actions

### Legal Considerations
- Confidentiality requirements
- Mandatory reporting obligations
- Documentation standards

## Self-Care for Counselors

Crisis response can be emotionally taxing. Remember to:
- Take breaks when needed
- Seek supervision and support
- Practice self-care strategies
- Access employee assistance programs

## Conclusion

Effective crisis intervention requires preparation, coordination, and ongoing support. By following these protocols and maintaining strong relationships with community resources, school counselors can help ensure the safety and well-being of all students during difficult times.`,
    authorName: 'Michael Chen',
    authorEmail: 'michael.chen@nyasc.com',
    publishedAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    status: 'published',
    categories: ['Crisis Intervention', 'Safety'],
    tags: ['crisis-intervention', 'safety', 'protocols', 'emergency-response'],
    grades: ['K-5', '6-8', '9-12'],
    readingTime: 12,
    featured: false,
    seo: {
      title: 'Crisis Intervention Protocols: Essential Guide for School Counselors',
      description: 'Comprehensive crisis intervention protocols for school counselors. Learn immediate response, stabilization, and recovery procedures.',
      keywords: ['crisis intervention', 'school safety', 'emergency protocols', 'school counseling']
    }
  },
  {
    id: 'post-3',
    slug: 'supporting-lgbtq-students-creating-inclusive-environments',
    title: 'Supporting LGBTQ+ Students: Creating Inclusive Environments',
    excerpt: 'A comprehensive guide to creating safe, supportive, and inclusive environments for LGBTQ+ students in educational settings.',
    content: `# Supporting LGBTQ+ Students: Creating Inclusive Environments

Creating inclusive environments for LGBTQ+ students is essential for their academic success, mental health, and overall well-being. This guide provides practical strategies for school counselors.

## Understanding LGBTQ+ Student Needs

### Common Challenges
- Bullying and harassment
- Family rejection
- Mental health concerns
- Academic performance issues
- Social isolation

### Protective Factors
- Supportive school environments
- Inclusive policies and practices
- Access to affirming resources
- Strong peer support networks

## Creating Inclusive School Environments

### Policy Development
1. **Non-Discrimination Policies**
   - Include sexual orientation and gender identity
   - Ensure comprehensive coverage
   - Regular policy review and updates

2. **Anti-Bullying Policies**
   - Specific protections for LGBTQ+ students
   - Clear reporting procedures
   - Consistent enforcement

### Curriculum and Programming
1. **Inclusive Curriculum**
   - LGBTQ+ history and contributions
   - Diverse family structures
   - Age-appropriate discussions

2. **Support Groups**
   - Gay-Straight Alliances (GSAs)
   - Peer support networks
   - Mentorship programs

## Counseling Strategies

### Individual Support
- Affirmative counseling approaches
- Identity exploration support
- Crisis intervention when needed
- Resource connection

### Group Interventions
- Support groups for LGBTQ+ students
- Ally training programs
- Peer mentoring initiatives

## Working with Families

### Supportive Families
- Provide resources and education
- Connect with community organizations
- Offer ongoing support

### Non-Supportive Families
- Maintain student confidentiality
- Provide additional support
- Connect with external resources

## Professional Development

### Staff Training
- LGBTQ+ terminology and concepts
- Inclusive practices
- Bias recognition and reduction
- Resource awareness

### Ongoing Education
- Stay current with best practices
- Attend relevant conferences
- Join professional organizations
- Seek supervision and consultation

## Community Partnerships

### Local Organizations
- LGBTQ+ community centers
- Mental health providers
- Legal advocacy groups
- Healthcare providers

### National Resources
- GLSEN (Gay, Lesbian & Straight Education Network)
- PFLAG (Parents, Families and Friends of Lesbians and Gays)
- The Trevor Project
- Human Rights Campaign

## Measuring Success

### Indicators of Success
- Reduced bullying incidents
- Improved academic performance
- Increased school attendance
- Enhanced mental health outcomes

### Data Collection
- Climate surveys
- Incident reports
- Academic performance data
- Student feedback

## Conclusion

Supporting LGBTQ+ students requires ongoing commitment, education, and advocacy. By creating inclusive environments and providing appropriate support, school counselors can help ensure that all students feel safe, valued, and able to reach their full potential.

Remember that every student's experience is unique, and our approach should be tailored to meet their individual needs while maintaining a commitment to creating inclusive, supportive school communities.`,
    authorName: 'Dr. Maria Rodriguez',
    authorEmail: 'maria.rodriguez@nyasc.com',
    publishedAt: '2024-01-05T09:00:00Z',
    updatedAt: '2024-01-05T09:00:00Z',
    status: 'published',
    categories: ['LGBTQ+ Support', 'Inclusion'],
    tags: ['lgbtq', 'inclusion', 'diversity', 'student-support'],
    grades: ['6-8', '9-12'],
    readingTime: 15,
    featured: true,
    seo: {
      title: 'Supporting LGBTQ+ Students: Creating Inclusive School Environments',
      description: 'Comprehensive guide for school counselors on creating safe, supportive, and inclusive environments for LGBTQ+ students.',
      keywords: ['LGBTQ students', 'inclusive education', 'school counseling', 'diversity and inclusion']
    }
  }
];

// Sample products
const products = [
  {
    id: 'product-1',
    slug: 'social-emotional-learning-toolkit',
    title: 'Social-Emotional Learning Toolkit',
    description: 'A comprehensive toolkit for implementing social-emotional learning programs in your school. Includes lesson plans, activities, assessments, and parent resources.',
    shortDescription: 'Complete SEL implementation toolkit with lesson plans and activities.',
    price: 49.99,
    status: 'active',
    type: 'digital',
    categories: ['SEL', 'Curriculum'],
    tags: ['sel', 'social-emotional', 'curriculum', 'elementary'],
    grades: ['K-5', '6-8'],
    featured: true,
    cover: '/images/products/sel-toolkit.jpg',
    files: [
      {
        name: 'SEL Toolkit - Complete Package',
        size: 15728640,
        type: 'application/zip',
        url: 'sel-toolkit-complete.zip'
      }
    ],
    seo: {
      title: 'Social-Emotional Learning Toolkit for School Counselors',
      description: 'Complete SEL implementation toolkit with lesson plans, activities, and assessments for school counselors.',
      keywords: ['SEL toolkit', 'social emotional learning', 'school counseling resources']
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'product-2',
    slug: 'college-application-guide',
    title: 'College Application Success Guide',
    description: 'A step-by-step guide to help students navigate the college application process. Includes timelines, essay tips, financial aid information, and interview preparation.',
    shortDescription: 'Complete guide to college applications and admissions success.',
    price: 29.99,
    status: 'active',
    type: 'digital',
    categories: ['College Prep', 'Academic Support'],
    tags: ['college-prep', 'applications', 'admissions', 'high-school'],
    grades: ['9-12'],
    featured: true,
    cover: '/images/products/college-guide.jpg',
    files: [
      {
        name: 'College Application Guide - PDF',
        size: 5242880,
        type: 'application/pdf',
        url: 'college-application-guide.pdf'
      },
      {
        name: 'College Application Templates',
        size: 2097152,
        type: 'application/zip',
        url: 'college-templates.zip'
      }
    ],
    seo: {
      title: 'College Application Success Guide for High School Students',
      description: 'Complete step-by-step guide to college applications, essays, and admissions success.',
      keywords: ['college applications', 'college prep', 'admissions guide', 'high school counseling']
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-12T16:00:00Z'
  },
  {
    id: 'product-3',
    slug: 'crisis-intervention-manual',
    title: 'Crisis Intervention Manual',
    description: 'A comprehensive manual for handling crisis situations in schools. Includes protocols, checklists, communication templates, and recovery strategies.',
    shortDescription: 'Essential crisis intervention protocols and procedures for schools.',
    price: 79.99,
    status: 'active',
    type: 'digital',
    categories: ['Crisis Intervention', 'Safety'],
    tags: ['crisis-intervention', 'safety', 'protocols', 'emergency'],
    grades: ['K-5', '6-8', '9-12'],
    featured: false,
    cover: '/images/products/crisis-manual.jpg',
    files: [
      {
        name: 'Crisis Intervention Manual - Complete',
        size: 31457280,
        type: 'application/zip',
        url: 'crisis-intervention-manual.zip'
      }
    ],
    seo: {
      title: 'Crisis Intervention Manual for School Counselors',
      description: 'Comprehensive crisis intervention protocols, procedures, and recovery strategies for educational settings.',
      keywords: ['crisis intervention', 'school safety', 'emergency protocols', 'crisis management']
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-10T14:30:00Z'
  }
];

// Sample bundles
const bundles = [
  {
    id: 'bundle-1',
    slug: 'comprehensive-counseling-starter-pack',
    title: 'Comprehensive Counseling Starter Pack',
    description: 'Everything you need to get started as a school counselor. Includes SEL toolkit, crisis intervention manual, and college prep guide.',
    shortDescription: 'Complete starter pack for new school counselors.',
    bundlePrice: 129.99,
    individualPrice: 159.97,
    savings: 29.98,
    status: 'active',
    type: 'bundle',
    categories: ['Starter Pack', 'Comprehensive'],
    tags: ['starter-pack', 'comprehensive', 'new-counselor', 'bundle'],
    grades: ['K-5', '6-8', '9-12'],
    featured: true,
    cover: '/images/bundles/starter-pack.jpg',
    products: ['product-1', 'product-2', 'product-3'],
    seo: {
      title: 'Comprehensive Counseling Starter Pack for School Counselors',
      description: 'Complete starter pack including SEL toolkit, crisis intervention manual, and college prep guide.',
      keywords: ['counseling starter pack', 'school counselor resources', 'comprehensive toolkit']
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

// Sample coupons
const coupons = [
  {
    id: 'coupon-1',
    code: 'WELCOME20',
    name: 'Welcome Discount',
    description: '20% off for new customers',
    type: 'percentage',
    value: 20,
    minAmount: 25,
    maxUses: 1000,
    usedCount: 45,
    status: 'active',
    validFrom: '2024-01-01T00:00:00Z',
    validUntil: '2024-12-31T23:59:59Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'coupon-2',
    code: 'STUDENT15',
    name: 'Student Discount',
    description: '$15 off orders over $50',
    type: 'fixed',
    value: 15,
    minAmount: 50,
    maxUses: 500,
    usedCount: 23,
    status: 'active',
    validFrom: '2024-01-01T00:00:00Z',
    validUntil: '2024-06-30T23:59:59Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

// Sample users
const users = [
  {
    id: 'user-1',
    email: 'admin@nyasc.com',
    name: 'Admin User',
    firstName: 'Admin',
    lastName: 'User',
    roles: ['superadmin'],
    status: 'active',
    emailVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-01-15T10:00:00Z',
    referralCode: 'ADM001',
    preferences: {
      topics: ['SEL', 'Crisis Intervention', 'College Prep'],
      frequency: 'weekly',
      notifications: {
        email: true,
        marketing: true,
        updates: true
      }
    }
  },
  {
    id: 'user-2',
    email: 'counselor@example.com',
    name: 'Jane Smith',
    firstName: 'Jane',
    lastName: 'Smith',
    roles: ['user'],
    status: 'active',
    emailVerified: true,
    createdAt: '2024-01-05T00:00:00Z',
    lastLoginAt: '2024-01-14T15:30:00Z',
    referralCode: 'JAN002',
    preferences: {
      topics: ['SEL', 'Mental Health'],
      frequency: 'monthly',
      notifications: {
        email: true,
        marketing: false,
        updates: true
      }
    }
  }
];

// Sample orders
const orders = [
  {
    id: 'order-1',
    userId: 'user-2',
    status: 'completed',
    items: [
      {
        productId: 'product-1',
        title: 'Social-Emotional Learning Toolkit',
        price: 49.99,
        quantity: 1,
        isBundle: false
      }
    ],
    subtotal: 49.99,
    tax: 4.00,
    total: 53.99,
    paymentMethod: 'card',
    paymentId: 'pi_test_1234567890',
    createdAt: '2024-01-10T14:30:00Z',
    completedAt: '2024-01-10T14:35:00Z'
  },
  {
    id: 'order-2',
    userId: 'user-2',
    status: 'completed',
    items: [
      {
        productId: 'bundle-1',
        title: 'Comprehensive Counseling Starter Pack',
        price: 129.99,
        quantity: 1,
        isBundle: true
      }
    ],
    subtotal: 129.99,
    tax: 10.40,
    total: 140.39,
    paymentMethod: 'card',
    paymentId: 'pi_test_0987654321',
    createdAt: '2024-01-12T09:15:00Z',
    completedAt: '2024-01-12T09:20:00Z'
  }
];

// Create directories if they don't exist
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Write data files
fs.writeFileSync(path.join(dataDir, 'blog-posts.json'), JSON.stringify(blogPosts, null, 2));
fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify(products, null, 2));
fs.writeFileSync(path.join(dataDir, 'bundles.json'), JSON.stringify(bundles, null, 2));
fs.writeFileSync(path.join(dataDir, 'coupons.json'), JSON.stringify(coupons, null, 2));
fs.writeFileSync(path.join(dataDir, 'users.json'), JSON.stringify(users, null, 2));
fs.writeFileSync(path.join(dataDir, 'orders.json'), JSON.stringify(orders, null, 2));

console.log('✅ Seed data created successfully!');
console.log('📁 Data files created in:', dataDir);
console.log('');
console.log('📊 Created:');
console.log(`  - ${blogPosts.length} blog posts`);
console.log(`  - ${products.length} products`);
console.log(`  - ${bundles.length} bundles`);
console.log(`  - ${coupons.length} coupons`);
console.log(`  - ${users.length} users`);
console.log(`  - ${orders.length} orders`);
console.log('');
console.log('🚀 You can now use this data to populate your application!');
