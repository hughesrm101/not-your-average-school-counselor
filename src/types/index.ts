// Core entity types for the NYASC platform

export interface User {
  PK: string; // USER#<userId>
  SK: string; // PROFILE | SETTINGS
  GSI1PK?: string; // email
  GSI1SK?: string; // USER
  GSI4PK?: string; // referralCode
  GSI4SK?: string; // USER
  userId: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  mfaEnabled: boolean;
  createdAt: string;
  lastLoginAt?: string;
  preferences?: UserPreferences;
  referralCode: string;
  referredBy?: string;
}

export interface UserPreferences {
  topics: string[];
  frequency: 'weekly' | 'monthly';
  notifications: {
    email: boolean;
    marketing: boolean;
    updates: boolean;
  };
}

export type UserRole = 'superadmin' | 'admin' | 'user';

export interface Product {
  PK: string; // PRODUCT#<productId>
  SK: string; // META
  productId: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  files: ProductFile[];
  cover: string;
  categories: string[];
  grades: string[];
  status: 'draft' | 'active';
  isBundle: boolean;
  seo: SEOData;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  tags?: string[];
}

export interface ProductFile {
  s3Key: string;
  name: string;
  size: number;
  type: string;
  url?: string; // Pre-signed URL
}

export interface Bundle extends Product {
  isBundle: true;
  bundleItems: BundleItem[];
  bundlePrice: number;
  crossSell?: string[];
}

export interface BundleItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  PK: string; // ORDER#<orderId>
  SK: string; // META
  GSI2PK?: string; // userId
  GSI2SK?: string; // ORDER
  GSI3PK?: string; // createdAt
  GSI3SK?: string; // ORDER
  orderId: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  stripeSessionId: string;
  status: 'paid' | 'failed' | 'pending';
  createdAt: string;
  ip?: string;
  referralAttribution?: ReferralAttribution;
  appliedCredits: number;
  couponCode?: string;
  customerEmail: string;
  customerName: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  isBundle: boolean;
}

export interface ReferralAttribution {
  referrerUserId: string;
  code: string;
}

export interface Download {
  PK: string; // ORDER#<orderId>
  SK: string; // DOWNLOAD#<productId>
  orderId: string;
  productId: string;
  s3Key: string;
  expiresAt: string;
  downloadCount: number;
  maxDownloads: number;
  fileName: string;
  fileSize: number;
}

export interface Coupon {
  PK: string; // COUPON#<code>
  SK: string; // META
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  appliesTo: {
    type: 'all' | 'products' | 'bundles';
    items?: string[];
  };
  startAt: string;
  endAt: string;
  maxRedemptions?: number;
  perUserLimit?: number;
  usedCount: number;
  createdAt: string;
  createdBy: string;
}

export interface StoreCredit {
  PK: string; // USER#<userId>
  SK: string; // CREDIT#<creditId>
  GSI2PK?: string; // userId
  GSI2SK?: string; // CREDIT
  userId: string;
  creditId: string;
  amount: number; // Can be negative for deductions
  reason: 'referral' | 'promo' | 'adjustment' | 'purchase';
  createdAt: string;
  orderId?: string;
  description: string;
}

export interface Referral {
  PK: string; // REFERRAL#<code>
  SK: string; // META
  code: string;
  ownerUserId: string;
  clicks: number;
  signups: number;
  firstPurchases: number;
  rewardPerReferral: number;
  pendingRewards: PendingReward[];
  totalAwarded: number;
  createdAt: string;
}

export interface PendingReward {
  userId: string;
  amount: number;
  orderId: string;
  createdAt: string;
}

export interface BlogPost {
  PK: string; // POST#<postId>
  SK: string; // META
  postId: string;
  title: string;
  slug: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduledAt?: string;
  publishedAt?: string;
  authorId: string;
  authorName: string;
  categories: string[];
  tags: string[];
  grades: string[];
  excerpt: string;
  contentMDX?: string;
  contentS3Key?: string;
  cover: string;
  seo: SEOData;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  readingTime?: number;
}

export interface Comment {
  PK: string; // POST#<postId>
  SK: string; // COMMENT#<commentId>
  postId: string;
  commentId: string;
  userId: string;
  userName: string;
  userEmail: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  ip?: string;
  spamScore?: number;
  parentId?: string;
  replies?: Comment[];
}

export interface EmailEvent {
  PK: string; // EMAIL#<messageId>
  SK: string; // EVENT#<timestamp>
  messageId: string;
  userId: string;
  type: 'send' | 'open' | 'click' | 'bounce' | 'complaint';
  campaignId?: string;
  meta: Record<string, any>;
  timestamp: string;
}

export interface EmailCampaign {
  campaignId: string;
  name: string;
  subject: string;
  content: string;
  contentType: 'html' | 'text';
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
  scheduledAt?: string;
  sentAt?: string;
  recipientCount: number;
  openCount: number;
  clickCount: number;
  bounceCount: number;
  segment: {
    type: 'all' | 'new_subscribers' | 'purchasers' | 'lapsed' | 'topics';
    criteria?: Record<string, any>;
  };
  createdAt: string;
  createdBy: string;
}

export interface SearchIndexQueue {
  PK: string; // INDEX#<entityType>
  SK: string; // <entityId>#<timestamp>
  entityType: 'blog_post' | 'product' | 'bundle';
  entityId: string;
  operation: 'upsert' | 'delete';
  payload: any;
  processed: boolean;
  timestamp: string;
}

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
}

export interface AdminAudit {
  auditId: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId: string;
  changes?: Record<string, any>;
  ip?: string;
  userAgent?: string;
  timestamp: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Form types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterForm {
  email: string;
  topics?: string[];
  frequency?: 'weekly' | 'monthly';
}

export interface CheckoutForm {
  items: CheckoutItem[];
  couponCode?: string;
  useStoreCredit?: boolean;
}

export interface CheckoutItem {
  productId: string;
  quantity: number;
  isBundle?: boolean;
}

// Search types
export interface SearchFilters {
  type?: 'all' | 'blog' | 'products' | 'bundles';
  categories?: string[];
  grades?: string[];
  tags?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  sortBy?: 'relevance' | 'newest' | 'oldest' | 'price_low' | 'price_high';
}

export interface SearchResult {
  id: string;
  type: 'blog_post' | 'product' | 'bundle';
  title: string;
  description: string;
  url: string;
  image?: string;
  price?: number;
  categories?: string[];
  grades?: string[];
  tags?: string[];
  publishedAt?: string;
  createdAt?: string;
}

// Analytics types
export interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  userId?: string;
  sessionId?: string;
  timestamp: string;
}

export interface PageView {
  url: string;
  title: string;
  referrer?: string;
  userId?: string;
  sessionId?: string;
  timestamp: string;
}

// Configuration types
export interface AppConfig {
  site: {
    name: string;
    description: string;
    url: string;
    logo: string;
    favicon: string;
  };
  features: {
    comments: boolean;
    referrals: boolean;
    mfa: boolean;
    analytics: boolean;
  };
  limits: {
    maxDownloadsPerProduct: number;
    downloadExpiryHours: number;
    maxFileSize: number;
    maxProductsPerOrder: number;
  };
  email: {
    fromName: string;
    fromEmail: string;
    replyTo: string;
  };
  payments: {
    currency: string;
    taxEnabled: boolean;
    refundPolicy: string;
  };
  referral: {
    rewardAmount: number;
    rewardType: 'fixed' | 'percent';
    minOrderAmount: number;
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  statusCode: number;
}

// Utility types
export type EntityType = 'user' | 'product' | 'bundle' | 'order' | 'download' | 'coupon' | 'store_credit' | 'referral' | 'blog_post' | 'comment' | 'email_event' | 'email_campaign' | 'search_index_queue' | 'admin_audit';

export type SortOrder = 'asc' | 'desc';

export type Status = 'active' | 'inactive' | 'draft' | 'published' | 'scheduled' | 'pending' | 'approved' | 'rejected' | 'paid' | 'failed';

export type FileType = 'pdf' | 'ppt' | 'pptx' | 'doc' | 'docx' | 'zip' | 'image' | 'video' | 'audio';

// Constants
export const USER_ROLES = ['superadmin', 'admin', 'user'] as const;
export const PRODUCT_STATUSES = ['draft', 'active'] as const;
export const ORDER_STATUSES = ['paid', 'failed', 'pending'] as const;
export const COMMENT_STATUSES = ['pending', 'approved', 'rejected'] as const;
export const BLOG_STATUSES = ['draft', 'scheduled', 'published'] as const;
export const COUPON_TYPES = ['percent', 'fixed'] as const;
export const CREDIT_REASONS = ['referral', 'promo', 'adjustment', 'purchase'] as const;
export const EMAIL_EVENT_TYPES = ['send', 'open', 'click', 'bounce', 'complaint'] as const;
export const CAMPAIGN_STATUSES = ['draft', 'scheduled', 'sending', 'sent', 'failed'] as const;
