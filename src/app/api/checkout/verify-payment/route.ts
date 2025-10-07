import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'payment_intent'],
    });

    if (session.payment_status === 'paid') {
      // Here you would typically:
      // 1. Create an order record in your database
      // 2. Send confirmation email
      // 3. Provide download links
      // 4. Update inventory

      return NextResponse.json({
        success: true,
        paymentStatus: 'paid',
        session: {
          id: session.id,
          amount_total: session.amount_total,
          customer_email: session.customer_email,
          payment_status: session.payment_status,
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        paymentStatus: session.payment_status,
        error: 'Payment not completed',
      });
    }

  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
