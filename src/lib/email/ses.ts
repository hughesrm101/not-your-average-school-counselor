import { SESClient, SendEmailCommand, SendTemplatedEmailCommand } from '@aws-sdk/client-ses';
import { DatabaseService } from '../db/dynamo';
import { NewsletterSubscriber } from '../db/schema';

const sesClient = new SESClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
});

const FROM_EMAIL = process.env.FROM_EMAIL || 'hello@nyasc.co';
const REPLY_TO_EMAIL = process.env.REPLY_TO_EMAIL || 'hello@nyasc.co';

export class EmailService {
  // Send welcome email to new subscriber
  static async sendWelcomeEmail(subscriber: NewsletterSubscriber): Promise<boolean> {
    try {
      const command = new SendEmailCommand({
        Source: FROM_EMAIL,
        Destination: {
          ToAddresses: [subscriber.email],
        },
        ReplyToAddresses: [REPLY_TO_EMAIL],
        Message: {
          Subject: {
            Data: 'Welcome to Not Your Average School Counselor! 💙',
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 40px 20px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">Hey friend! 💙</h1>
                    <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Welcome to the NYASC community</p>
                  </div>
                  
                  <div style="padding: 40px 20px; background: white;">
                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                      I'm so glad you're here! As a middle school counselor, I know you're juggling 500 things at once, 
                      and I'm here to help make your life a little easier.
                    </p>
                    
                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                      You'll get:
                    </p>
                    
                    <ul style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0; padding-left: 20px;">
                      <li>Real resources that actually work with middle schoolers</li>
                      <li>Behind-the-scenes stories from the counseling office</li>
                      <li>Early access to new products and special pricing</li>
                      <li>Tips and strategies from someone who's been there</li>
                    </ul>
                    
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="https://nyasc.co/shop" 
                         style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                        Check Out My Resources
                      </a>
                    </div>
                    
                    <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                      Thanks for joining our community of amazing counselors!<br>
                      - Not Your Average School Counselor
                    </p>
                  </div>
                </div>
              `,
              Charset: 'UTF-8',
            },
            Text: {
              Data: `
                Hey friend! 💙
                
                Welcome to Not Your Average School Counselor! I'm so glad you're here.
                
                As a middle school counselor, I know you're juggling 500 things at once, and I'm here to help make your life a little easier.
                
                You'll get:
                - Real resources that actually work with middle schoolers
                - Behind-the-scenes stories from the counseling office
                - Early access to new products and special pricing
                - Tips and strategies from someone who's been there
                
                Check out my resources: https://nyasc.co/shop
                
                Thanks for joining our community of amazing counselors!
                - Not Your Average School Counselor
              `,
              Charset: 'UTF-8',
            },
          },
        },
      });

      await sesClient.send(command);
      return true;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return false;
    }
  }

  // Send newsletter to all subscribers
  static async sendNewsletter(subject: string, content: string, htmlContent: string): Promise<{ sent: number; failed: number }> {
    try {
      const subscribers = await DatabaseService.getAllNewsletterSubscribers();
      const activeSubscribers = subscribers.filter(s => s.status === 'subscribed');
      
      let sent = 0;
      let failed = 0;

      for (const subscriber of activeSubscribers) {
        try {
          const command = new SendEmailCommand({
            Source: FROM_EMAIL,
            Destination: {
              ToAddresses: [subscriber.email],
            },
            ReplyToAddresses: [REPLY_TO_EMAIL],
            Message: {
              Subject: {
                Data: subject,
                Charset: 'UTF-8',
              },
              Body: {
                Html: {
                  Data: htmlContent,
                  Charset: 'UTF-8',
                },
                Text: {
                  Data: content,
                  Charset: 'UTF-8',
                },
              },
            },
          });

          await sesClient.send(command);
          sent++;

          // Update last email sent timestamp
          await DatabaseService.updateNewsletterSubscriber(subscriber.id, {
            lastEmailSent: new Date().toISOString(),
          });
        } catch (error) {
          console.error(`Error sending email to ${subscriber.email}:`, error);
          failed++;
        }
      }

      return { sent, failed };
    } catch (error) {
      console.error('Error sending newsletter:', error);
      return { sent: 0, failed: 0 };
    }
  }

  // Send order confirmation email
  static async sendOrderConfirmation(order: any, customerEmail: string): Promise<boolean> {
    try {
      const command = new SendEmailCommand({
        Source: FROM_EMAIL,
        Destination: {
          ToAddresses: [customerEmail],
        },
        ReplyToAddresses: [REPLY_TO_EMAIL],
        Message: {
          Subject: {
            Data: `Order Confirmation - ${order.id}`,
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 40px 20px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">Order Confirmed! 🎉</h1>
                    <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Thank you for your order</p>
                  </div>
                  
                  <div style="padding: 40px 20px; background: white;">
                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                      Your order has been confirmed and is being processed. You'll receive another email when it ships.
                    </p>
                    
                    <div style="background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
                      <h3 style="color: #374151; margin: 0 0 10px 0;">Order Details</h3>
                      <p style="color: #6b7280; margin: 0; font-size: 14px;">Order #${order.id}</p>
                      <p style="color: #6b7280; margin: 0; font-size: 14px;">Total: $${order.total.toFixed(2)}</p>
                    </div>
                    
                    <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                      Questions? Just reply to this email and I'll help you out!<br>
                      - Not Your Average School Counselor
                    </p>
                  </div>
                </div>
              `,
              Charset: 'UTF-8',
            },
            Text: {
              Data: `
                Order Confirmed! 🎉
                
                Your order has been confirmed and is being processed. You'll receive another email when it ships.
                
                Order Details:
                Order #${order.id}
                Total: $${order.total.toFixed(2)}
                
                Questions? Just reply to this email and I'll help you out!
                - Not Your Average School Counselor
              `,
              Charset: 'UTF-8',
            },
          },
        },
      });

      await sesClient.send(command);
      return true;
    } catch (error) {
      console.error('Error sending order confirmation:', error);
      return false;
    }
  }

  // Send unsubscribe confirmation
  static async sendUnsubscribeConfirmation(email: string): Promise<boolean> {
    try {
      const command = new SendEmailCommand({
        Source: FROM_EMAIL,
        Destination: {
          ToAddresses: [email],
        },
        ReplyToAddresses: [REPLY_TO_EMAIL],
        Message: {
          Subject: {
            Data: 'You\'ve been unsubscribed',
            Charset: 'UTF-8',
          },
          Body: {
            Text: {
              Data: `
                You've been successfully unsubscribed from our newsletter.
                
                We're sorry to see you go! If you change your mind, you can always resubscribe at https://nyasc.co
                
                - Not Your Average School Counselor
              `,
              Charset: 'UTF-8',
            },
          },
        },
      });

      await sesClient.send(command);
      return true;
    } catch (error) {
      console.error('Error sending unsubscribe confirmation:', error);
      return false;
    }
  }
}
