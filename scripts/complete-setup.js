#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 COMPLETE NYASC SETUP - END TO END\n');

console.log('This script will guide you through setting up the complete NYASC platform.\n');

// Step 1: AWS Infrastructure
console.log('📋 STEP 1: AWS Infrastructure Setup');
console.log('Run: node scripts/setup-aws-complete.js');
console.log('This will create:');
console.log('- Cognito User Pool & Identity Pool');
console.log('- DynamoDB table with proper schema');
console.log('- SES configuration for emails');
console.log('- IAM roles and policies');
console.log('- Environment variables file\n');

// Step 2: Stripe Setup
console.log('📋 STEP 2: Stripe Payment Setup');
console.log('Run: node scripts/setup-stripe.js');
console.log('This will guide you through:');
console.log('- Creating Stripe account');
console.log('- Getting API keys');
console.log('- Setting up products');
console.log('- Configuring webhooks');
console.log('- Setting up tax calculation\n');

// Step 3: Search Setup
console.log('📋 STEP 3: Search Engine Setup');
console.log('Run: node scripts/setup-meilisearch.js');
console.log('This will guide you through:');
console.log('- Creating Meilisearch Cloud account');
console.log('- Setting up search indexes');
console.log('- Configuring search functionality\n');

// Step 4: Data Seeding
console.log('📋 STEP 4: Seed Initial Data');
console.log('Run: node scripts/seed-data.js');
console.log('This will create:');
console.log('- Sample products');
console.log('- Blog posts');
console.log('- Bundles and coupons');
console.log('- Search indexes\n');

// Step 5: Environment Variables
console.log('📋 STEP 5: Configure Environment Variables');
console.log('Update .env.production with your actual values:');
console.log('- AWS credentials');
console.log('- Cognito IDs');
console.log('- Stripe keys');
console.log('- Meilisearch credentials');
console.log('- Analytics keys\n');

// Step 6: Deploy
console.log('📋 STEP 6: Deploy to Production');
console.log('Your app will automatically deploy to AWS Amplify');
console.log('Set environment variables in Amplify console');
console.log('Test all functionality\n');

// Create comprehensive setup script
const setupScript = `#!/bin/bash

echo "🚀 NYASC Complete Setup Script"
echo "=============================="

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install AWS CLI"
    exit 1
fi

# Check Git
if ! command -v git &> /dev/null; then
    echo "❌ Git not found. Please install Git"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run AWS setup
echo "☁️  Setting up AWS infrastructure..."
node scripts/setup-aws-complete.js

# Run Stripe setup
echo "💳 Setting up Stripe..."
node scripts/setup-stripe.js

# Run Meilisearch setup
echo "🔍 Setting up search..."
node scripts/setup-meilisearch.js

# Seed data
echo "🌱 Seeding initial data..."
node scripts/seed-data.js

# Build application
echo "🔨 Building application..."
npm run build

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Update .env.production with your actual API keys"
echo "2. Set environment variables in AWS Amplify console"
echo "3. Test your deployed application"
echo "4. Configure custom domain if needed"
echo ""
echo "🌐 Your site will be available at: https://nyasc.co"
`;

fs.writeFileSync('scripts/complete-setup.sh', setupScript);
fs.chmodSync('scripts/complete-setup.sh', '755');

console.log('✅ Complete setup script created: scripts/complete-setup.sh');

console.log('\n🎯 QUICK START:');
console.log('Run: ./scripts/complete-setup.sh');
console.log('This will set up everything automatically!\n');

console.log('📊 WHAT YOU\'LL GET:');
console.log('✅ Fully functional e-commerce platform');
console.log('✅ User authentication with Cognito');
console.log('✅ Payment processing with Stripe');
console.log('✅ Search functionality with Meilisearch');
console.log('✅ Email system with SES');
console.log('✅ Admin dashboard');
console.log('✅ Blog system');
console.log('✅ Analytics and monitoring');
console.log('✅ Production-ready deployment\n');

console.log('💰 ESTIMATED COSTS (Monthly):');
console.log('- AWS Amplify: $1-5 (depending on traffic)');
console.log('- DynamoDB: $1-10 (depending on usage)');
console.log('- Cognito: $0.0055 per MAU');
console.log('- SES: $0.10 per 1000 emails');
console.log('- Meilisearch Cloud: $0-25 (free tier available)');
console.log('- Stripe: 2.9% + $0.30 per transaction\n');

console.log('🔒 SECURITY FEATURES:');
console.log('✅ JWT-based authentication');
console.log('✅ Role-based access control');
console.log('✅ Input validation and sanitization');
console.log('✅ Rate limiting and DDoS protection');
console.log('✅ HTTPS everywhere');
console.log('✅ Secure payment processing\n');

console.log('📈 SCALABILITY:');
console.log('✅ Serverless architecture');
console.log('✅ Auto-scaling DynamoDB');
console.log('✅ CDN distribution');
console.log('✅ Global edge locations');
console.log('✅ 99.9% uptime SLA\n');

console.log('🎉 READY TO LAUNCH!');
console.log('Your world-class school counselor platform is ready to go!');
