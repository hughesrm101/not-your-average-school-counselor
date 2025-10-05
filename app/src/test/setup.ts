import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  usePathname: () => '/',
}))

// Mock AWS SDK
vi.mock('@aws-sdk/client-cognito-identity-provider', () => ({
  CognitoIdentityProviderClient: vi.fn(),
  InitiateAuthCommand: vi.fn(),
  RespondToAuthChallengeCommand: vi.fn(),
  GetUserCommand: vi.fn(),
  SignUpCommand: vi.fn(),
  ConfirmSignUpCommand: vi.fn(),
  ForgotPasswordCommand: vi.fn(),
  ConfirmForgotPasswordCommand: vi.fn(),
  GlobalSignOutCommand: vi.fn(),
}))

vi.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: vi.fn(),
  PutItemCommand: vi.fn(),
  GetItemCommand: vi.fn(),
  QueryCommand: vi.fn(),
  ScanCommand: vi.fn(),
  UpdateItemCommand: vi.fn(),
  DeleteItemCommand: vi.fn(),
}))

vi.mock('@aws-sdk/client-s3', () => ({
  S3Client: vi.fn(),
  GetObjectCommand: vi.fn(),
  PutObjectCommand: vi.fn(),
  DeleteObjectCommand: vi.fn(),
  GetSignedUrlCommand: vi.fn(),
}))

vi.mock('@aws-sdk/client-ses', () => ({
  SESClient: vi.fn(),
  SendEmailCommand: vi.fn(),
  SendTemplatedEmailCommand: vi.fn(),
}))

// Mock Stripe
vi.mock('stripe', () => ({
  default: vi.fn(() => ({
    checkout: {
      sessions: {
        create: vi.fn(),
        retrieve: vi.fn(),
      },
    },
    webhooks: {
      constructEvent: vi.fn(),
    },
    coupons: {
      create: vi.fn(),
      retrieve: vi.fn(),
    },
  })),
}))

// Mock environment variables
process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID = 'us-east-1_test'
process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID = 'test-client-id'
process.env.STRIPE_SECRET_KEY = 'sk_test_123'
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_123'
process.env.AWS_REGION = 'us-east-1'
process.env.DYNAMODB_TABLE_NAME = 'nyasc-test'
process.env.S3_BUCKET_NAME = 'nyasc-test'
process.env.SES_FROM_EMAIL = 'test@nyasc.com'
process.env.MEILISEARCH_URL = 'http://localhost:7700'
process.env.MEILISEARCH_API_KEY = 'test-key'
