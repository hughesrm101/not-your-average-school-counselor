#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up complete AWS infrastructure for NYASC...\n');

// Check if AWS CLI is installed
try {
  execSync('aws --version', { stdio: 'pipe' });
  console.log('✅ AWS CLI is installed');
} catch (error) {
  console.log('❌ AWS CLI not found. Please install it first:');
  console.log('   https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html');
  process.exit(1);
}

// Check if AWS is configured
try {
  execSync('aws sts get-caller-identity', { stdio: 'pipe' });
  console.log('✅ AWS credentials configured');
} catch (error) {
  console.log('❌ AWS credentials not configured. Please run:');
  console.log('   aws configure');
  process.exit(1);
}

const region = 'us-east-1';
const appName = 'nyasc-counselor';
const domain = 'nyasc.co';

console.log(`\n📍 Using region: ${region}`);
console.log(`🏷️  App name: ${appName}`);
console.log(`🌐 Domain: ${domain}\n`);

// 1. Create Cognito User Pool
console.log('🔐 Setting up Cognito User Pool...');
try {
  const userPoolOutput = execSync(`aws cognito-idp create-user-pool \
    --pool-name "${appName}-user-pool" \
    --policies '{
      "PasswordPolicy": {
        "MinimumLength": 8,
        "RequireUppercase": true,
        "RequireLowercase": true,
        "RequireNumbers": true,
        "RequireSymbols": true
      }
    }' \
    --auto-verified-attributes email \
    --username-attributes email \
    --region ${region}`, { encoding: 'utf8' });

  const userPool = JSON.parse(userPoolOutput);
  const userPoolId = userPool.UserPool.Id;
  console.log(`✅ User Pool created: ${userPoolId}`);

  // Create User Pool Client
  const clientOutput = execSync(`aws cognito-idp create-user-pool-client \
    --user-pool-id ${userPoolId} \
    --client-name "${appName}-client" \
    --generate-secret \
    --explicit-auth-flows USER_PASSWORD_AUTH ALLOW_USER_SRP_AUTH \
    --supported-identity-providers COGNITO \
    --callback-urls "https://${domain}/auth/callback" "http://localhost:3000/auth/callback" \
    --logout-urls "https://${domain}/" "http://localhost:3000/" \
    --region ${region}`, { encoding: 'utf8' });

  const client = JSON.parse(clientOutput);
  const clientId = client.UserPoolClient.ClientId;
  console.log(`✅ User Pool Client created: ${clientId}`);

  // Create Identity Pool
  const identityPoolOutput = execSync(`aws cognito-identity create-identity-pool \
    --identity-pool-name "${appName}-identity-pool" \
    --allow-unauthenticated-identities \
    --cognito-identity-providers ProviderName=cognito-idp.${region}.amazonaws.com/${userPoolId},ClientId=${clientId} \
    --region ${region}`, { encoding: 'utf8' });

  const identityPool = JSON.parse(identityPoolOutput);
  const identityPoolId = identityPool.IdentityPoolId;
  console.log(`✅ Identity Pool created: ${identityPoolId}`);

} catch (error) {
  console.log('❌ Error creating Cognito resources:', error.message);
}

// 2. Create DynamoDB Table
console.log('\n🗄️  Setting up DynamoDB table...');
try {
  const tableOutput = execSync(`aws dynamodb create-table \
    --table-name ${appName}-main \
    --attribute-definitions \
      AttributeName=PK,AttributeType=S \
      AttributeName=SK,AttributeType=S \
      AttributeName=GSI1PK,AttributeType=S \
      AttributeName=GSI1SK,AttributeType=S \
      AttributeName=GSI2PK,AttributeType=S \
      AttributeName=GSI2SK,AttributeType=S \
    --key-schema \
      AttributeName=PK,KeyType=HASH \
      AttributeName=SK,KeyType=RANGE \
    --global-secondary-indexes \
      IndexName=GSI1,KeySchema=[{AttributeName=GSI1PK,KeyType=HASH},{AttributeName=GSI1SK,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
      IndexName=GSI2,KeySchema=[{AttributeName=GSI2PK,KeyType=HASH},{AttributeName=GSI2SK,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
    --billing-mode PAY_PER_REQUEST \
    --region ${region}`, { encoding: 'utf8' });

  console.log('✅ DynamoDB table created');
} catch (error) {
  console.log('❌ Error creating DynamoDB table:', error.message);
}

// 3. Set up SES
console.log('\n📧 Setting up SES...');
try {
  // Verify domain
  execSync(`aws ses verify-domain-identity --domain ${domain} --region ${region}`, { stdio: 'pipe' });
  console.log(`✅ Domain ${domain} verification initiated`);
  
  // Create configuration set
  execSync(`aws ses create-configuration-set \
    --configuration-set '{
      "Name": "${appName}-config-set",
      "DeliveryOptions": {
        "TlsPolicy": "Require"
      }
    }' \
    --region ${region}`, { stdio: 'pipe' });
  
  console.log('✅ SES configuration set created');
} catch (error) {
  console.log('❌ Error setting up SES:', error.message);
}

// 4. Create IAM Role for Lambda/API
console.log('\n🔑 Setting up IAM roles...');
try {
  const trustPolicy = {
    Version: '2012-10-17',
    Statement: [{
      Effect: 'Allow',
      Principal: { Service: 'lambda.amazonaws.com' },
      Action: 'sts:AssumeRole'
    }]
  };

  execSync(`aws iam create-role \
    --role-name ${appName}-lambda-role \
    --assume-role-policy-document '${JSON.stringify(trustPolicy)}' \
    --region ${region}`, { stdio: 'pipe' });

  // Attach policies
  const policies = [
    'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
    'arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess',
    'arn:aws:iam::aws:policy/AmazonSESFullAccess',
    'arn:aws:iam::aws:policy/AmazonCognitoPowerUser'
  ];

  policies.forEach(policy => {
    try {
      execSync(`aws iam attach-role-policy --role-name ${appName}-lambda-role --policy-arn ${policy}`, { stdio: 'pipe' });
    } catch (e) {
      // Policy might already be attached
    }
  });

  console.log('✅ IAM role created');
} catch (error) {
  console.log('❌ Error creating IAM role:', error.message);
}

// 5. Create environment variables file
console.log('\n📝 Creating environment variables...');
const envContent = `# AWS Configuration
AWS_REGION=${region}
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# Cognito
COGNITO_USER_POOL_ID=${userPoolId || 'your-user-pool-id'}
COGNITO_CLIENT_ID=${clientId || 'your-client-id'}
COGNITO_IDENTITY_POOL_ID=${identityPoolId || 'your-identity-pool-id'}

# DynamoDB
DYNAMODB_TABLE_NAME=${appName}-main

# SES
SES_FROM_EMAIL=noreply@${domain}
SES_REGION=${region}

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# App Configuration
NEXTAUTH_URL=https://${domain}
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXT_PUBLIC_APP_URL=https://${domain}

# Meilisearch (Cloud)
MEILISEARCH_HOST=https://your-project.meilisearch.io
MEILISEARCH_API_KEY=your-meilisearch-api-key

# Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
POSTHOG_KEY=phc_your_posthog_key
POSTHOG_HOST=https://app.posthog.com

# Monitoring
SENTRY_DSN=your-sentry-dsn
NEW_RELIC_LICENSE_KEY=your-newrelic-license-key
`;

fs.writeFileSync('.env.production', envContent);
console.log('✅ Environment variables created in .env.production');

// 6. Create deployment script
const deployScript = `#!/bin/bash

echo "🚀 Deploying NYASC to AWS Amplify..."

# Install dependencies
npm ci

# Build the application
npm run build

# Deploy to Amplify
aws amplify start-deployment \\
  --app-id your-amplify-app-id \\
  --branch-name main \\
  --region ${region}

echo "✅ Deployment started!"
`;

fs.writeFileSync('scripts/deploy.sh', deployScript);
fs.chmodSync('scripts/deploy.sh', '755');
console.log('✅ Deployment script created');

console.log('\n🎉 AWS infrastructure setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Update .env.production with your actual API keys');
console.log('2. Set up Stripe account and get API keys');
console.log('3. Set up Meilisearch Cloud account');
console.log('4. Configure Amplify environment variables');
console.log('5. Run: npm run seed-data');
console.log('\n🌐 Your site will be available at: https://' + domain);
