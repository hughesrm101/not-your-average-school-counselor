# Not Your Average School Counselor (NYASC)

A comprehensive, production-ready content + commerce platform designed specifically for school counselors. Built with Next.js 14, AWS infrastructure, and modern best practices.

## 🚀 Features

### 🛒 E-Commerce Platform
- **Digital Product Sales**: Secure digital product delivery with Stripe payments
- **Bundles & Coupons**: Advanced pricing with bundle discounts and coupon codes
- **Store Credit System**: User rewards and referral credit system
- **Tax Compliance**: Automatic tax calculation with Stripe Tax
- **Global Payments**: Support for Apple Pay, Google Pay, and international payments

### 📝 Content Management
- **MDX Blog System**: Rich content with scheduling, categories, tags, and grade levels
- **Comment System**: Moderated comments with spam detection
- **SEO Optimization**: Complete meta tags, structured data, and sitemaps
- **Content Scheduling**: Draft, scheduled, and published post states

### 🔐 Authentication & Security
- **Amazon Cognito**: User pools with Hosted UI, MFA, and group-based RBAC
- **Role-Based Access Control**: Superadmin, admin, and user roles
- **Security Best Practices**: HttpOnly cookies, CSP, rate limiting, and audit logging
- **Multi-Factor Authentication**: Required for admin users

### 📧 Email & Communications
- **AWS SES**: Transactional and campaign email system
- **Email Templates**: Welcome, purchase confirmations, and marketing campaigns
- **Unsubscribe Management**: GDPR/CCPA compliant email preferences
- **Automated Workflows**: Post-purchase, abandoned cart, and drip campaigns

### 🔍 Search & Discovery
- **Meilisearch Integration**: Fast, typo-tolerant site-wide search
- **Faceted Search**: Filter by categories, grades, tags, and content type
- **Search Analytics**: Track search queries and results
- **Real-time Indexing**: Automatic content indexing via DynamoDB Streams

### 🎨 User Interface & Experience
- **Shadcn/ui Components**: Professional, accessible component library
- **Tailwind CSS**: Utility-first styling with custom NYASC design system
- **Framer Motion**: Smooth animations and transitions
- **Responsive Design**: Mobile-first approach with perfect desktop experience
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels

### 📊 Analytics & Monitoring
- **Google Analytics 4**: Complete event tracking and user behavior analysis
- **PostHog**: Advanced product analytics and feature flags
- **Performance Monitoring**: Lighthouse scores and Core Web Vitals
- **Error Tracking**: Comprehensive error logging and monitoring

### ⚙️ Admin Dashboard
- **Comprehensive CRUD**: Full management of products, bundles, orders, users, and content
- **Email Campaign Management**: Create, schedule, and track email campaigns
- **Analytics Dashboard**: Revenue, user, and content performance metrics
- **Audit Logging**: Complete activity tracking for compliance
- **Settings Management**: Global platform configuration

## 🏗️ Architecture

### Frontend
- **Next.js 14**: App Router with Server Components and Server Actions
- **TypeScript**: Fully typed codebase with strict type checking
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Shadcn/ui**: Accessible component library built on Radix UI
- **Framer Motion**: Animation library for smooth transitions

### Backend & Infrastructure
- **AWS CDK**: Infrastructure as Code with TypeScript
- **Amazon Cognito**: User authentication and authorization
- **DynamoDB**: Single-table design for optimal performance
- **AWS S3**: Private product storage with pre-signed URLs
- **AWS SES**: Email delivery and campaign management
- **Meilisearch**: Fast, typo-tolerant search engine
- **Stripe**: Payment processing and tax calculation

### Database Schema
- **Single-Table Design**: Optimized DynamoDB schema with GSI patterns
- **Entities**: Users, Products, Bundles, Orders, Downloads, Coupons, Store Credit, Referrals, Blog Posts, Comments, Email Events
- **Relationships**: Efficient querying with proper key design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- AWS CLI configured with appropriate permissions
- Stripe account with test keys
- (Optional) Meilisearch instance for search functionality

### Local Development Setup

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd "Not Your Average School Counselor"
   ./setup-local.sh
   ```

2. **Configure Environment**
   ```bash
   cd app
   cp .env.example .env.local
   # Edit .env.local with your actual keys
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access Application**
   - Frontend: http://localhost:3001
   - Admin Dashboard: http://localhost:3001/admin
   - API Routes: http://localhost:3001/api

### Production Deployment

#### 1. Deploy AWS Infrastructure

```bash
cd infra
npm install
npx cdk bootstrap  # First time only
npx cdk deploy
```

#### 2. Configure Environment Variables

Update your production environment with the deployed AWS resource names:

```bash
# Get outputs from CDK deployment
npx cdk outputs
```

#### 3. Deploy to AWS Amplify Hosting

1. Connect your repository to AWS Amplify
2. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```
3. Set environment variables in Amplify console
4. Deploy

#### 4. Configure Domain and SSL

1. Add your domain to Route 53
2. Configure SSL certificate in AWS Certificate Manager
3. Update CloudFront distribution with custom domain
4. Update environment variables with production domain

## 📁 Project Structure

```
nyasc/
├── infra/                    # AWS CDK Infrastructure
│   ├── lib/
│   │   └── infra-stack.ts   # Main CDK stack
│   ├── bin/
│   │   └── infra.ts         # CDK app entry point
│   └── package.json
├── app/                      # Next.js Application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # React components
│   │   ├── lib/             # Utility libraries
│   │   └── types/           # TypeScript types
│   ├── public/              # Static assets
│   ├── data/                # Sample data
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

#### Required for Production
```bash
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# Cognito Configuration
COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
COGNITO_CLIENT_ID=your-client-id
COGNITO_DOMAIN=your-auth-domain

# DynamoDB Configuration
DYNAMODB_TABLE_NAME=nyasc-main-table

# S3 Configuration
S3_PRIVATE_BUCKET=nyasc-private-products-XXXXXXXXX-us-east-1
S3_PUBLIC_BUCKET=nyasc-public-assets-XXXXXXXXX-us-east-1

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

#### Optional
```bash
# Analytics
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_POSTHOG_KEY=phc_your_posthog_key

# Meilisearch
MEILISEARCH_HOST=https://your-meilisearch-instance.com
MEILISEARCH_API_KEY=your_meilisearch_api_key
```

### Stripe Configuration

1. **Create Stripe Account**: Sign up at https://stripe.com
2. **Get API Keys**: Copy publishable and secret keys from dashboard
3. **Configure Webhooks**: Add webhook endpoint for order processing
4. **Set up Tax**: Enable Stripe Tax for automatic tax calculation
5. **Test Payments**: Use test keys for development

### AWS Services Setup

#### Cognito User Pool
- Configure OAuth providers (Google, Apple, Microsoft)
- Set up MFA for admin users
- Create user groups (superadmin, admin, user)

#### DynamoDB Table
- Single-table design with GSI patterns
- Pay-per-request billing
- Point-in-time recovery enabled

#### S3 Buckets
- Private bucket for digital products
- Public bucket for static assets
- CloudFront distribution for CDN

#### SES Configuration
- Verify domain for email sending
- Set up bounce and complaint handling
- Configure sending limits

## 🧪 Testing

### Unit Tests
```bash
cd app
npm run test
```

### E2E Tests
```bash
cd app
npm run test:e2e
```

### Performance Testing
```bash
cd app
npm run lighthouse
```

## 📊 Monitoring & Analytics

### Google Analytics 4
- User behavior tracking
- E-commerce events
- Custom dimensions and metrics

### PostHog
- Product analytics
- Feature flags
- User session recordings

### AWS CloudWatch
- Application logs
- Performance metrics
- Error tracking

## 🔒 Security

### Authentication
- JWT tokens with proper expiration
- Secure cookie handling
- MFA for admin users

### Data Protection
- Encryption at rest and in transit
- Secure file storage with pre-signed URLs
- GDPR/CCPA compliance features

### Infrastructure Security
- VPC with private subnets
- Security groups with least privilege
- WAF for DDoS protection

## 🚀 Performance

### Frontend Optimization
- Next.js App Router with Server Components
- Image optimization with next/image
- Code splitting and lazy loading
- Service worker for caching

### Backend Optimization
- DynamoDB single-table design
- S3 with CloudFront CDN
- Connection pooling
- Caching strategies

### Performance Targets
- Lighthouse Score: ≥95
- LCP: <1.5s
- CLS: <0.1
- FID: <100ms

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/session` - Get current session

### Product Endpoints
- `GET /api/products` - List products
- `GET /api/products/[id]` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Order Endpoints
- `POST /api/orders` - Create order
- `GET /api/orders` - List user orders
- `GET /api/orders/[id]` - Get order details
- `POST /api/orders/[id]/download` - Generate download link

### Blog Endpoints
- `GET /api/blog` - List blog posts
- `GET /api/blog/[slug]` - Get blog post
- `POST /api/blog` - Create blog post (admin)
- `PUT /api/blog/[slug]` - Update blog post (admin)
- `DELETE /api/blog/[slug]` - Delete blog post (admin)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@nyasc.com
- Documentation: [Link to documentation]
- Issues: [GitHub Issues]

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core platform functionality
- ✅ E-commerce features
- ✅ Content management
- ✅ Admin dashboard

### Phase 2 (Next)
- 🔄 Mobile app
- 🔄 Advanced analytics
- 🔄 Community features
- 🔄 API marketplace

### Phase 3 (Future)
- 📋 AI-powered recommendations
- 📋 Advanced personalization
- 📋 Multi-language support
- 📋 White-label solutions

---

**Built with ❤️ for school counselors by the NYASC team**