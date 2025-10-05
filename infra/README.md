# NYASC Infrastructure

AWS CDK infrastructure for the Not Your Average School Counselor platform.

## Prerequisites

- AWS CLI configured with appropriate permissions
- Node.js 18+ and npm
- AWS CDK CLI installed (`npm install -g aws-cdk`)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Bootstrap CDK (if not already done):
```bash
cdk bootstrap
```

3. Deploy the infrastructure:
```bash
npm run deploy
```

## Configuration

Before deploying, update the following in `lib/infra-stack.ts`:

- `domainName`: Your actual domain name
- `hostedZoneId`: Your Route 53 hosted zone ID
- Replace placeholder values in secrets

## Services Deployed

- **Cognito**: User authentication with MFA for admins
- **DynamoDB**: Single-table design for all data
- **S3**: Private bucket for products, public bucket for assets
- **CloudFront**: CDN for static assets
- **SES**: Email service for transactional and marketing emails
- **SQS**: Queues for email processing and search indexing
- **EventBridge**: Scheduled tasks for sitemap and abandoned carts
- **EC2**: Meilisearch instance for site-wide search
- **Route 53**: DNS management
- **ACM**: SSL certificates
- **Secrets Manager**: Secure storage for API keys

## Outputs

After deployment, the stack outputs all necessary configuration values for the Next.js application. These should be added to your `.env.local` file.

## Cost Optimization

- DynamoDB uses pay-per-request billing
- S3 lifecycle policies for cost optimization
- CloudFront price class 100 for global distribution
- EC2 t3.small for Meilisearch (can be stopped when not needed)

## Security

- All S3 buckets are private by default
- Cognito groups for RBAC
- IAM roles with least privilege
- Secrets stored in AWS Secrets Manager
- VPC for Meilisearch instance

## Monitoring

- CloudWatch logs for all services
- SQS dead letter queues for error handling
- Point-in-time recovery for DynamoDB
