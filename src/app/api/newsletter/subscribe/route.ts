import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/db/dynamo';
import { EmailService } from '@/lib/email/ses';

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, source = 'unknown' } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if email already exists
    const existingSubscriber = await DatabaseService.getNewsletterSubscriberByEmail(email);
    
    if (existingSubscriber) {
      if (existingSubscriber.status === 'subscribed') {
        return NextResponse.json({ error: 'Email is already subscribed' }, { status: 400 });
      } else if (existingSubscriber.status === 'unsubscribed') {
        // Resubscribe them
        await DatabaseService.updateNewsletterSubscriber(existingSubscriber.id, {
          status: 'subscribed',
          source,
          firstName: firstName || existingSubscriber.firstName,
        });
        
        // Send welcome email
        await EmailService.sendWelcomeEmail({
          ...existingSubscriber,
          status: 'subscribed',
          source,
          firstName: firstName || existingSubscriber.firstName,
        });

        return NextResponse.json({ message: 'Successfully resubscribed!' });
      }
    }

    // Create new subscriber
    const subscriberId = `subscriber_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newSubscriber = await DatabaseService.createNewsletterSubscriber({
      id: subscriberId,
      email,
      firstName,
      status: 'subscribed',
      source,
    });

    // Send welcome email
    await EmailService.sendWelcomeEmail(newSubscriber);

    return NextResponse.json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
