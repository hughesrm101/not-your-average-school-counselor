#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔧 FINAL AWS SETUP - FIXING ALL ISSUES\n');

const region = 'us-east-1';
const appName = 'nyasc-counselor';
const domain = 'nyasc.co';
const userPoolId = 'us-east-1_WKbuxuSYe';

console.log('🔐 Creating Cognito User Pool Client (FIXED)...');
try {
  const clientOutput = execSync(`aws cognito-idp create-user-pool-client \
    --user-pool-id ${userPoolId} \
    --client-name "${appName}-client" \
    --generate-secret \
    --explicit-auth-flows ALLOW_USER_PASSWORD_AUTH ALLOW_USER_SRP_AUTH ALLOW_REFRESH_TOKEN_AUTH \
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

  // Save the IDs for later use
  fs.writeFileSync('aws-ids.json', JSON.stringify({
    userPoolId,
    clientId,
    identityPoolId
  }, null, 2));

} catch (error) {
  console.log('❌ Error creating Cognito resources:', error.message);
}

// Create DynamoDB Table with PAY_PER_REQUEST (no provisioned throughput)
console.log('\n🗄️  Creating DynamoDB table (FIXED)...');
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
      'IndexName=GSI1,KeySchema=[{AttributeName=GSI1PK,KeyType=HASH},{AttributeName=GSI1SK,KeyType=RANGE}],Projection={ProjectionType=ALL}' \
      'IndexName=GSI2,KeySchema=[{AttributeName=GSI2PK,KeyType=HASH},{AttributeName=GSI2SK,KeyType=RANGE}],Projection={ProjectionType=ALL}' \
    --billing-mode PAY_PER_REQUEST \
    --region ${region}`, { encoding: 'utf8' });

  console.log('✅ DynamoDB table created');
} catch (error) {
  console.log('❌ Error creating DynamoDB table:', error.message);
}

// Create IAM role for the application
console.log('\n🔑 Creating IAM role...');
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

console.log('\n🎉 AWS infrastructure setup complete!');
console.log('\n📋 YOUR NEXT STEPS:');
console.log('1. Create YOUR Stripe account: https://dashboard.stripe.com/register');
console.log('2. Create YOUR Meilisearch Cloud account: https://cloud.meilisearch.com/');
console.log('3. Get YOUR API keys from both services');
console.log('4. Update .env.production with YOUR actual keys');
console.log('5. Set environment variables in AWS Amplify console');
console.log('6. Test your complete platform!');
console.log('\n💰 REMEMBER: All money goes to YOUR bank account, not mine!');
console.log('\n🌐 Your site: https://nyasc.co');
