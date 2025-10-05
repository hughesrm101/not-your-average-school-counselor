#!/bin/bash

# NYASC Local Development Setup Script
echo "🚀 Setting up NYASC for local development..."

# Create .env.local file
cat > app/.env.local << 'EOF'
# AWS Configuration (Mock for local development)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=mock-access-key
AWS_SECRET_ACCESS_KEY=mock-secret-key

# Cognito Configuration (Mock for local development)
COGNITO_USER_POOL_ID=us-east-1_mock
COGNITO_CLIENT_ID=mock-client-id
COGNITO_DOMAIN=nyasc-auth-mock
COGNITO_REDIRECT_URI=http://localhost:3001/auth/callback
COGNITO_LOGOUT_URI=http://localhost:3001/

# DynamoDB Configuration (Mock for local development)
DYNAMODB_TABLE_NAME=nyasc-main-table-mock

# S3 Configuration (Mock for local development)
S3_PRIVATE_BUCKET=nyasc-private-products-mock
S3_PUBLIC_BUCKET=nyasc-public-assets-mock

# SES Configuration (Mock for local development)
SES_FROM_EMAIL=noreply@nyasc.local
SES_REPLY_TO_EMAIL=support@nyasc.local

# Stripe Configuration (Test keys - replace with your actual test keys)
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Meilisearch Configuration (Mock for local development)
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_API_KEY=mock-api-key

# Analytics (Replace with your actual keys)
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_POSTHOG_KEY=phc_your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3001
SITE_NAME=Not Your Average School Counselor
SITE_DESCRIPTION=Professional resources and digital products for school counselors

# Secrets Manager (Mock for local development)
SECRETS_MANAGER_SECRET_NAME=nyasc-secrets-mock

# Email Queue (Mock for local development)
EMAIL_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/mock/email-queue
SEARCH_INDEX_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/mock/search-index-queue

# EventBridge (Mock for local development)
EVENT_BUS_NAME=nyasc-event-bus-mock

# CloudFront (Mock for local development)
CLOUDFRONT_DISTRIBUTION_ID=mock-distribution-id

# Domain (Mock for local development)
DOMAIN_NAME=nyasc.local
EOF

echo "✅ Created .env.local file"

# Install dependencies
echo "📦 Installing dependencies..."
cd app && npm install

echo "🎉 Setup complete! You can now run:"
echo "   cd app && npm run dev"
echo ""
echo "📝 Next steps:"
echo "1. Update the Stripe keys in app/.env.local with your actual test keys"
echo "2. Update the analytics keys if you want to use them"
echo "3. Run 'cd app && npm run dev' to start the development server"
echo "4. Visit http://localhost:3001 to see your application"
echo ""
echo "🔧 For production deployment:"
echo "1. Set up AWS infrastructure with 'cd infra && npx cdk deploy'"
echo "2. Update .env.local with actual AWS resource names"
echo "3. Deploy to AWS Amplify Hosting"
