#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('💳 STRIPE SETUP - YOUR ACCOUNT REQUIRED');
console.log('==========================================\n');

console.log('🚨 IMPORTANT: You need to create YOUR OWN Stripe account!');
console.log('The money will go to YOUR bank account, not mine.\n');

console.log('📋 STEP-BY-STEP SETUP:');
console.log('1. Go to https://dashboard.stripe.com/register');
console.log('2. Create your account with YOUR email');
console.log('3. Complete business verification');
console.log('4. Add YOUR bank account for payouts');
console.log('5. Get YOUR API keys from the dashboard\n');

console.log('🔑 REQUIRED INFORMATION:');
console.log('- Business name: Your school counselor business');
console.log('- Business type: Individual/Sole proprietorship');
console.log('- Industry: Education services');
console.log('- Website: https://nyasc.co');
console.log('- Business address: Your address');
console.log('- Tax ID: Your SSN or EIN\n');

console.log('💰 PAYOUT CONFIGURATION:');
console.log('- Payout schedule: Daily (recommended)');
console.log('- Bank account: YOUR checking account');
console.log('- Currency: USD');
console.log('- Country: United States\n');

console.log('🔧 API KEYS TO GET:');
console.log('1. Go to Developers > API keys');
console.log('2. Copy "Publishable key" (starts with pk_test_)');
console.log('3. Copy "Secret key" (starts with sk_test_)');
console.log('4. Create webhook endpoint: https://nyasc.co/api/stripe/webhook');
console.log('5. Copy webhook secret (starts with whsec_)\n');

console.log('📝 PRODUCTS TO CREATE IN STRIPE:');
console.log('1. Social-Emotional Learning Toolkit - $29.99');
console.log('2. Career Exploration Workbook - $19.99');
console.log('3. Mindfulness Activities Pack - $24.99');
console.log('4. Complete SEL Toolkit Bundle - $99.99\n');

console.log('🎫 COUPONS TO CREATE:');
console.log('1. WELCOME10 - 10% off first purchase');
console.log('2. NEWUSER - 15% off for new users');
console.log('3. BUNDLE20 - 20% off bundles\n');

console.log('🔗 WEBHOOK EVENTS TO LISTEN FOR:');
console.log('- checkout.session.completed');
console.log('- payment_intent.succeeded');
console.log('- payment_intent.payment_failed');
console.log('- invoice.payment_succeeded\n');

console.log('📊 TAX SETUP:');
console.log('1. Enable Stripe Tax in dashboard');
console.log('2. Configure tax settings for your region');
console.log('3. Set up automatic tax calculation\n');

console.log('🔒 SECURITY:');
console.log('- Use test keys during development');
console.log('- Switch to live keys for production');
console.log('- Keep secret keys secure');
console.log('- Use environment variables\n');

console.log('📈 ANALYTICS:');
console.log('- Monitor payments in Stripe dashboard');
console.log('- Set up email notifications');
console.log('- Configure dispute handling\n');

console.log('🎯 NEXT STEPS:');
console.log('1. Create your Stripe account');
console.log('2. Get your API keys');
console.log('3. Update .env.production with YOUR keys');
console.log('4. Test payments in test mode');
console.log('5. Switch to live mode when ready\n');

console.log('💰 MONEY FLOW:');
console.log('Customer pays → Stripe processes → Money goes to YOUR bank account');
console.log('Stripe fee: 2.9% + $0.30 per transaction');
console.log('You keep: 97.1% - $0.30 per transaction\n');

console.log('📞 SUPPORT:');
console.log('- Stripe Support: https://support.stripe.com');
console.log('- Documentation: https://stripe.com/docs');
console.log('- Status page: https://status.stripe.com\n');

console.log('✅ Once you have your keys, update the environment variables!');
