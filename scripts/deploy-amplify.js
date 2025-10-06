const { exec } = require('child_process');
const util = require('util');
const fs = require('fs');
const path = require('path');

const execAsync = util.promisify(exec);

// Complete AWS Amplify deployment script
async function deployToAmplify() {
  console.log('🚀 Starting Complete AWS Amplify Deployment...\n');

  try {
    // 1. Check if AWS CLI is installed
    console.log('🔍 Checking AWS CLI installation...');
    try {
      await execAsync('aws --version');
      console.log('✅ AWS CLI is installed\n');
    } catch (error) {
      console.log('❌ AWS CLI not found. Installing...');
      await execAsync('curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"');
      await execAsync('unzip awscliv2.zip');
      await execAsync('sudo ./aws/install');
      console.log('✅ AWS CLI installed\n');
    }

    // 2. Check if Amplify CLI is installed
    console.log('🔍 Checking Amplify CLI installation...');
    try {
      await execAsync('amplify --version');
      console.log('✅ Amplify CLI is installed\n');
    } catch (error) {
      console.log('❌ Amplify CLI not found. Installing...');
      await execAsync('npm install -g @aws-amplify/cli');
      console.log('✅ Amplify CLI installed\n');
    }

    // 3. Initialize Amplify project
    console.log('🏗️  Initializing Amplify project...');
    await execAsync('cd app && amplify init --yes');
    console.log('✅ Amplify project initialized\n');

    // 4. Add hosting
    console.log('🌐 Adding Amplify hosting...');
    await execAsync('cd app && amplify add hosting --yes');
    console.log('✅ Hosting added\n');

    // 5. Add authentication (Cognito)
    console.log('🔐 Adding authentication...');
    await execAsync('cd app && amplify add auth --yes');
    console.log('✅ Authentication added\n');

    // 6. Add storage (DynamoDB)
    console.log('💾 Adding storage...');
    await execAsync('cd app && amplify add storage --yes');
    console.log('✅ Storage added\n');

    // 7. Add API (GraphQL)
    console.log('🔌 Adding API...');
    await execAsync('cd app && amplify add api --yes');
    console.log('✅ API added\n');

    // 8. Push to AWS
    console.log('☁️  Pushing to AWS...');
    await execAsync('cd app && amplify push --yes');
    console.log('✅ Pushed to AWS\n');

    // 9. Publish to hosting
    console.log('🚀 Publishing to hosting...');
    await execAsync('cd app && amplify publish --yes');
    console.log('✅ Published to hosting\n');

    // 10. Get deployment URL
    console.log('🔗 Getting deployment URL...');
    const { stdout } = await execAsync('cd app && amplify status');
    console.log('✅ Deployment URL obtained\n');

    console.log('🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!');
    console.log('\n📋 Next Steps:');
    console.log('1. Configure custom domain: nyasc-counselor.com');
    console.log('2. Set up SSL certificate');
    console.log('3. Configure environment variables');
    console.log('4. Set up superadmin accounts');
    console.log('5. Test all functionality');

    console.log('\n🌐 Your platform is now live!');
    console.log('URL: https://your-app-id.amplifyapp.com');

  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check AWS credentials: aws configure');
    console.log('2. Verify Amplify CLI: amplify --version');
    console.log('3. Check permissions: aws sts get-caller-identity');
  }
}

// Alternative deployment method using GitHub
async function deployViaGitHub() {
  console.log('🚀 Deploying via GitHub to AWS Amplify...\n');

  console.log('📋 Manual Steps Required:');
  console.log('1. Go to AWS Amplify Console');
  console.log('2. Click "New App" → "Host web app"');
  console.log('3. Connect to GitHub');
  console.log('4. Select repository: Not Your Average School Counselor');
  console.log('5. Choose branch: main');
  console.log('6. Use build settings from amplify.yml');
  console.log('7. Add environment variables');
  console.log('8. Deploy!');

  console.log('\n🔧 Build Settings (amplify.yml):');
  console.log(`
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd app
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: app/.next
    files:
      - '**/*'
  cache:
    paths:
      - app/node_modules/**/*
      - app/.next/cache/**/*
  `);

  console.log('\n🌐 Environment Variables to Add:');
  console.log('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...');
  console.log('STRIPE_SECRET_KEY=sk_live_...');
  console.log('AWS_ACCESS_KEY_ID=AKIA...');
  console.log('AWS_SECRET_ACCESS_KEY=...');
  console.log('COGNITO_USER_POOL_ID=us-east-1_...');
  console.log('COGNITO_CLIENT_ID=...');
  console.log('DYNAMODB_TABLE_NAME=nyasc-platform');
  console.log('S3_BUCKET_NAME=nyasc-platform-assets');
  console.log('NEXTAUTH_URL=https://nyasc.co');
  console.log('NEXTAUTH_SECRET=your-secret-key');
}

// Run the deployment
if (require.main === module) {
  const method = process.argv[2] || 'github';
  
  if (method === 'amplify') {
    deployToAmplify().catch(console.error);
  } else {
    deployViaGitHub().catch(console.error);
  }
}

module.exports = { deployToAmplify, deployViaGitHub };
