# 🔑 API Keys & Configuration Setup Guide

## **Complete Guide to Setting Up All Required API Keys**

This guide will walk you through setting up every API key and service needed for your NYASC platform.

## ** Payment Processing - Stripe**

### **1. Create Stripe Account**
1. Go to [stripe.com](https://stripe.com)
2. Sign up for an account
3. Complete business verification

### **2. Get API Keys**
1. Go to **Developers > API Keys**
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
3. Copy your **Secret Key** (starts with `sk_test_` or `sk_live_`)

### **3. Set Up Webhooks**
1. Go to **Developers > Webhooks**
2. Click **Add endpoint**
3. Set URL to: `https://yourdomain.com/api/webhooks/stripe`
4. Select events: `checkout.session.completed`, `payment_intent.succeeded`
5. Copy the **Webhook Secret** (starts with `whsec_`)

### **4. Configure Stripe Tax**
1. Go to **Settings > Tax**
2. Enable **Stripe Tax**
3. Set up tax rates for your regions

---

## **☁️ AWS Services Setup**

### **1. Create AWS Account**
1. Go to [aws.amazon.com](https://aws.amazon.com)
2. Sign up for an account
3. Complete verification

### **2. Set Up IAM User**
1. Go to **IAM > Users**
2. Click **Create user**
3. Name: `nyasc-platform-user`
4. Attach policies:
   - `AmazonCognitoPowerUser`
   - `AmazonDynamoDBFullAccess`
   - `AmazonS3FullAccess`
   - `AmazonSESFullAccess`
   - `AmazonSQSFullAccess`
   - `AmazonEventBridgeFullAccess`
   - `SecretsManagerFullAccess`
5. Create access keys and download CSV

### **3. Amazon Cognito (User Authentication)**
1. Go to **Cognito > User Pools**
2. Click **Create user pool**
3. Name: `nyasc-user-pool`
4. Configure sign-in options: Email, Google, Apple, Microsoft
5. Set up MFA for admin users
6. Create groups: `superadmin`, `admin`, `user`
7. Note your **User Pool ID** and **Client ID**

### **4. DynamoDB (Database)**
1. Go to **DynamoDB > Tables**
2. Click **Create table**
3. Name: `nyasc-platform`
4. Partition key: `PK` (String)
5. Sort key: `SK` (String)
6. Enable **On-demand** billing
7. Create Global Secondary Indexes:
   - `GSI1`: `GSI1PK` (String), `GSI1SK` (String)
   - `GSI2`: `GSI2PK` (String), `GSI2SK` (String)
   - `GSI3`: `GSI3PK` (String), `GSI3SK` (String)
   - `GSI4`: `GSI4PK` (String), `GSI4SK` (String)

### **5. Amazon S3 (File Storage)**
1. Go to **S3 > Buckets**
2. Click **Create bucket**
3. Name: `nyasc-platform-assets`
4. Region: `us-east-1`
5. Block all public access: **No**
6. Create folders: `products/`, `blog/`, `uploads/`

### **6. Amazon SES (Email Service)**
1. Go to **SES > Verified identities**
2. Click **Create identity**
3. Choose **Domain**
4. Enter your domain: `yourdomain.com`
5. Verify domain ownership
6. Set up DKIM authentication
7. Request production access

### **7. Amazon SQS (Message Queues)**
1. Go to **SQS > Queues**
2. Click **Create queue**
3. Name: `nyasc-email-queue`
4. Type: **Standard**
5. Note the **Queue URL**

### **8. Amazon EventBridge (Scheduled Jobs)**
1. Go to **EventBridge > Rules**
2. Click **Create rule**
3. Name: `nyasc-scheduled-jobs`
4. Set up cron expressions for scheduled tasks

### **9. AWS Secrets Manager**
1. Go to **Secrets Manager > Secrets**
2. Click **Store a new secret**
3. Choose **Other type of secret**
4. Store your API keys securely

---

## **🔍 Search Engine - Meilisearch**

### **1. Set Up Meilisearch**
**Option A: Meilisearch Cloud (Recommended)**
1. Go to [meilisearch.com](https://meilisearch.com)
2. Sign up for cloud account
3. Create a new project
4. Note your **URL** and **API Key**

**Option B: Self-hosted on AWS EC2**
1. Launch EC2 instance (t3.small)
2. Install Meilisearch:
   ```bash
   curl -L https://install.meilisearch.com | sh
   ./meilisearch --master-key="your-master-key"
   ```
3. Set up security groups for port 7700

### **2. Configure Indexes**
1. Create indexes: `blog_posts`, `products`, `bundles`
2. Set up searchable attributes
3. Configure typo tolerance and faceting

---

## **📊 Analytics Services**

### **1. Google Analytics 4**
1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a new property
3. Set up data streams for web
4. Note your **Measurement ID** (starts with `G-`)

### **2. PostHog**
1. Go to [posthog.com](https://posthog.com)
2. Sign up for account
3. Create a new project
4. Note your **Project API Key** (starts with `phc_`)

---

## **📧 Email Marketing (Optional)**

### **1. Mailchimp**
1. Go to [mailchimp.com](https://mailchimp.com)
2. Create account
3. Get **API Key** and **Audience ID**

### **2. ConvertKit**
1. Go to [convertkit.com](https://convertkit.com)
2. Create account
3. Get **API Key** and **Form ID**

---

## **🔐 Security & Monitoring**

### **1. Cloudflare (Optional)**
1. Go to [cloudflare.com](https://cloudflare.com)
2. Add your domain
3. Set up DNS records
4. Enable security features

### **2. Sentry (Error Monitoring)**
1. Go to [sentry.io](https://sentry.io)
2. Create project
3. Get **DSN** for error tracking

---

## **📱 Social Media APIs (Optional)**

### **1. Instagram Basic Display API**
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create app
3. Get **App ID** and **App Secret**

### **2. TikTok for Business API**
1. Go to [business.tiktok.com](https://business.tiktok.com)
2. Create developer account
3. Get **Access Token**

---

## ** Environment Variables Template**

Create your `.env.local` file:

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AWS
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
COGNITO_USER_POOL_ID=us-east-1_...
COGNITO_CLIENT_ID=...
DYNAMODB_TABLE_NAME=nyasc-platform
S3_BUCKET_NAME=nyasc-platform-assets

# Email
SES_REGION=us-east-1
SES_FROM_EMAIL=hello@yourdomain.com
SES_REPLY_TO=support@yourdomain.com

# Search
MEILISEARCH_URL=https://your-meilisearch-instance.com
MEILISEARCH_API_KEY=...

# Analytics
NEXT_PUBLIC_GA4_ID=G-...
NEXT_PUBLIC_POSTHOG_KEY=phc_...

# App
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-key

# Optional Services
MAILCHIMP_API_KEY=...
MAILCHIMP_AUDIENCE_ID=...
SENTRY_DSN=...
```

---

## **✅ Verification Checklist**

Before going live, verify:

- [ ] Stripe test payments work
- [ ] User registration/login works
- [ ] Email delivery works
- [ ] Search functionality works
- [ ] Admin dashboard accessible
- [ ] File uploads work
- [ ] Analytics tracking works
- [ ] Mobile responsiveness
- [ ] SSL certificate active
- [ ] Domain properly configured

---

## **🚨 Important Security Notes**

1. **Never commit API keys to version control**
2. **Use environment variables for all secrets**
3. **Enable MFA on all service accounts**
4. **Regularly rotate API keys**
5. **Monitor usage and costs**
6. **Set up billing alerts**

---

## **💰 Estimated Monthly Costs**

- **AWS Services:** $50-200/month
- **Stripe:** 2.9% + $0.30 per transaction
- **Meilisearch Cloud:** $25-100/month
- **Domain & SSL:** $10-20/year
- **Total:** $100-400/month (depending on usage)

---

**Your platform is ready to go live! 🚀**
