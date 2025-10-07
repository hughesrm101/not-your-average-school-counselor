#!/bin/bash

echo "🔧 AMPLIFY WEBHOOK FIX SCRIPT"
echo "=============================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in project root directory"
    exit 1
fi

echo "✅ Project directory confirmed"

# Check git status
echo "📋 Checking git status..."
git status --porcelain

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: There are uncommitted changes"
    echo "📝 Current changes:"
    git diff --name-only
fi

# Check recent commits
echo "📊 Recent commits:"
git log --oneline -5

# Check remote repository
echo "🔗 Remote repository:"
git remote -v

# Check if we can push
echo "🚀 Testing git push..."
if git push origin main --dry-run; then
    echo "✅ Git push test successful"
else
    echo "❌ Git push test failed"
    exit 1
fi

echo ""
echo "🎯 NEXT STEPS:"
echo "1. Go to AWS Amplify Console"
echo "2. Find your app: nyasc-platform"
echo "3. Go to App Settings → General"
echo "4. Check Repository connection"
echo "5. Look for Webhook settings"
echo "6. If webhook is broken, reconnect repository"
echo ""
echo "🔍 MANUAL DEPLOYMENT TRIGGER:"
echo "1. Go to Deployments tab in Amplify"
echo "2. Look for 'Redeploy' or 'Start new deployment' button"
echo "3. Click it to manually trigger deployment"
echo ""
echo "📞 If you need help with AWS console navigation, let me know!"
