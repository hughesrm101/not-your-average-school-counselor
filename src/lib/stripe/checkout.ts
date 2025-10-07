import { stripe } from './client';
import { DatabaseService } from '../db/dynamo';
import { CartItem } from '../db/schema';

export class StripeService {
  // Create a checkout session
  static async createCheckoutSession(
    items: CartItem[],
    userId: string,
    successUrl: string,
    cancelUrl: string
  ) {
    try {
      const lineItems = items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: `Quantity: ${item.quantity}`,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          userId,
        },
        customer_email: undefined, // Will be set by user during checkout
      });

      return session;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw new Error('Failed to create checkout session');
    }
  }

  // Handle successful payment
  static async handlePaymentSuccess(sessionId: string) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      
      if (session.payment_status === 'paid') {
        // Create order in database
        const order = await DatabaseService.createOrder({
          id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          userId: session.metadata?.userId || '',
          items: session.line_items?.data.map(item => ({
            productId: item.price?.id || '',
            quantity: item.quantity || 1,
            price: (item.amount_total || 0) / 100,
            name: item.description || '',
          })) || [],
          total: (session.amount_total || 0) / 100,
          status: 'paid',
          paymentIntentId: session.payment_intent as string,
        });

        return order;
      }

      return null;
    } catch (error) {
      console.error('Error handling payment success:', error);
      throw new Error('Failed to handle payment success');
    }
  }

  // Create a payment intent for direct payments
  static async createPaymentIntent(amount: number, currency: string = 'usd') {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  // Retrieve payment intent
  static async getPaymentIntent(paymentIntentId: string) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      console.error('Error retrieving payment intent:', error);
      throw new Error('Failed to retrieve payment intent');
    }
  }
}
