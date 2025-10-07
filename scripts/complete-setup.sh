#!/bin/bash

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
