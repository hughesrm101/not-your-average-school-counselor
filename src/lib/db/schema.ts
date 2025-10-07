import { z } from 'zod';

// User Schema
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['admin', 'customer']),
  createdAt: z.string(),
  updatedAt: z.string(),
  stripeCustomerId: z.string().optional(),
});

// Product Schema
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.enum(['digital', 'physical']),
  type: z.enum(['resource', 'merchandise']),
  status: z.enum(['active', 'inactive', 'draft']),
  images: z.array(z.string()),
  tags: z.array(z.string()),
  slug: z.string().optional(),
  inventory: z.number().optional(),
  printifyProductId: z.string().optional(),
  downloadUrl: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Order Schema
export const OrderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number(),
    price: z.number(),
    name: z.string(),
  })),
  total: z.number(),
  status: z.enum(['pending', 'paid', 'shipped', 'delivered', 'cancelled']),
  paymentIntentId: z.string().optional(),
  shippingAddress: z.object({
    name: z.string(),
    address1: z.string(),
    address2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    country: z.string(),
  }).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Blog Post Schema
export const BlogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string(),
  author: z.string(),
  published: z.boolean(),
  featuredImage: z.string().optional(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().optional(),
});

// Cart Item Schema
export const CartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  price: z.number(),
  name: z.string(),
  image: z.string().optional(),
});

// Newsletter Subscriber Schema
export const NewsletterSubscriberSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  status: z.enum(['subscribed', 'unsubscribed', 'pending']),
  source: z.string().optional(), // Where they subscribed from
  tags: z.array(z.string()).optional(),
  subscribedAt: z.string(),
  unsubscribedAt: z.string().optional(),
  lastEmailSent: z.string().optional(),
});

// Email Campaign Schema
export const EmailCampaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  subject: z.string(),
  content: z.string(),
  status: z.enum(['draft', 'scheduled', 'sending', 'sent', 'failed']),
  recipientCount: z.number(),
  sentCount: z.number(),
  openCount: z.number(),
  clickCount: z.number(),
  scheduledAt: z.string().optional(),
  sentAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type BlogPost = z.infer<typeof BlogPostSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type NewsletterSubscriber = z.infer<typeof NewsletterSubscriberSchema>;
export type EmailCampaign = z.infer<typeof EmailCampaignSchema>;
