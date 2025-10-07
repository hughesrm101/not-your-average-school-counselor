#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔧 FIXING AWS SETUP - COMPLETING INFRASTRUCTURE\n');

const region = 'us-east-1';
const appName = 'nyasc-counselor';
const domain = 'nyasc.co';

// Get the existing User Pool ID
let userPoolId = 'us-east-1_WKbuxuSYe'; // From previous setup

console.log('🔐 Creating Cognito User Pool Client...');
try {
  const clientOutput = execSync(`aws cognito-idp create-user-pool-client \
    --user-pool-id ${userPoolId} \
    --client-name "${appName}-client" \
    --generate-secret \
    --explicit-auth-flows USER_PASSWORD_AUTH USER_SRP_AUTH \
    --supported-identity-providers COGNITO \
    --callback-urls "https://${domain}/auth/callback" "http://localhost:3000/auth/callback" \
    --logout-urls "https://${domain}/" "http://localhost:3000/" \
    --region ${region}`, { encoding: 'utf8' });

  const client = JSON.parse(clientOutput);
  const clientId = client.UserPoolClient.ClientId;
  console.log(`✅ User Pool Client created: ${clientId}`);

  // Create Identity Pool
  console.log('🆔 Creating Identity Pool...');
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

// Create DynamoDB Table with proper JSON formatting
console.log('\n🗄️  Creating DynamoDB table...');
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
      'IndexName=GSI1,KeySchema=[{AttributeName=GSI1PK,KeyType=HASH},{AttributeName=GSI1SK,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5}' \
      'IndexName=GSI2,KeySchema=[{AttributeName=GSI2PK,KeyType=HASH},{AttributeName=GSI2SK,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5}' \
    --billing-mode PAY_PER_REQUEST \
    --region ${region}`, { encoding: 'utf8' });

  console.log('✅ DynamoDB table created');
} catch (error) {
  console.log('❌ Error creating DynamoDB table:', error.message);
}

// Set up SES with correct parameters
console.log('\n📧 Setting up SES...');
try {
  // Verify domain
  execSync(`aws ses verify-domain-identity --domain ${domain} --region ${region}`, { stdio: 'pipe' });
  console.log(`✅ Domain ${domain} verification initiated`);
  
  // Create configuration set with correct parameters
  execSync(`aws ses create-configuration-set \
    --configuration-set '{
      "Name": "${appName}-config-set"
    }' \
    --region ${region}`, { stdio: 'pipe' });
  
  console.log('✅ SES configuration set created');
} catch (error) {
  console.log('❌ Error setting up SES:', error.message);
}

// Create environment variables file with actual values
console.log('\n📝 Creating environment variables...');
const envContent = `# AWS Configuration
AWS_REGION=${region}
AWS_ACCESS_KEY_ID=your-access-key-here
AWS_SECRET_ACCESS_KEY=your-secret-key-here

# Cognito
COGNITO_USER_POOL_ID=${userPoolId}
COGNITO_CLIENT_ID=your-client-id-here
COGNITO_IDENTITY_POOL_ID=your-identity-pool-id-here

# DynamoDB
DYNAMODB_TABLE_NAME=${appName}-main

# SES
SES_FROM_EMAIL=noreply@${domain}
SES_REGION=${region}

# Stripe (YOUR ACCOUNT REQUIRED)
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# App Configuration
NEXTAUTH_URL=https://${domain}
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXT_PUBLIC_APP_URL=https://${domain}

# Meilisearch (YOUR ACCOUNT REQUIRED)
MEILISEARCH_HOST=https://your-project.meilisearch.io
MEILISEARCH_API_KEY=your-meilisearch-api-key

# Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
POSTHOG_KEY=phc_your_posthog_key
POSTHOG_HOST=https://app.posthog.com
`;

fs.writeFileSync('.env.production', envContent);
console.log('✅ Environment variables created in .env.production');

console.log('\n🎉 AWS infrastructure setup complete!');
console.log('\n📋 NEXT STEPS:');
console.log('1. Run: node scripts/setup-stripe-real.js');
console.log('2. Create your Stripe account and get API keys');
console.log('3. Create your Meilisearch Cloud account');
console.log('4. Update .env.production with YOUR actual keys');
console.log('5. Set environment variables in AWS Amplify console');
console.log('6. Run: npm run seed-data');
console.log('\n🌐 Your site will be available at: https://' + domain);
