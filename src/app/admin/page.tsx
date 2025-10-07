import { DatabaseService } from '@/lib/db/dynamo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AdminDashboard() {
  // Get stats for dashboard
  const [products, orders, blogPosts] = await Promise.all([
    DatabaseService.getProducts(),
    [], // We'll implement this later
    [], // We'll implement this later
  ]);

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.status === 'active').length,
    totalOrders: 0, // orders.length,
    pendingOrders: 0, // orders.filter(o => o.status === 'pending').length,
    totalBlogPosts: 0, // blogPosts.length,
    publishedPosts: 0, // blogPosts.filter(p => p.published).length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your NYASC platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeProducts} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingOrders} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBlogPosts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.publishedPosts} published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your product catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a
                href="/admin/products"
                className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Manage Products
              </a>
              <a
                href="/admin/products/new"
                className="block w-full text-center border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50"
              >
                Add New Product
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blog</CardTitle>
            <CardDescription>Create and manage blog posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a
                href="/admin/blog"
                className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Manage Posts
              </a>
              <a
                href="/admin/blog/new"
                className="block w-full text-center border border-green-600 text-green-600 py-2 px-4 rounded-md hover:bg-green-50"
              >
                Write New Post
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>View and manage orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a
                href="/admin/orders"
                className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
              >
                View Orders
              </a>
              <a
                href="/admin/orders/pending"
                className="block w-full text-center border border-purple-600 text-purple-600 py-2 px-4 rounded-md hover:bg-purple-50"
              >
                Pending Orders
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Newsletter</CardTitle>
            <CardDescription>Manage subscribers and campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a
                href="/admin/newsletter"
                className="block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                Manage Newsletter
              </a>
              <a
                href="/admin/newsletter/campaigns/new"
                className="block w-full text-center border border-indigo-600 text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50"
              >
                Create Campaign
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
