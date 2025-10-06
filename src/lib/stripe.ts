import Stripe from 'stripe';
import { CheckoutItem, Order, Product, Bundle } from '@/types';
import { db, generateId } from '@/lib/db/dynamo';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export { stripe };

// Create Stripe checkout session
export async function createCheckoutSession({
  items,
  customerEmail,
  customerName,
  couponCode,
  useStoreCredit = false,
  storeCreditAmount = 0,
  referralCode,
  successUrl,
  cancelUrl,
}: {
  items: CheckoutItem[];
  customerEmail: string;
  customerName: string;
  couponCode?: string;
  useStoreCredit?: boolean;
  storeCreditAmount?: number;
  referralCode?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  try {
    // Get products and bundles from database
    const { db } = await import('@/lib/db/dynamo');
    const productIds = items.map(item => item.productId);
    const products = await db.batchGetItems(
      productIds.map(id => ({ PK: `PRODUCT#${id}`, SK: 'META' }))
    );

    // Create line items for Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let subtotal = 0;

    for (const item of items) {
      const product = products.find(p => p.productId === item.productId) as Product | Bundle;
      if (!product) continue;

      if (product.isBundle) {
        const bundle = product as Bundle;
        // For bundles, create a single line item with bundle price
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: bundle.title,
              description: bundle.description,
              images: bundle.cover ? [bundle.cover] : [],
            },
            unit_amount: Math.round(bundle.bundlePrice * 100), // Convert to cents
          },
          quantity: item.quantity,
        });
        subtotal += bundle.bundlePrice * item.quantity;
      } else {
        // For individual products
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
              description: product.description,
              images: product.cover ? [product.cover] : [],
            },
            unit_amount: Math.round(product.price * 100), // Convert to cents
          },
          quantity: item.quantity,
        });
        subtotal += product.price * item.quantity;
      }
    }

    // Apply store credit if requested
    if (useStoreCredit && storeCreditAmount > 0) {
      const creditAmount = Math.min(storeCreditAmount, subtotal);
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Store Credit Applied',
            description: 'Store credit discount',
          },
          unit_amount: -Math.round(creditAmount * 100), // Negative amount for discount
        },
        quantity: 1,
      });
      subtotal -= creditAmount;
    }

    // Create checkout session
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      metadata: {
        customerName,
        couponCode: couponCode || '',
        useStoreCredit: useStoreCredit.toString(),
        storeCreditAmount: storeCreditAmount.toString(),
        referralCode: referralCode || '',
        itemCount: items.length.toString(),
      },
      // Enable tax calculation
      automatic_tax: {
        enabled: true,
      },
      // Collect shipping address for tax calculation
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI'],
      },
      // Enable Apple Pay and Google Pay
      payment_method_options: {
        card: {
          request_three_d_secure: 'automatic',
        },
      },
      // Set up webhook events
      payment_intent_data: {
        metadata: {
          customerEmail,
          customerName,
          couponCode: couponCode || '',
          referralCode: referralCode || '',
        },
      },
    };

    // Add coupon if provided
    if (couponCode) {
      sessionParams.discounts = [{
        coupon: couponCode,
      }];
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return {
      sessionId: session.id,
      url: session.url,
      amount: subtotal,
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

// Verify webhook signature
export function verifyWebhookSignature(payload: string, signature: string): Stripe.Event {
  try {
    return stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    throw new Error('Invalid webhook signature');
  }
}

// Handle successful payment
export async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  try {
    const { db, generateId } = await import('@/lib/db/dynamo');
    const { sendReceiptEmail } = await import('@/lib/ses');

    // Extract metadata
    const customerEmail = session.customer_email || session.metadata?.customerEmail || '';
    const customerName = session.metadata?.customerName || '';
    const couponCode = session.metadata?.couponCode || '';
    const referralCode = session.metadata?.referralCode || '';
    const useStoreCredit = session.metadata?.useStoreCredit === 'true';
    const storeCreditAmount = parseFloat(session.metadata?.storeCreditAmount || '0');

    // Get line items
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    
    // Parse items from line items
    const items = lineItems.data
      .filter(item => (item as any).price_data?.product_data?.name !== 'Store Credit Applied')
      .map(item => ({
        productId: (item as any).price_data?.product_data?.metadata?.productId || '',
        title: (item as any).price_data?.product_data?.name || '',
        price: ((item as any).price_data?.unit_amount || 0) / 100,
        quantity: item.quantity || 1,
        isBundle: (item as any).price_data?.product_data?.metadata?.isBundle === 'true',
      }));

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = session.total_details?.amount_tax || 0;
    const total = session.amount_total || 0;

    // Create order
    const orderId = generateId('order');
    const order: Order = {
      PK: `ORDER#${orderId}`,
      SK: 'META',
      GSI2PK: session.customer_email || '',
      GSI2SK: `ORDER#${orderId}`,
      GSI3PK: new Date().toISOString().split('T')[0],
      GSI3SK: `ORDER#${orderId}`,
      orderId,
      userId: '', // Will be set when user is identified
      items,
      subtotal: subtotal / 100,
      tax: tax / 100,
      total: total / 100,
      currency: session.currency || 'usd',
      stripeSessionId: session.id,
      status: 'paid',
      createdAt: new Date().toISOString(),
      ip: session.metadata?.ip,
      referralAttribution: referralCode ? {
        referrerUserId: '', // Will be set when referrer is identified
        code: referralCode,
      } : undefined,
      appliedCredits: useStoreCredit ? storeCreditAmount : 0,
      couponCode: couponCode || undefined,
      customerEmail,
      customerName,
    };

    // Save order to database
    await db.putItem(order);

    // Create download entries for each product
    for (const item of items) {
      const product = await db.getItem(`PRODUCT#${item.productId}`, 'META') as Product | Bundle;
      if (product && product.files) {
        for (const file of product.files) {
          const downloadId = generateId('download');
          const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
          
          await db.putItem({
            PK: `ORDER#${orderId}`,
            SK: `DOWNLOAD#${item.productId}#${file.s3Key}`,
            orderId,
            productId: item.productId,
            s3Key: file.s3Key,
            expiresAt: expiresAt.toISOString(),
            downloadCount: 0,
            maxDownloads: 5,
            fileName: file.name,
            fileSize: file.size,
          });
        }
      }
    }

    // Handle referral attribution if applicable
    if (referralCode) {
      await handleReferralAttribution(referralCode, orderId, customerEmail);
    }

    // Handle store credit usage
    if (useStoreCredit && storeCreditAmount > 0) {
      await handleStoreCreditUsage(customerEmail, storeCreditAmount, orderId);
    }

    // Send receipt email
    await sendReceiptEmail({
      to: customerEmail,
      name: customerName,
      order,
      downloadLinks: [], // Will be populated with actual download links
    });

    return order;
  } catch (error) {
    console.error('Error handling successful payment:', error);
    throw error;
  }
}

// Handle referral attribution
async function handleReferralAttribution(referralCode: string, orderId: string, customerEmail: string) {
  try {
    const { db, generateId } = await import('@/lib/db/dynamo');
    
    // Find referrer by referral code
    const referrers = await db.queryItems('USER', 'GSI4PK = :code', { ':code': referralCode }, 'GSI4');
    if (referrers.length === 0) return;

    const referrer = referrers[0];
    
    // Check if this is the customer's first purchase
    const existingOrders = await db.queryItems('ORDER', 'GSI2PK = :email', { ':email': customerEmail }, 'GSI2');
    if (existingOrders.length > 1) return; // Not first purchase

    // Get referral configuration
    const referralReward = 10; // $10 reward per referral
    const referral = await db.getItem(`REFERRAL#${referralCode}`, 'META');
    
    if (referral) {
      // Update referral stats
      await db.updateItem(`REFERRAL#${referralCode}`, 'META', {
        firstPurchases: (referral.firstPurchases || 0) + 1,
        pendingRewards: [
          ...(referral.pendingRewards || []),
          {
            userId: referrer.userId,
            amount: referralReward,
            orderId,
            createdAt: new Date().toISOString(),
          },
        ],
      });

      // Add store credit to referrer
      const creditId = generateId('credit');
      await db.putItem({
        PK: `USER#${referrer.userId}`,
        SK: `CREDIT#${creditId}`,
        GSI2PK: referrer.userId,
        GSI2SK: `CREDIT#${creditId}`,
        userId: referrer.userId,
        creditId,
        amount: referralReward,
        reason: 'referral',
        createdAt: new Date().toISOString(),
        orderId,
        description: `Referral reward for ${customerEmail}`,
      });
    }
  } catch (error) {
    console.error('Error handling referral attribution:', error);
  }
}

// Handle store credit usage
async function handleStoreCreditUsage(customerEmail: string, amount: number, orderId: string) {
  try {
    const { db } = await import('@/lib/db/dynamo');
    
    // Find user by email
    const users = await db.queryItems('USER', 'GSI1PK = :email', { ':email': customerEmail }, 'GSI1');
    if (users.length === 0) return;

    const user = users[0];
    
    // Create negative credit entry
    const creditId = generateId('credit');
    await db.putItem({
      PK: `USER#${user.userId}`,
      SK: `CREDIT#${creditId}`,
      GSI2PK: user.userId,
      GSI2SK: `CREDIT#${creditId}`,
      userId: user.userId,
      creditId,
      amount: -amount,
      reason: 'purchase',
      createdAt: new Date().toISOString(),
      orderId,
      description: `Store credit used for order ${orderId}`,
    });
  } catch (error) {
    console.error('Error handling store credit usage:', error);
  }
}

// Create coupon
export async function createCoupon({
  code,
  type,
  value,
  appliesTo,
  startAt,
  endAt,
  maxRedemptions,
  perUserLimit,
}: {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  appliesTo: { type: 'all' | 'products' | 'bundles'; items?: string[] };
  startAt: string;
  endAt: string;
  maxRedemptions?: number;
  perUserLimit?: number;
}) {
  try {
    // Create Stripe coupon
    const stripeCoupon = await stripe.coupons.create({
      id: code,
      percent_off: type === 'percent' ? value : undefined,
      amount_off: type === 'fixed' ? Math.round(value * 100) : undefined,
      currency: 'usd',
      duration: 'once',
      max_redemptions: maxRedemptions,
      redeem_by: Math.floor(new Date(endAt).getTime() / 1000),
    });

    // Save to database
    const { db } = await import('@/lib/db/dynamo');
    const coupon = {
      PK: `COUPON#${code}`,
      SK: 'META',
      code,
      type,
      value,
      appliesTo,
      startAt,
      endAt,
      maxRedemptions,
      perUserLimit,
      usedCount: 0,
      createdAt: new Date().toISOString(),
      createdBy: 'system', // Will be set to actual user ID
    };

    await db.putItem(coupon);

    return coupon;
  } catch (error) {
    console.error('Error creating coupon:', error);
    throw error;
  }
}

// Validate coupon
export async function validateCoupon(code: string, items: CheckoutItem[]): Promise<{
  valid: boolean;
  discount: number;
  error?: string;
}> {
  try {
    const { db } = await import('@/lib/db/dynamo');
    
    // Get coupon from database
    const coupon = await db.getItem(`COUPON#${code}`, 'META');
    if (!coupon) {
      return { valid: false, discount: 0, error: 'Coupon not found' };
    }

    // Check if coupon is active
    const now = new Date();
    const startAt = new Date(coupon.startAt);
    const endAt = new Date(coupon.endAt);

    if (now < startAt || now > endAt) {
      return { valid: false, discount: 0, error: 'Coupon is not active' };
    }

    // Check redemption limits
    if (coupon.maxRedemptions && coupon.usedCount >= coupon.maxRedemptions) {
      return { valid: false, discount: 0, error: 'Coupon has reached maximum redemptions' };
    }

    // Calculate discount
    let discount = 0;
    const applicableItems = items.filter(item => {
      if (coupon.appliesTo.type === 'all') return true;
      if (coupon.appliesTo.type === 'products' && !item.isBundle) return true;
      if (coupon.appliesTo.type === 'bundles' && item.isBundle) return true;
      if (coupon.appliesTo.items?.includes(item.productId)) return true;
      return false;
    });

    if (applicableItems.length === 0) {
      return { valid: false, discount: 0, error: 'Coupon does not apply to selected items' };
    }

    // Calculate total for applicable items
    const total = applicableItems.reduce((sum, item) => {
      // This would need to fetch actual product prices
      return sum + (item.quantity * 0); // Placeholder
    }, 0);

    if (coupon.type === 'percent') {
      discount = total * (coupon.value / 100);
    } else {
      discount = Math.min(coupon.value, total);
    }

    return { valid: true, discount };
  } catch (error) {
    console.error('Error validating coupon:', error);
    return { valid: false, discount: 0, error: 'Error validating coupon' };
  }
}

// Get customer's store credit balance
export async function getStoreCreditBalance(userId: string): Promise<number> {
  try {
    const { db } = await import('@/lib/db/dynamo');
    
    const credits = await db.queryItems('USER', 'GSI2PK = :userId AND begins_with(SK, :credit)', {
      ':userId': userId,
      ':credit': 'CREDIT#',
    }, 'GSI2');

    return credits.reduce((balance, credit) => balance + credit.amount, 0);
  } catch (error) {
    console.error('Error getting store credit balance:', error);
    return 0;
  }
}
