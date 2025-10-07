// Analytics utilities for GA4 and PostHog

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    posthog: any;
  }
}

// Google Analytics 4
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackPurchase = (transactionId: string, value: number, currency: string = 'USD', items: any[] = []) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items,
    });
  }
};

export const trackAddToCart = (itemId: string, itemName: string, category: string, price: number, quantity: number = 1) => {
  trackEvent('add_to_cart', {
    currency: 'USD',
    value: price * quantity,
    items: [{
      item_id: itemId,
      item_name: itemName,
      category: category,
      price: price,
      quantity: quantity,
    }],
  });
};

export const trackViewItem = (itemId: string, itemName: string, category: string, price: number) => {
  trackEvent('view_item', {
    currency: 'USD',
    value: price,
    items: [{
      item_id: itemId,
      item_name: itemName,
      category: category,
      price: price,
    }],
  });
};

export const trackBeginCheckout = (value: number, currency: string = 'USD', items: any[]) => {
  trackEvent('begin_checkout', {
    currency,
    value,
    items,
  });
};

// PostHog Analytics
export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.identify(userId, properties);
  }
};

export const trackUserEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture(eventName, properties);
  }
};

export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.people.set(properties);
  }
};

// Page view tracking
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA4_ID, {
      page_title: title,
      page_location: url,
    });
  }
};

// Newsletter signup tracking
export const trackNewsletterSignup = (source: string) => {
  trackEvent('newsletter_signup', {
    source: source,
  });
  
  trackUserEvent('Newsletter Signup', {
    source: source,
  });
};

// Product view tracking
export const trackProductView = (productId: string, productName: string, category: string, price: number) => {
  trackViewItem(productId, productName, category, price);
  trackUserEvent('Product Viewed', {
    product_id: productId,
    product_name: productName,
    category: category,
    price: price,
  });
};

// Cart tracking
export const trackAddToCartEvent = (productId: string, productName: string, category: string, price: number, quantity: number = 1) => {
  trackAddToCart(productId, productName, category, price, quantity);
  trackUserEvent('Product Added to Cart', {
    product_id: productId,
    product_name: productName,
    category: category,
    price: price,
    quantity: quantity,
  });
};

// Checkout tracking
export const trackCheckoutStarted = (cartValue: number, itemCount: number) => {
  trackBeginCheckout(cartValue, 'USD', []);
  trackUserEvent('Checkout Started', {
    cart_value: cartValue,
    item_count: itemCount,
  });
};

// Purchase tracking
export const trackPurchaseComplete = (orderId: string, total: number, items: any[]) => {
  trackPurchase(orderId, total, 'USD', items);
  trackUserEvent('Purchase Completed', {
    order_id: orderId,
    total: total,
    item_count: items.length,
  });
};
