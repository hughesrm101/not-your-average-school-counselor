import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { DatabaseService } from '@/lib/db/dynamo';
import { EmailService } from '@/lib/email/ses';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, subject, content, htmlContent } = await request.json();

    if (!name || !subject || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get subscriber count
    const subscribers = await DatabaseService.getAllNewsletterSubscribers();
    const activeSubscribers = subscribers.filter(s => s.status === 'subscribed');

    const campaignId = `campaign_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const campaign = await DatabaseService.createEmailCampaign({
      id: campaignId,
      name,
      subject,
      content,
      status: 'draft',
      recipientCount: activeSubscribers.length,
      sentCount: 0,
      openCount: 0,
      clickCount: 0,
    });

    return NextResponse.json({ campaign });
  } catch (error) {
    console.error('Error creating email campaign:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const campaigns = await DatabaseService.getAllEmailCampaigns();
    return NextResponse.json({ campaigns });
  } catch (error) {
    console.error('Error fetching email campaigns:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
