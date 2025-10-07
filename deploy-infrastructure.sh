#!/bin/bash

# NYASC Infrastructure Deployment Script
echo "🚀 Deploying NYASC Infrastructure..."

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI not configured. Please run 'aws configure' first."
    exit 1
fi

# Check if CDK is installed
if ! command -v cdk &> /dev/null; then
    echo "📦 Installing AWS CDK..."
    npm install -g aws-cdk
fi

# Navigate to infrastructure directory
cd infra

# Install dependencies
echo "📦 Installing infrastructure dependencies..."
npm install

# Bootstrap CDK (first time only)
echo "🔧 Bootstrapping CDK..."
npx cdk bootstrap

# Deploy the infrastructure
echo "🏗️ Deploying infrastructure..."
npx cdk deploy --require-approval never

# Get the outputs
echo "📋 Getting deployment outputs..."
npx cdk list

echo "✅ Infrastructure deployment complete!"
echo ""
echo "🔑 Next steps:"
echo "1. Copy the environment variables from the CDK output"
echo "2. Update your .env.local file with the new values"
echo "3. Deploy your application to AWS Amplify"
echo ""
echo "📊 Your infrastructure includes:"
echo "- Cognito User Pool (Authentication)"
echo "- DynamoDB Table (Database)"
echo "- S3 Buckets (File Storage)"
echo "- SES Configuration (Email)"
echo "- CloudFront Distribution (CDN)"
echo "- Route 53 Hosted Zone (DNS)"
