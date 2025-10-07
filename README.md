# Not Your Average School Counselor

A world-class e-commerce and blog platform for school counselors, built with Next.js 15, AWS, and modern web technologies.

## 🚀 Features

### 🛒 E-commerce Platform
- **Product Catalog**: Browse and filter resources by category and grade level
- **Shopping Cart**: Add items and manage quantities
- **Secure Checkout**: Stripe payment processing with tax calculation
- **Digital Downloads**: Instant access to purchased resources
- **Order Management**: Track purchases and download history

### 📝 Blog System
- **Professional Content**: Evidence-based articles for school counselors
- **Search & Filter**: Find content by tags and categories
- **Featured Posts**: Highlight important content
- **Reading Time**: Estimated reading time for each post
- **Author Profiles**: Learn about content creators

### 🔐 Authentication & Security
- **AWS Cognito**: Secure user registration and login
- **Role-Based Access**: Different permissions for users and admins
- **JWT Tokens**: Secure session management
- **Password Policies**: Strong password requirements
- **Email Verification**: Secure account activation

### 🔍 Search & Discovery
- **Meilisearch Integration**: Fast, typo-tolerant search
- **Advanced Filters**: Filter by category, grade level, tags
- **Search Analytics**: Track popular searches
- **Auto-complete**: Smart search suggestions

### 📧 Email System
- **AWS SES**: Reliable email delivery
- **Welcome Emails**: Onboarding new users
- **Purchase Confirmations**: Order receipts and download links
- **Newsletter**: Regular updates and tips
- **Transactional Emails**: Password resets, notifications

### 📊 Analytics & Monitoring
- **Google Analytics 4**: Track user behavior
- **PostHog**: Advanced analytics and feature flags
- **Performance Monitoring**: Track Core Web Vitals
- **Error Tracking**: Monitor and fix issues
- **Business Metrics**: Revenue and conversion tracking

## 🏗️ Architecture

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Shadcn/ui**: Beautiful, accessible components
- **Responsive Design**: Mobile-first approach

### Backend
- **AWS Amplify**: Hosting and CI/CD
- **AWS Cognito**: User authentication
- **DynamoDB**: NoSQL database
- **AWS SES**: Email service
- **Stripe**: Payment processing
- **Meilisearch**: Search engine

### Infrastructure
- **Serverless**: Auto-scaling architecture
- **CDN**: Global content delivery
- **SSL/TLS**: Secure connections
- **Backup**: Automated data protection
- **Monitoring**: Real-time health checks

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- AWS CLI configured
- Git

### 1. Clone and Install
```bash
git clone https://github.com/hughesrm101/not-your-average-school-counselor.git
cd not-your-average-school-counselor
npm install
```

### 2. Run Complete Setup
```bash
./scripts/complete-setup.sh
```

This will:
- Set up AWS infrastructure (Cognito, DynamoDB, SES)
- Configure Stripe payments
- Set up Meilisearch search
- Seed initial data
- Build and deploy the application

### 3. Manual Setup (Alternative)

#### AWS Setup
```bash
node scripts/setup-aws-complete.js
```

#### Stripe Setup
```bash
node scripts/setup-stripe.js
```

#### Search Setup
```bash
node scripts/setup-meilisearch.js
```

#### Seed Data
```bash
node scripts/seed-data.js
```

## 🔧 Configuration

### Environment Variables
Create `.env.production` with:

```env
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# Cognito
COGNITO_USER_POOL_ID=your-user-pool-id
COGNITO_CLIENT_ID=your-client-id
COGNITO_IDENTITY_POOL_ID=your-identity-pool-id

# DynamoDB
DYNAMODB_TABLE_NAME=nyasc-counselor-main

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret

# Meilisearch
MEILISEARCH_HOST=https://your-project.meilisearch.io
MEILISEARCH_API_KEY=your-api-key

# App
NEXT_PUBLIC_APP_URL=https://nyasc.co
NEXTAUTH_SECRET=your-secret
```

### AWS Amplify Configuration
1. Connect your GitHub repository
2. Set environment variables in Amplify console
3. Configure custom domain (optional)
4. Enable auto-deployments

## 📱 Pages & Features

### Public Pages
- **Homepage** (`/`): Hero, features, testimonials
- **Shop** (`/shop`): Product catalog with filters
- **Blog** (`/blog`): Article listing and search
- **Login** (`/auth/login`): User authentication
- **Register** (`/auth/register`): New user signup

### API Endpoints
- **Products** (`/api/products`): Get product catalog
- **Blog** (`/api/blog`): Get blog posts
- **Checkout** (`/api/checkout/create-session`): Create Stripe session
- **Webhooks** (`/api/stripe/webhook`): Handle Stripe events

### Admin Features
- **Dashboard**: Analytics and overview
- **Product Management**: Add/edit products
- **Order Management**: View and fulfill orders
- **User Management**: Manage user accounts
- **Content Management**: Blog post editor

## 💰 Pricing & Costs

### Monthly Estimates
- **AWS Amplify**: $1-5 (traffic dependent)
- **DynamoDB**: $1-10 (usage based)
- **Cognito**: $0.0055 per MAU
- **SES**: $0.10 per 1000 emails
- **Meilisearch**: $0-25 (free tier available)
- **Stripe**: 2.9% + $0.30 per transaction

### Total: ~$10-50/month for typical usage

## 🔒 Security Features

- **HTTPS Everywhere**: SSL/TLS encryption
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Prevent injection attacks
- **Rate Limiting**: DDoS protection
- **Secure Headers**: XSS and CSRF protection
- **Payment Security**: PCI-compliant Stripe integration

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for Google ranking
- **CDN**: Global content delivery
- **Image Optimization**: WebP/AVIF formats
- **Code Splitting**: Faster page loads
- **Caching**: Aggressive caching strategy

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## 📦 Deployment

### Automatic (Recommended)
- Push to `main` branch
- AWS Amplify auto-deploys
- Environment variables set in console

### Manual
```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check this README
- **Issues**: GitHub Issues
- **Email**: hello@nyasc.co
- **Community**: Join our Discord

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Basic e-commerce functionality
- ✅ User authentication
- ✅ Blog system
- ✅ Payment processing

### Phase 2 (Next)
- 🔄 Advanced search filters
- 🔄 Mobile app
- 🔄 Video content
- 🔄 Community features

### Phase 3 (Future)
- 🔄 AI-powered recommendations
- 🔄 Advanced analytics
- 🔄 Multi-language support
- 🔄 White-label solutions

---

**Built with ❤️ for school counselors worldwide**

*Not Your Average School Counselor - Professional resources for the modern counselor*# Deployment test Tue Oct  7 16:24:25 EDT 2025
