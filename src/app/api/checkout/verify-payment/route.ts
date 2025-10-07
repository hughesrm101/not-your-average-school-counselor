import { NextRequest, NextResponse } from 'next/server';
import { StripeService } from '@/lib/stripe/checkout';

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    const order = await StripeService.handlePaymentSuccess(sessionId);

    if (!order) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
