import { NextRequest, NextResponse } from 'next/server';
import { StripeService } from '@/lib/stripe/checkout';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items, customerInfo } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    const stripeSession = await StripeService.createCheckoutSession(
      items,
      session.user.id,
      `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
      `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`
    );

    return NextResponse.json({ sessionId: stripeSession.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
