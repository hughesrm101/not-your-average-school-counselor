import { AnalyticsEvent, PageView } from '@/types';

// Google Analytics 4
export const GA4_ID = process.env.GA4_ID;

// PostHog
export const POSTHOG_KEY = process.env.POSTHOG_KEY;
export const POSTHOG_HOST = process.env.POSTHOG_HOST || 'https://app.posthog.com';

// Track page view
export function trackPageView(pageView: PageView) {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (GA4_ID && window.gtag) {
    window.gtag('config', GA4_ID, {
      page_title: pageView.title,
      page_location: pageView.url,
      custom_map: {
        custom_parameter_1: 'user_id',
      },
    });

    window.gtag('event', 'page_view', {
      page_title: pageView.title,
      page_location: pageView.url,
      page_referrer: pageView.referrer,
      user_id: pageView.userId,
      session_id: pageView.sessionId,
    });
  }

  // PostHog
  if (POSTHOG_KEY && window.posthog) {
    window.posthog.capture('$pageview', {
      $current_url: pageView.url,
      $title: pageView.title,
      $referrer: pageView.referrer,
      user_id: pageView.userId,
      session_id: pageView.sessionId,
    });
  }
}

// Track custom event
export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (GA4_ID && window.gtag) {
    window.gtag('event', event.event, {
      ...event.properties,
      user_id: event.userId,
      session_id: event.sessionId,
    });
  }

  // PostHog
  if (POSTHOG_KEY && window.posthog) {
    window.posthog.capture(event.event, {
      ...event.properties,
      user_id: event.userId,
      session_id: event.sessionId,
    });
  }
}

// E-commerce tracking
export function trackPurchase({
  transactionId,
  value,
  currency = 'USD',
  items,
  userId,
  sessionId,
}: {
  transactionId: string;
  value: number;
  currency?: string;
  items: Array<{
    item_id: string;
    item_name: string;
    category: string;
    quantity: number;
    price: number;
  }>;
  userId?: string;
  sessionId?: string;
}) {
  // Google Analytics 4
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items,
      user_id: userId,
      session_id: sessionId,
    });
  }

  // PostHog
  if (POSTHOG_KEY && window.posthog) {
    window.posthog.capture('purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items,
      user_id: userId,
      session_id: sessionId,
    });
  }
}

// Track add to cart
export function trackAddToCart({
  itemId,
  itemName,
  category,
  quantity,
  price,
  userId,
  sessionId,
}: {
  itemId: string;
  itemName: string;
  category: string;
  quantity: number;
  price: number;
  userId?: string;
  sessionId?: string;
}) {
  // Google Analytics 4
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'USD',
      value: price * quantity,
      items: [{
        item_id: itemId,
        item_name: itemName,
        category: category,
        quantity: quantity,
        price: price,
      }],
      user_id: userId,
      session_id: sessionId,
    });
  }

  // PostHog
  if (POSTHOG_KEY && window.posthog) {
    window.posthog.capture('add_to_cart', {
      item_id: itemId,
      item_name: itemName,
      category: category,
      quantity: quantity,
      price: price,
      value: price * quantity,
      user_id: userId,
      session_id: sessionId,
    });
  }
}

// Track begin checkout
export function trackBeginCheckout({
  value,
  currency = 'USD',
  items,
  userId,
  sessionId,
}: {
  value: number;
  currency?: string;
  items: Array<{
    item_id: string;
    item_name: string;
    category: string;
    quantity: number;
    price: number;
  }>;
  userId?: string;
  sessionId?: string;
}) {
  // Google Analytics 4
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: currency,
      value: value,
      items: items,
      user_id: userId,
      session_id: sessionId,
    });
  }

  // PostHog
  if (POSTHOG_KEY && window.posthog) {
    window.posthog.capture('begin_checkout', {
      value: value,
      currency: currency,
      items: items,
      user_id: userId,
      session_id: sessionId,
    });
  }
}

// Track search
export function trackSearch({
  searchTerm,
  resultsCount,
  userId,
  sessionId,
}: {
  searchTerm: string;
  resultsCount: number;
  userId?: string;
  sessionId?: string;
}) {
  // Google Analytics 4
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      results_count: resultsCount,
      user_id: userId,
      session_id: sessionId,
    });
  }

  // PostHog
  if (POSTHOG_KEY && window.posthog) {
    window.posthog.capture('search', {
      search_term: searchTerm,
      results_count: resultsCount,
      user_id: userId,
      session_id: sessionId,
    });
  }
}

// Track blog post view
export function trackBlogPostView({
  postId,
  postTitle,
  category,
  tags,
  userId,
  sessionId,
}: {
  postId: string;
  postTitle: string;
  category: string;
  tags: string[];
  userId?: string;
  sessionId?: string;
}) {
  // Google Analytics 4
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'USD',
      value: 0,
      items: [{
        item_id: postId,
        item_name: postTitle,
        category: category,
        item_category2: tags.join(', '),
      }],
      user_id: userId,
      session_id: sessionId,
    });
  }

  // PostHog
  if (POSTHOG_KEY && window.posthog) {
    window.posthog.capture('view_blog_post', {
      post_id: postId,
      post_title: postTitle,
      category: category,
      tags: tags,
      user_id: userId,
      session_id: sessionId,
    });
  }
}

// Track product view
export function trackProductView({
  productId,
  productName,
  category,
  price,
  userId,
  sessionId,
}: {
  productId: string;
  productName: string;
  category: string;
  price: number;
  userId?: string;
  sessionId?: string;
}) {
  // Google Analytics 4
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'USD',
      value: price,
      items: [{
        item_id: productId,
        item_name: productName,
        category: category,
        price: price,
      }],
      user_id: userId,
      session_id: sessionId,
    });
  }

  // PostHog
  if (POSTHOG_KEY && window.posthog) {
    window.posthog.capture('view_product', {
      product_id: productId,
      product_name: productName,
      category: category,
      price: price,
      user_id: userId,
      session_id: sessionId,
    });
  }
}

// Track download
export function trackDownload({
  productId,
  productName,
  fileName,
  fileSize,
  userId,
  sessionId,
}: {
  productId: string;
  productName: string;
  fileName: string;
  fileSize: number;
  userId?: string;
  sessionId?: string;
}) {
  // Google Analytics 4
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'file_download', {
      file_name: fileName,
      file_size: fileSize,
      product_id: productId,
      product_name: productName,
      user_id: userId,
      session_id: sessionId,
    });
  }

  // PostHog
  if (POSTHOG_KEY && window.posthog) {
    window.posthog.capture('download', {
      product_id: productId,
      product_name: productName,
      file_name: fileName,
      file_size: fileSize,
      user_id: userId,
      session_id: sessionId,
    });
  }
}

// Track referral share
export function trackReferralShare({
  referralCode,
  platform,
  userId,
  sessionId,
}: {
  referralCode: string;
  platform: string;
  userId?: string;
  sessionId?: string;
}) {
  // Google Analytics 4
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'share', {
      method: platform,
      content_type: 'referral',
      item_id: referralCode,
      user_id: userId,
      session_id: sessionId,
    });
  }

  // PostHog
  if (POSTHOG_KEY && window.posthog) {
    window.posthog.capture('referral_share', {
      referral_code: referralCode,
      platform: platform,
      user_id: userId,
      session_id: sessionId,
    });
  }
}

// Track referral conversion
export function trackReferralConversion({
  referralCode,
  referrerUserId,
  newUserId,
  orderValue,
  sessionId,
}: {
  referralCode: string;
  referrerUserId: string;
  newUserId: string;
  orderValue: number;
  sessionId?: string;
}) {
  // Google Analytics 4
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: GA4_ID,
      value: orderValue,
      currency: 'USD',
      referral_code: referralCode,
      referrer_user_id: referrerUserId,
      new_user_id: newUserId,
      session_id: sessionId,
    });
  }

  // PostHog
  if (POSTHOG_KEY && window.posthog) {
    window.posthog.capture('referral_convert', {
      referral_code: referralCode,
      referrer_user_id: referrerUserId,
      new_user_id: newUserId,
      order_value: orderValue,
      session_id: sessionId,
    });
  }
}

// Track email engagement
export function trackEmailEngagement({
  emailType,
  campaignId,
  userId,
  sessionId,
}: {
  emailType: 'open' | 'click' | 'bounce' | 'complaint';
  campaignId?: string;
  userId?: string;
  sessionId?: string;
}) {
  // Google Analytics 4
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'email_engagement', {
      email_type: emailType,
      campaign_id: campaignId,
      user_id: userId,
      session_id: sessionId,
    });
  }

  // PostHog
  if (POSTHOG_KEY && window.posthog) {
    window.posthog.capture('email_engagement', {
      email_type: emailType,
      campaign_id: campaignId,
      user_id: userId,
      session_id: sessionId,
    });
  }
}

// Track comment submission
export function trackCommentSubmission({
  postId,
  postTitle,
  userId,
  sessionId,
}: {
  postId: string;
  postTitle: string;
  userId?: string;
  sessionId?: string;
}) {
  // Google Analytics 4
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'comment_submit', {
      post_id: postId,
      post_title: postTitle,
      user_id: userId,
      session_id: sessionId,
    });
  }

  // PostHog
  if (POSTHOG_KEY && window.posthog) {
    window.posthog.capture('comment_submit', {
      post_id: postId,
      post_title: postTitle,
      user_id: userId,
      session_id: sessionId,
    });
  }
}

// Track newsletter subscription
export function trackNewsletterSubscription({
  email,
  topics,
  userId,
  sessionId,
}: {
  email: string;
  topics: string[];
  userId?: string;
  sessionId?: string;
}) {
  // Google Analytics 4
  if (GA4_ID && window.gtag) {
    window.gtag('event', 'newsletter_subscribe', {
      email: email,
      topics: topics.join(','),
      user_id: userId,
      session_id: sessionId,
    });
  }

  // PostHog
  if (POSTHOG_KEY && window.posthog) {
    window.posthog.capture('newsletter_subscribe', {
      email: email,
      topics: topics,
      user_id: userId,
      session_id: sessionId,
    });
  }
}

// Track admin action
export function trackAdminAction({
  action,
  resource,
  resourceId,
  userId,
  sessionId,
}: {
  action: string;
  resource: string;
  resourceId: string;
  userId?: string;
  sessionId?: string;
}) {
  // PostHog only (admin actions are sensitive)
  if (POSTHOG_KEY && window.posthog) {
    window.posthog.capture('admin_action', {
      action: action,
      resource: resource,
      resource_id: resourceId,
      user_id: userId,
      session_id: sessionId,
    });
  }
}

// Set user properties
export function setUserProperties({
  userId,
  properties,
}: {
  userId: string;
  properties: Record<string, any>;
}) {
  // Google Analytics 4
  if (GA4_ID && window.gtag) {
    window.gtag('config', GA4_ID, {
      user_id: userId,
      custom_map: properties,
    });
  }

  // PostHog
  if (POSTHOG_KEY && window.posthog) {
    window.posthog.identify(userId, properties);
  }
}

// Generate session ID
export function generateSessionId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Get or create session ID
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

// Initialize analytics
export function initializeAnalytics() {
  if (typeof window === 'undefined') return;

  // Initialize Google Analytics 4
  if (GA4_ID) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    const gtag = (...args: any[]) => {
      window.dataLayer.push(args);
    };
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA4_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  // Initialize PostHog
  if (POSTHOG_KEY) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `${POSTHOG_HOST}/static/array.js`;
    document.head.appendChild(script);

    window.posthog = window.posthog || [];
    window.posthog.push(['init', POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      loaded: (posthog: any) => {
        if (process.env.NODE_ENV === 'development') {
          posthog.debug();
        }
      },
    }]);
  }
}

// Declare global types
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    posthog: any;
  }
}
