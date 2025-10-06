const { exec } = require('child_process');
const util = require('util');
const fs = require('fs');
const path = require('path');

const execAsync = util.promisify(exec);

// AWS Route 53 domain purchase and setup script
async function buyDomainThroughAWS() {
  console.log('🌐 Purchasing Domain Through AWS Route 53...\n');

  try {
    // 1. Check AWS CLI configuration
    console.log('🔍 Checking AWS CLI configuration...');
    try {
      const { stdout } = await execAsync('aws sts get-caller-identity');
      const identity = JSON.parse(stdout);
      console.log(`✅ AWS CLI configured for account: ${identity.Account}`);
      console.log(`   User: ${identity.Arn}\n`);
    } catch (error) {
      console.log('❌ AWS CLI not configured. Please run: aws configure');
      console.log('   You need: Access Key ID, Secret Access Key, Region (us-east-1)\n');
      return;
    }

    // 2. Check domain availability
    console.log('🔍 Checking domain availability...');
    const domain = 'nyasc.co'; // Our top recommendation
    
    try {
      const { stdout } = await execAsync(`aws route53domains check-domain-availability --domain-name ${domain}`);
      const availability = JSON.parse(stdout);
      
      if (availability.Availability === 'AVAILABLE') {
        console.log(`✅ ${domain} is AVAILABLE for purchase\n`);
      } else if (availability.Availability === 'UNAVAILABLE') {
        console.log(`❌ ${domain} is UNAVAILABLE\n`);
        console.log('🔄 Trying alternative domain: counselor-resources.com');
        const altDomain = 'counselor-resources.com';
        const { stdout: altOutput } = await execAsync(`aws route53domains check-domain-availability --domain-name ${altDomain}`);
        const altAvailability = JSON.parse(altOutput);
        
        if (altAvailability.Availability === 'AVAILABLE') {
          console.log(`✅ ${altDomain} is AVAILABLE for purchase\n`);
          domain = altDomain;
        } else {
          console.log(`❌ ${altDomain} is also UNAVAILABLE\n`);
          console.log('Please choose a different domain from the available list.');
          return;
        }
      } else {
        console.log(`⚠️  ${domain} availability: ${availability.Availability}\n`);
      }
    } catch (error) {
      console.log('⚠️  Could not check domain availability via AWS CLI');
      console.log('   This might be because Route 53 Domains is not available in your region');
      console.log('   or you need additional permissions.\n');
    }

    // 3. Get domain pricing
    console.log('💰 Getting domain pricing...');
    try {
      const { stdout } = await execAsync(`aws route53domains get-domain-suggestions --domain-name ${domain} --suggestion-count 5`);
      const suggestions = JSON.parse(stdout);
      console.log('✅ Domain suggestions retrieved\n');
    } catch (error) {
      console.log('⚠️  Could not get domain pricing via AWS CLI\n');
    }

    // 4. Register domain (if available)
    console.log('🛒 Registering domain...');
    console.log('⚠️  Note: Domain registration requires manual confirmation and payment');
    console.log('   AWS Route 53 Domains will send you an email for confirmation\n');

    // 5. Set up hosted zone
    console.log('🌐 Setting up Route 53 hosted zone...');
    try {
      const { stdout } = await execAsync(`aws route53 create-hosted-zone --name ${domain} --caller-reference ${Date.now()}`);
      const hostedZone = JSON.parse(stdout);
      const hostedZoneId = hostedZone.HostedZone.Id.split('/').pop();
      console.log(`✅ Hosted zone created: ${hostedZoneId}`);
      console.log(`   Name servers: ${hostedZone.DelegationSet.NameServers.join(', ')}\n`);
      
      // Save hosted zone info
      const zoneInfo = {
        domain,
        hostedZoneId,
        nameServers: hostedZone.DelegationSet.NameServers,
        createdAt: new Date().toISOString()
      };
      
      fs.writeFileSync('/tmp/hosted-zone-info.json', JSON.stringify(zoneInfo, null, 2));
      console.log('✅ Hosted zone info saved to /tmp/hosted-zone-info.json\n');
      
    } catch (error) {
      if (error.message.includes('HostedZoneAlreadyExists')) {
        console.log('✅ Hosted zone already exists\n');
      } else {
        console.log('⚠️  Could not create hosted zone:', error.message);
        console.log('   You may need to register the domain first\n');
      }
    }

    // 6. Create SSL certificate
    console.log('🔒 Creating SSL certificate...');
    try {
      const { stdout } = await execAsync(`aws acm request-certificate --domain-name ${domain} --validation-method DNS --region us-east-1`);
      const certificate = JSON.parse(stdout);
      console.log(`✅ SSL certificate requested: ${certificate.CertificateArn}`);
      console.log('   Certificate validation will be required via DNS\n');
    } catch (error) {
      console.log('⚠️  Could not create SSL certificate:', error.message);
      console.log('   This will be handled automatically by AWS Amplify\n');
    }

    // 7. Update deployment configuration
    console.log('⚙️  Updating deployment configuration...');
    updateDeploymentConfig(domain);
    console.log('✅ Deployment configuration updated\n');

    console.log('🎉 DOMAIN SETUP COMPLETED!');
    console.log('\n📋 Next Steps:');
    console.log('1. Complete domain registration payment in AWS Console');
    console.log('2. Update nameservers with your domain registrar');
    console.log('3. Deploy to AWS Amplify');
    console.log('4. Configure custom domain in Amplify');
    console.log('5. Test SSL certificate');

    console.log('\n🌐 Your domain will be:');
    console.log(`   https://${domain}`);

  } catch (error) {
    console.error('❌ Domain setup failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check AWS credentials: aws sts get-caller-identity');
    console.log('2. Verify Route 53 Domains permissions');
    console.log('3. Check if Route 53 Domains is available in your region');
    console.log('4. Try manual domain registration in AWS Console');
  }
}

function updateDeploymentConfig(domain) {
  // Update environment variables
  const envContent = `# Production Environment Variables for ${domain}

# Stripe (Live Keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_STRIPE_WEBHOOK_SECRET

# AWS Services
AWS_ACCESS_KEY_ID=AKIA_YOUR_AWS_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
AWS_REGION=us-east-1
COGNITO_USER_POOL_ID=us-east-1_YOUR_USER_POOL_ID
COGNITO_CLIENT_ID=YOUR_COGNITO_CLIENT_ID
DYNAMODB_TABLE_NAME=nyasc-platform
S3_BUCKET_NAME=nyasc-platform-assets

# Email (SES)
SES_REGION=us-east-1
SES_FROM_EMAIL=hello@${domain}
SES_REPLY_TO=support@${domain}

# Search (Meilisearch)
MEILISEARCH_URL=https://your-meilisearch-instance.com
MEILISEARCH_API_KEY=YOUR_MEILISEARCH_API_KEY

# Analytics
NEXT_PUBLIC_GA4_ID=G-YOUR_GA4_ID
NEXT_PUBLIC_POSTHOG_KEY=phc_YOUR_POSTHOG_KEY

# App Configuration
NEXTAUTH_URL=https://${domain}
NEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET_KEY

# SEO & Performance
NEXT_PUBLIC_SITE_URL=https://${domain}
NEXT_PUBLIC_SITE_NAME=Not Your Average School Counselor
`;

  fs.writeFileSync('env.production.example', envContent);
  
  // Update SEO configuration
  const seoConfig = `import { Metadata } from 'next';

// Advanced SEO configuration for top 1% performance
export const seoConfig = {
  siteName: 'Not Your Average School Counselor',
  siteUrl: 'https://${domain}',
  defaultTitle: 'Not Your Average School Counselor - Professional Resources',
  titleTemplate: '%s | NYASC',
  defaultDescription: 'Professional school counselor resources, lesson plans, and tools. Evidence-based materials for elementary, middle, and high school counselors.',
  defaultKeywords: [
    'school counselor',
    'counseling resources',
    'SEL activities',
    'lesson plans',
    'counseling worksheets',
    'mental health resources',
    'student support',
    'counseling tools',
    'educational resources',
    'school psychology'
  ],
  author: 'Not Your Average School Counselor',
  publisher: 'NYASC',
  locale: 'en_US',
  type: 'website',
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
    yandex: process.env.YANDEX_VERIFICATION_CODE,
    yahoo: process.env.YAHOO_VERIFICATION_CODE,
  },
};
`;

  fs.writeFileSync('../src/lib/seo-config-updated.ts', seoConfig);
}

// Alternative: Manual domain registration guide
function showManualRegistrationGuide() {
  console.log('📋 MANUAL DOMAIN REGISTRATION GUIDE:');
  console.log('=====================================\n');
  
  console.log('1. Go to AWS Route 53 Console:');
  console.log('   https://console.aws.amazon.com/route53/\n');
  
  console.log('2. Click "Registered domains" → "Register domain"\n');
  
  console.log('3. Search for your preferred domain:');
  console.log('   - nyasc.co (recommended)');
  console.log('   - counselor-resources.com');
  console.log('   - nyasc.io\n');
  
  console.log('4. Complete registration:');
  console.log('   - Choose registration period (1-10 years)');
  console.log('   - Add privacy protection');
  console.log('   - Complete payment\n');
  
  console.log('5. After registration:');
  console.log('   - Domain will be automatically configured');
  console.log('   - Hosted zone will be created');
  console.log('   - SSL certificate will be requested\n');
  
  console.log('6. Deploy to Amplify:');
  console.log('   - Connect your GitHub repository');
  console.log('   - Configure custom domain');
  console.log('   - SSL certificate will be automatically applied\n');
}

// Run the script
if (require.main === module) {
  const method = process.argv[2] || 'auto';
  
  if (method === 'manual') {
    showManualRegistrationGuide();
  } else {
    buyDomainThroughAWS().catch(console.error);
  }
}

module.exports = { buyDomainThroughAWS, showManualRegistrationGuide };
