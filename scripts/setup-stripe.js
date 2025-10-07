#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('💳 Setting up Stripe for NYASC...\n');

console.log('📋 Stripe Setup Instructions:');
console.log('1. Go to https://dashboard.stripe.com/register');
console.log('2. Create a new account or sign in');
console.log('3. Complete the account setup process');
console.log('4. Get your API keys from the dashboard\n');

console.log('🔑 Required Stripe Configuration:');
console.log('1. Publishable Key (pk_test_... or pk_live_...)');
console.log('2. Secret Key (sk_test_... or sk_live_...)');
console.log('3. Webhook Secret (whsec_...)\n');

console.log('⚙️  Stripe Products to Create:');
console.log('1. Social-Emotional Learning Toolkit - $29.99');
console.log('2. Career Exploration Workbook - $19.99');
console.log('3. Mindfulness Activities Pack - $24.99');
console.log('4. Complete SEL Toolkit Bundle - $99.99\n');

console.log('🔗 Webhook Endpoints to Configure:');
console.log('1. https://nyasc.co/api/stripe/webhook');
console.log('2. Events to listen for:');
console.log('   - payment_intent.succeeded');
console.log('   - payment_intent.payment_failed');
console.log('   - checkout.session.completed');
console.log('   - invoice.payment_succeeded\n');

console.log('📄 Stripe Tax Configuration:');
console.log('1. Enable Stripe Tax in your dashboard');
console.log('2. Configure tax settings for your region');
console.log('3. Set up automatic tax calculation\n');

console.log('🎫 Coupon Configuration:');
console.log('1. Create coupon: WELCOME10 (10% off)');
console.log('2. Create coupon: NEWUSER (15% off first order)');
console.log('3. Create coupon: BUNDLE20 (20% off bundles)\n');

// Create Stripe configuration file
const stripeConfig = `// Stripe Configuration for NYASC
export const stripeConfig = {
  // Test keys (replace with live keys for production)
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  secretKey: process.env.STRIPE_SECRET_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  
  // Currency and region
  currency: 'usd',
  country: 'US',
  
  // Tax settings
  automaticTax: {
    enabled: true,
  },
  
  // Payment methods
  paymentMethods: ['card', 'us_bank_account'],
  
  // Webhook endpoints
  webhookEndpoints: [
    {
      url: 'https://nyasc.co/api/stripe/webhook',
      events: [
        'payment_intent.succeeded',
        'payment_intent.payment_failed',
        'checkout.session.completed',
        'invoice.payment_succeeded'
      ]
    }
  ],
  
  // Product configuration
  products: [
    {
      id: 'sel-toolkit',
      name: 'Social-Emotional Learning Toolkit',
      price: 2999, // $29.99 in cents
      description: 'Comprehensive SEL resources for elementary students'
    },
    {
      id: 'career-workbook',
      name: 'Career Exploration Workbook',
      price: 1999, // $19.99 in cents
      description: 'Interactive workbook for high school career planning'
    },
    {
      id: 'mindfulness-pack',
      name: 'Mindfulness Activities Pack',
      price: 2499, // $24.99 in cents
      description: '50 mindfulness activities for middle school students'
    },
    {
      id: 'complete-sel-bundle',
      name: 'Complete SEL Toolkit',
      price: 9999, // $99.99 in cents
      description: 'Everything you need for social-emotional learning'
    }
  ],
  
  // Coupons
  coupons: [
    {
      id: 'welcome10',
      name: 'WELCOME10',
      percent_off: 10,
      duration: 'once',
      max_redemptions: 1000
    },
    {
      id: 'newuser15',
      name: 'NEWUSER',
      percent_off: 15,
      duration: 'once',
      max_redemptions: 500
    },
    {
      id: 'bundle20',
      name: 'BUNDLE20',
      percent_off: 20,
      duration: 'once',
      max_redemptions: 200
    }
  ]
};

export default stripeConfig;
`;

fs.writeFileSync('src/lib/stripe-config.ts', stripeConfig);
console.log('✅ Stripe configuration file created');

console.log('\n🎯 Next Steps:');
console.log('1. Update your .env.production with Stripe keys');
console.log('2. Create products in Stripe Dashboard');
console.log('3. Set up webhook endpoints');
console.log('4. Test payments in test mode');
console.log('5. Switch to live mode when ready for production\n');

console.log('🔗 Useful Links:');
console.log('- Stripe Dashboard: https://dashboard.stripe.com');
console.log('- Stripe Docs: https://stripe.com/docs');
console.log('- Webhook Testing: https://stripe.com/docs/webhooks/test');
console.log('- Tax Setup: https://stripe.com/docs/tax');
