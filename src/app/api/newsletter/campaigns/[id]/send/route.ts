import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { DatabaseService } from '@/lib/db/dynamo';
import { EmailService } from '@/lib/email/ses';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const campaign = await DatabaseService.getEmailCampaign(resolvedParams.id);
    
    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    if (campaign.status !== 'draft') {
      return NextResponse.json({ error: 'Campaign has already been sent' }, { status: 400 });
    }

    // Update campaign status to sending
    await DatabaseService.updateEmailCampaign(resolvedParams.id, {
      status: 'sending',
    });

    // Send the newsletter
    const { sent, failed } = await EmailService.sendNewsletter(
      campaign.subject,
      campaign.content,
      campaign.content
    );

    // Update campaign with results
    await DatabaseService.updateEmailCampaign(resolvedParams.id, {
      status: 'sent',
      sentCount: sent,
      sentAt: new Date().toISOString(),
    });

    return NextResponse.json({ 
      message: 'Campaign sent successfully',
      sent,
      failed 
    });
  } catch (error) {
    console.error('Error sending email campaign:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
