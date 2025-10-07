import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/db/dynamo';
import { EmailService } from '@/lib/email/ses';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const success = await DatabaseService.unsubscribeNewsletter(email);
    
    if (success) {
      // Send unsubscribe confirmation
      await EmailService.sendUnsubscribeConfirmation(email);
      return NextResponse.json({ message: 'Successfully unsubscribed' });
    } else {
      return NextResponse.json({ error: 'Email not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
