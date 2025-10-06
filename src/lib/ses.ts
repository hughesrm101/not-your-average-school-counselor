import { SESClient, SendEmailCommand, SendTemplatedEmailCommand, CreateTemplateCommand, UpdateTemplateCommand, DeleteTemplateCommand, GetTemplateCommand, ListTemplatesCommand } from '@aws-sdk/client-ses';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { Order, EmailCampaign } from '@/types';

const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
});

const sqsClient = new SQSClient({
  region: process.env.AWS_REGION || 'us-east-1',
});

const FROM_EMAIL = process.env.SES_SENDER_EMAIL || 'hi@yourdomain.com';
const FROM_NAME = process.env.SES_SENDER_NAME || 'Not Your Average School Counselor';
const EMAIL_QUEUE_URL = process.env.EMAIL_QUEUE_URL || '';

// Email templates
export const EMAIL_TEMPLATES = {
  WELCOME: 'welcome',
  RECEIPT: 'receipt',
  DOWNLOAD_LINKS: 'download_links',
  COMMENT_APPROVED: 'comment_approved',
  COMMENT_REJECTED: 'comment_rejected',
  NEWSLETTER: 'newsletter',
  ABANDONED_CART: 'abandoned_cart',
  POST_PURCHASE: 'post_purchase',
  REFERRAL_REWARD: 'referral_reward',
  PASSWORD_RESET: 'password_reset',
  EMAIL_VERIFICATION: 'email_verification',
} as const;

// Send transactional email
export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
  cc,
  bcc,
  tags,
}: {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  tags?: Array<{ Name: string; Value: string }>;
}) {
  try {
    const command = new SendEmailCommand({
      Source: `${FROM_NAME} <${FROM_EMAIL}>`,
      Destination: {
        ToAddresses: Array.isArray(to) ? to : [to],
        CcAddresses: cc ? (Array.isArray(cc) ? cc : [cc]) : undefined,
        BccAddresses: bcc ? (Array.isArray(bcc) ? bcc : [bcc]) : undefined,
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: html ? {
            Data: html,
            Charset: 'UTF-8',
          } : undefined,
          Text: text ? {
            Data: text,
            Charset: 'UTF-8',
          } : undefined,
        },
      },
      ReplyToAddresses: replyTo ? [replyTo] : undefined,
      Tags: tags,
    });

    const result = await sesClient.send(command);
    return result.MessageId;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Send templated email
export async function sendTemplatedEmail({
  to,
  templateName,
  templateData,
  replyTo,
  cc,
  bcc,
  tags,
}: {
  to: string | string[];
  templateName: string;
  templateData: Record<string, any>;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  tags?: Array<{ Name: string; Value: string }>;
}) {
  try {
    const command = new SendTemplatedEmailCommand({
      Source: `${FROM_NAME} <${FROM_EMAIL}>`,
      Destination: {
        ToAddresses: Array.isArray(to) ? to : [to],
        CcAddresses: cc ? (Array.isArray(cc) ? cc : [cc]) : undefined,
        BccAddresses: bcc ? (Array.isArray(bcc) ? bcc : [bcc]) : undefined,
      },
      Template: templateName,
      TemplateData: JSON.stringify(templateData),
      ReplyToAddresses: replyTo ? [replyTo] : undefined,
      Tags: tags,
    });

    const result = await sesClient.send(command);
    return result.MessageId;
  } catch (error) {
    console.error('Error sending templated email:', error);
    throw error;
  }
}

// Create email template
export async function createEmailTemplate({
  templateName,
  subject,
  htmlPart,
  textPart,
}: {
  templateName: string;
  subject: string;
  htmlPart: string;
  textPart?: string;
}) {
  try {
    const command = new CreateTemplateCommand({
      Template: {
        TemplateName: templateName,
        SubjectPart: subject,
        HtmlPart: htmlPart,
        TextPart: textPart,
      },
    });

    await sesClient.send(command);
  } catch (error) {
    console.error('Error creating email template:', error);
    throw error;
  }
}

// Update email template
export async function updateEmailTemplate({
  templateName,
  subject,
  htmlPart,
  textPart,
}: {
  templateName: string;
  subject: string;
  htmlPart: string;
  textPart?: string;
}) {
  try {
    const command = new UpdateTemplateCommand({
      Template: {
        TemplateName: templateName,
        SubjectPart: subject,
        HtmlPart: htmlPart,
        TextPart: textPart,
      },
    });

    await sesClient.send(command);
  } catch (error) {
    console.error('Error updating email template:', error);
    throw error;
  }
}

// Delete email template
export async function deleteEmailTemplate(templateName: string) {
  try {
    const command = new DeleteTemplateCommand({
      TemplateName: templateName,
    });

    await sesClient.send(command);
  } catch (error) {
    console.error('Error deleting email template:', error);
    throw error;
  }
}

// Get email template
export async function getEmailTemplate(templateName: string) {
  try {
    const command = new GetTemplateCommand({
      TemplateName: templateName,
    });

    const result = await sesClient.send(command);
    return result.Template;
  } catch (error) {
    console.error('Error getting email template:', error);
    throw error;
  }
}

// List email templates
export async function listEmailTemplates() {
  try {
    const command = new ListTemplatesCommand({});
    const result = await sesClient.send(command);
    return result.TemplatesMetadata || [];
  } catch (error) {
    console.error('Error listing email templates:', error);
    throw error;
  }
}

// Send receipt email
export async function sendReceiptEmail({
  to,
  name,
  order,
  downloadLinks,
}: {
  to: string;
  name: string;
  order: Order;
  downloadLinks: Array<{ productName: string; url: string; expiresAt: string }>;
}) {
  try {
    const subject = `Order Confirmation - ${order.orderId}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Order Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #20556B; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .order-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .download-links { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .download-link { display: block; padding: 10px; background: #35B6E8; color: white; text-decoration: none; margin: 10px 0; border-radius: 4px; }
          .footer { text-align: center; padding: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
            <p>Thank you for your purchase!</p>
          </div>
          
          <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for your order! Here are the details:</p>
            
            <div class="order-details">
              <h3>Order Details</h3>
              <p><strong>Order ID:</strong> ${order.orderId}</p>
              <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
              
              <h4>Items:</h4>
              <ul>
                ${order.items.map(item => `
                  <li>${item.title} - $${item.price.toFixed(2)} x ${item.quantity}</li>
                `).join('')}
              </ul>
            </div>
            
            ${downloadLinks.length > 0 ? `
              <div class="download-links">
                <h3>Download Links</h3>
                <p>Your download links are ready! Click below to download your files:</p>
                ${downloadLinks.map(link => `
                  <a href="${link.url}" class="download-link">
                    Download ${link.productName}
                  </a>
                  <p><small>Expires: ${new Date(link.expiresAt).toLocaleString()}</small></p>
                `).join('')}
                <p><strong>Note:</strong> Download links expire in 24 hours and can be used up to 5 times each.</p>
              </div>
            ` : ''}
            
            <p>You can also access your downloads anytime from your <a href="${process.env.NEXTAUTH_URL}/account/downloads">account dashboard</a>.</p>
            
            <p>If you have any questions, please don't hesitate to contact us.</p>
            
            <p>Best regards,<br>The NYASC Team</p>
          </div>
          
          <div class="footer">
            <p>Not Your Average School Counselor</p>
            <p><a href="${process.env.NEXTAUTH_URL}/legal/privacy">Privacy Policy</a> | <a href="${process.env.NEXTAUTH_URL}/legal/terms">Terms of Service</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Order Confirmation - ${order.orderId}
      
      Hi ${name},
      
      Thank you for your order! Here are the details:
      
      Order ID: ${order.orderId}
      Date: ${new Date(order.createdAt).toLocaleDateString()}
      Total: $${order.total.toFixed(2)}
      
      Items:
      ${order.items.map(item => `- ${item.title} - $${item.price.toFixed(2)} x ${item.quantity}`).join('\n')}
      
      ${downloadLinks.length > 0 ? `
      Download Links:
      ${downloadLinks.map(link => `- ${link.productName}: ${link.url}`).join('\n')}
      
      Note: Download links expire in 24 hours and can be used up to 5 times each.
      ` : ''}
      
      You can also access your downloads anytime from your account dashboard: ${process.env.NEXTAUTH_URL}/account/downloads
      
      If you have any questions, please don't hesitate to contact us.
      
      Best regards,
      The NYASC Team
    `;

    return await sendEmail({
      to,
      subject,
      html,
      text,
      tags: [
        { Name: 'type', Value: 'receipt' },
        { Name: 'order_id', Value: order.orderId },
      ],
    });
  } catch (error) {
    console.error('Error sending receipt email:', error);
    throw error;
  }
}

// Send welcome email
export async function sendWelcomeEmail({
  to,
  name,
  referralCode,
}: {
  to: string;
  name: string;
  referralCode: string;
}) {
  try {
    const subject = 'Welcome to Not Your Average School Counselor!';
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to NYASC</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #20556B; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .cta { background: #FFC62F; color: #2F3C4A; padding: 15px; text-align: center; margin: 20px 0; border-radius: 8px; }
          .cta a { color: #2F3C4A; text-decoration: none; font-weight: bold; }
          .footer { text-align: center; padding: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to NYASC!</h1>
            <p>Your journey to better school counseling starts here</p>
          </div>
          
          <div class="content">
            <p>Hi ${name},</p>
            <p>Welcome to Not Your Average School Counselor! We're thrilled to have you join our community of dedicated educators.</p>
            
            <p>Here's what you can do with your new account:</p>
            <ul>
              <li>Access our library of counseling resources</li>
              <li>Download digital products and bundles</li>
              <li>Read our latest blog posts and insights</li>
              <li>Connect with other school counselors</li>
              <li>Earn rewards by referring friends</li>
            </ul>
            
            <div class="cta">
              <a href="${process.env.NEXTAUTH_URL}/shop">Explore Our Products</a>
            </div>
            
            <h3>Your Referral Code</h3>
            <p>Share your unique referral code with colleagues and earn $10 for each friend who makes their first purchase:</p>
            <p><strong>${referralCode}</strong></p>
            
            <p>We're here to support you in your important work. If you have any questions, don't hesitate to reach out!</p>
            
            <p>Best regards,<br>The NYASC Team</p>
          </div>
          
          <div class="footer">
            <p>Not Your Average School Counselor</p>
            <p><a href="${process.env.NEXTAUTH_URL}/legal/privacy">Privacy Policy</a> | <a href="${process.env.NEXTAUTH_URL}/legal/terms">Terms of Service</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Welcome to Not Your Average School Counselor!
      
      Hi ${name},
      
      Welcome to Not Your Average School Counselor! We're thrilled to have you join our community of dedicated educators.
      
      Here's what you can do with your new account:
      - Access our library of counseling resources
      - Download digital products and bundles
      - Read our latest blog posts and insights
      - Connect with other school counselors
      - Earn rewards by referring friends
      
      Explore our products: ${process.env.NEXTAUTH_URL}/shop
      
      Your Referral Code:
      Share your unique referral code with colleagues and earn $10 for each friend who makes their first purchase: ${referralCode}
      
      We're here to support you in your important work. If you have any questions, don't hesitate to reach out!
      
      Best regards,
      The NYASC Team
    `;

    return await sendEmail({
      to,
      subject,
      html,
      text,
      tags: [
        { Name: 'type', Value: 'welcome' },
        { Name: 'referral_code', Value: referralCode },
      ],
    });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}

// Send comment approval email
export async function sendCommentApprovalEmail({
  to,
  name,
  postTitle,
  comment,
  postUrl,
}: {
  to: string;
  name: string;
  postTitle: string;
  comment: string;
  postUrl: string;
}) {
  try {
    const subject = `Your comment on "${postTitle}" has been approved`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Comment Approved</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #35B6E8; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .comment { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #35B6E8; }
          .cta { background: #FFC62F; color: #2F3C4A; padding: 15px; text-align: center; margin: 20px 0; border-radius: 8px; }
          .cta a { color: #2F3C4A; text-decoration: none; font-weight: bold; }
          .footer { text-align: center; padding: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Comment Approved!</h1>
            <p>Your comment is now live</p>
          </div>
          
          <div class="content">
            <p>Hi ${name},</p>
            <p>Great news! Your comment on "${postTitle}" has been approved and is now visible to other readers.</p>
            
            <div class="comment">
              <p><strong>Your comment:</strong></p>
              <p>"${comment}"</p>
            </div>
            
            <div class="cta">
              <a href="${postUrl}">View Your Comment</a>
            </div>
            
            <p>Thank you for contributing to the conversation! We appreciate your insights and engagement with our content.</p>
            
            <p>Best regards,<br>The NYASC Team</p>
          </div>
          
          <div class="footer">
            <p>Not Your Average School Counselor</p>
            <p><a href="${process.env.NEXTAUTH_URL}/legal/privacy">Privacy Policy</a> | <a href="${process.env.NEXTAUTH_URL}/legal/terms">Terms of Service</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    return await sendEmail({
      to,
      subject,
      html,
      tags: [
        { Name: 'type', Value: 'comment_approved' },
        { Name: 'post_title', Value: postTitle },
      ],
    });
  } catch (error) {
    console.error('Error sending comment approval email:', error);
    throw error;
  }
}

// Queue email for batch processing
export async function queueEmail({
  to,
  subject,
  html,
  text,
  templateName,
  templateData,
  campaignId,
  priority = 'normal',
}: {
  to: string | string[];
  subject?: string;
  html?: string;
  text?: string;
  templateName?: string;
  templateData?: Record<string, any>;
  campaignId?: string;
  priority?: 'high' | 'normal' | 'low';
}) {
  try {
    if (!EMAIL_QUEUE_URL) {
      throw new Error('Email queue URL not configured');
    }

    const message = {
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      templateName,
      templateData,
      campaignId,
      priority,
      timestamp: new Date().toISOString(),
    };

    const command = new SendMessageCommand({
      QueueUrl: EMAIL_QUEUE_URL,
      MessageBody: JSON.stringify(message),
      MessageAttributes: {
        priority: {
          DataType: 'String',
          StringValue: priority,
        },
        campaignId: {
          DataType: 'String',
          StringValue: campaignId || 'none',
        },
      },
    });

    await sqsClient.send(command);
  } catch (error) {
    console.error('Error queuing email:', error);
    throw error;
  }
}

// Send newsletter email
export async function sendNewsletterEmail({
  to,
  name,
  subject,
  content,
  unsubscribeUrl,
}: {
  to: string;
  name: string;
  subject: string;
  content: string;
  unsubscribeUrl: string;
}) {
  try {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #20556B; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .unsubscribe { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>NYASC Newsletter</h1>
          </div>
          
          <div class="content">
            <p>Hi ${name},</p>
            ${content}
            <p>Best regards,<br>The NYASC Team</p>
          </div>
          
          <div class="footer">
            <p>Not Your Average School Counselor</p>
            <div class="unsubscribe">
              <p>You received this email because you subscribed to our newsletter.</p>
              <p><a href="${unsubscribeUrl}">Unsubscribe</a> | <a href="${process.env.NEXTAUTH_URL}/account/preferences">Update Preferences</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    return await sendEmail({
      to,
      subject,
      html,
      tags: [
        { Name: 'type', Value: 'newsletter' },
        { Name: 'campaign', Value: 'newsletter' },
      ],
    });
  } catch (error) {
    console.error('Error sending newsletter email:', error);
    throw error;
  }
}
