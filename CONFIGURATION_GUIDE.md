# NYASC Configuration Guide

## 🔑 **Required API Keys & Configuration**

To deploy your NYASC platform to production, you'll need to configure the following services and obtain their API keys:

### 1. **AWS Services** (Primary Infrastructure)

#### AWS Account Setup
- **AWS Account**: Create an AWS account at https://aws.amazon.com
- **AWS CLI**: Install and configure with your credentials
- **Region**: All services will be deployed to `us-east-1`

#### Required AWS Services:
- **Cognito** (User Authentication)
- **DynamoDB** (Database)
- **S3** (File Storage)
- **CloudFront** (CDN)
- **SES** (Email Service)
- **SQS** (Message Queues)
- **EventBridge** (Scheduled Jobs)
- **Secrets Manager** (API Keys Storage)
- **Route 53** (DNS Management)
- **Certificate Manager** (SSL Certificates)

### 2. **Stripe** (Payment Processing)

#### Get Your Stripe Keys:
1. **Create Account**: https://stripe.com
2. **Get API Keys**: 
   - Dashboard → Developers → API Keys
   - **Publishable Key**: `pk_live_...` (for frontend)
   - **Secret Key**: `sk_live_...` (for backend)
3. **Webhook Endpoint**: 
   - Dashboard → Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`
   - Copy webhook secret: `whsec_...`

#### Stripe Tax Setup:
1. **Enable Stripe Tax**: Dashboard → Tax → Get Started
2. **Configure Tax Settings**: Set up tax calculation for your regions
3. **Test Mode**: Use test keys for development

### 3. **Google Analytics 4** (Analytics)

#### Setup GA4:
1. **Create Account**: https://analytics.google.com
2. **Create Property**: 
   - Property name: "NYASC Platform"
   - Reporting time zone: Your timezone
   - Currency: USD
3. **Get Measurement ID**: 
   - Admin → Data Streams → Web → Measurement ID
   - Format: `G-XXXXXXXXXX`

### 4. **PostHog** (Product Analytics) - Optional

#### Setup PostHog:
1. **Create Account**: https://posthog.com
2. **Create Project**: 
   - Project name: "NYASC Platform"
3. **Get API Key**: 
   - Project Settings → API Keys
   - Copy Project API Key: `phc_...`

### 5. **Meilisearch** (Search Engine)

#### Deploy Meilisearch:
1. **EC2 Instance**: Launch t3.small instance in us-east-1
2. **Install Meilisearch**: Follow official installation guide
3. **Configure Security**: 
   - Set up security groups (port 7700)
   - Create master key
4. **Get Connection Details**:
   - Host: `https://your-meilisearch-instance.com`
   - API Key: Your master key

### 6. **Domain & SSL** (Website)

#### Domain Setup:
1. **Purchase Domain**: Use Route 53 or your preferred registrar
2. **SSL Certificate**: 
   - AWS Certificate Manager → Request Certificate
   - Add domain and www subdomain
   - Validate ownership
3. **DNS Configuration**: Point domain to CloudFront distribution

## 📝 **Environment Variables Configuration**

### Production Environment Variables

Create a `.env.production` file with these values:

```bash
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-access-key

# Cognito Configuration
COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
COGNITO_CLIENT_ID=your-cognito-client-id
COGNITO_DOMAIN=your-auth-domain
COGNITO_REDIRECT_URI=https://yourdomain.com/auth/callback
COGNITO_LOGOUT_URI=https://yourdomain.com/

# DynamoDB Configuration
DYNAMODB_TABLE_NAME=nyasc-main-table

# S3 Configuration
S3_PRIVATE_BUCKET=nyasc-private-products-XXXXXXXXX-us-east-1
S3_PUBLIC_BUCKET=nyasc-public-assets-XXXXXXXXX-us-east-1

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Analytics Configuration
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_POSTHOG_KEY=phc_your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Meilisearch Configuration
MEILISEARCH_HOST=https://your-meilisearch-instance.com
MEILISEARCH_API_KEY=your_meilisearch_api_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-nextauth-secret-key

# Email Configuration
SES_FROM_EMAIL=noreply@yourdomain.com
SES_FROM_NAME=NYASC Platform
```

### Development Environment Variables

For local development, use `.env.local`:

```bash
# AWS Configuration (use test values)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-dev-access-key
AWS_SECRET_ACCESS_KEY=your-dev-secret-key

# Cognito Configuration (use test user pool)
COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
COGNITO_CLIENT_ID=your-dev-cognito-client-id
COGNITO_DOMAIN=your-dev-auth-domain
COGNITO_REDIRECT_URI=http://localhost:3001/auth/callback
COGNITO_LOGOUT_URI=http://localhost:3001/

# DynamoDB Configuration
DYNAMODB_TABLE_NAME=nyasc-main-table-dev

# S3 Configuration
S3_PRIVATE_BUCKET=nyasc-private-products-dev-XXXXXXXXX-us-east-1
S3_PUBLIC_BUCKET=nyasc-public-assets-dev-XXXXXXXXX-us-east-1

# Stripe Configuration (use test keys)
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Analytics Configuration (optional for dev)
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_POSTHOG_KEY=phc_your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Meilisearch Configuration (local instance)
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_API_KEY=your_meilisearch_api_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-nextauth-secret-key

# Email Configuration (use SES sandbox for dev)
SES_FROM_EMAIL=noreply@yourdomain.com
SES_FROM_NAME=NYASC Platform
```

## 🚀 **Deployment Steps**

### Step 1: Deploy AWS Infrastructure

```bash
cd infra
npm install
npx cdk bootstrap  # First time only
npx cdk deploy
```

**Note**: The CDK deployment may need adjustments for existing resources. You may need to:
- Clean up existing AWS resources
- Use different resource names
- Deploy in stages

### Step 2: Configure Cognito User Pool

1. **Create User Groups**:
   - `superadmin` - Full access
   - `admin` - Admin access
   - `user` - Regular user access

2. **Set Up OAuth Providers**:
   - Google OAuth
   - Apple OAuth
   - Microsoft OAuth

3. **Configure MFA**:
   - Enable MFA for admin users
   - Set up SMS or TOTP

4. **Create Initial Admin User**:
   - Create superadmin user
   - Add to superadmin group

### Step 3: Configure SES Email

1. **Verify Domain**:
   - SES Console → Verified identities
   - Add your domain
   - Complete DNS verification

2. **Request Production Access**:
   - Move out of SES sandbox
   - Request sending limits increase

3. **Configure Bounce/Complaint Handling**:
   - Set up SNS topics
   - Configure Lambda functions

### Step 4: Deploy Meilisearch

1. **Launch EC2 Instance**:
   - Instance type: t3.small
   - Security group: Allow port 7700
   - Install Meilisearch

2. **Configure Meilisearch**:
   - Set master key
   - Configure indexes
   - Set up backup

### Step 5: Deploy to AWS Amplify

1. **Connect Repository**:
   - Amplify Console → New App → Host web app
   - Connect your GitHub repository

2. **Configure Build Settings**:
   - Use the provided build configuration
   - Set environment variables

3. **Deploy**:
   - Trigger automatic deployment
   - Monitor build logs

### Step 6: Configure Domain & SSL

1. **Route 53**:
   - Create hosted zone for your domain
   - Update nameservers

2. **CloudFront**:
   - Update distribution with custom domain
   - Configure SSL certificate

3. **DNS**:
   - Point domain to CloudFront distribution
   - Set up www redirect

## 🔧 **Post-Deployment Configuration**

### 1. **Stripe Webhooks**
- Update webhook endpoint URL
- Test webhook delivery
- Configure retry settings

### 2. **Analytics Setup**
- Verify GA4 tracking
- Set up PostHog events
- Configure conversion tracking

### 3. **Search Indexing**
- Run initial Meilisearch indexing
- Set up automatic sync
- Test search functionality

### 4. **Email Templates**
- Customize email templates
- Test transactional emails
- Set up email campaigns

### 5. **Monitoring & Alerts**
- Set up CloudWatch alarms
- Configure error tracking
- Set up performance monitoring

## 🧪 **Testing Checklist**

### Authentication
- [ ] User registration
- [ ] User login/logout
- [ ] OAuth providers
- [ ] MFA for admins
- [ ] Password reset

### E-commerce
- [ ] Product browsing
- [ ] Add to cart
- [ ] Checkout process
- [ ] Payment processing
- [ ] Digital downloads
- [ ] Coupon codes
- [ ] Store credit

### Content Management
- [ ] Blog post creation
- [ ] Post scheduling
- [ ] Comment system
- [ ] Search functionality
- [ ] Category filtering

### Admin Dashboard
- [ ] Admin access control
- [ ] Product management
- [ ] Order management
- [ ] User management
- [ ] Analytics dashboard

### Email System
- [ ] Transactional emails
- [ ] Email campaigns
- [ ] Unsubscribe handling
- [ ] Bounce management

## 🆘 **Troubleshooting**

### Common Issues:

1. **Build Failures**:
   - Check environment variables
   - Verify AWS credentials
   - Check CDK deployment logs

2. **Authentication Issues**:
   - Verify Cognito configuration
   - Check OAuth provider setup
   - Validate redirect URIs

3. **Payment Issues**:
   - Verify Stripe keys
   - Check webhook configuration
   - Test with Stripe test mode

4. **Email Issues**:
   - Check SES verification
   - Verify domain configuration
   - Check sending limits

5. **Search Issues**:
   - Verify Meilisearch connection
   - Check index configuration
   - Test API endpoints

## 📞 **Support Resources**

- **AWS Documentation**: https://docs.aws.amazon.com
- **Stripe Documentation**: https://stripe.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **CDK Documentation**: https://docs.aws.amazon.com/cdk

## 🎯 **Next Steps**

1. **Get API Keys**: Obtain all required API keys and credentials
2. **Deploy Infrastructure**: Run CDK deployment
3. **Configure Services**: Set up all third-party services
4. **Deploy Application**: Deploy to AWS Amplify
5. **Test Everything**: Run through the testing checklist
6. **Go Live**: Launch your platform!

Your NYASC platform is ready to empower school counselors with professional resources and tools! 🎓✨
