import { DatabaseService } from '@/lib/db/dynamo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default async function NewsletterPage() {
  const [subscribers, campaigns] = await Promise.all([
    DatabaseService.getAllNewsletterSubscribers(),
    DatabaseService.getAllEmailCampaigns(),
  ]);

  const activeSubscribers = subscribers.filter(s => s.status === 'subscribed');
  const unsubscribed = subscribers.filter(s => s.status === 'unsubscribed');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Newsletter Management</h1>
          <p className="text-gray-600">Manage subscribers and email campaigns</p>
        </div>
        <Link
          href="/admin/newsletter/campaigns/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create Campaign
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribers.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeSubscribers.length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscribers.length}</div>
            <p className="text-xs text-muted-foreground">
              {unsubscribed.length} unsubscribed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
            <p className="text-xs text-muted-foreground">
              {campaigns.filter(c => c.status === 'sent').length} sent
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Subscribers */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Subscribers</CardTitle>
          <CardDescription>Latest newsletter signups</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subscribers.slice(0, 10).map((subscriber) => (
              <div key={subscriber.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{subscriber.email}</p>
                  <p className="text-sm text-gray-600">
                    {subscriber.firstName && `${subscriber.firstName} • `}
                    Subscribed {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    {subscriber.source && ` • via ${subscriber.source}`}
                  </p>
                </div>
                <Badge variant={subscriber.status === 'subscribed' ? 'default' : 'secondary'}>
                  {subscriber.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Email Campaigns</CardTitle>
          <CardDescription>Manage your email marketing campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No campaigns yet</p>
            ) : (
              campaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{campaign.name}</h3>
                    <p className="text-sm text-gray-600">{campaign.subject}</p>
                    <p className="text-sm text-gray-500">
                      {campaign.recipientCount} recipients • {campaign.sentCount} sent
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={campaign.status === 'sent' ? 'default' : 'secondary'}>
                      {campaign.status}
                    </Badge>
                    <Link
                      href={`/admin/newsletter/campaigns/${campaign.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
