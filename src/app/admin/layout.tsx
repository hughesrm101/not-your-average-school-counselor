import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/admin" className="text-xl font-bold text-gray-900">
                NYASC Admin
              </Link>
            </div>
            <nav className="flex space-x-8">
              <Link href="/admin" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/admin/products" className="text-gray-700 hover:text-blue-600">
                Products
              </Link>
              <Link href="/admin/blog" className="text-gray-700 hover:text-blue-600">
                Blog
              </Link>
              <Link href="/admin/newsletter" className="text-gray-700 hover:text-blue-600">
                Newsletter
              </Link>
              <Link href="/admin/orders" className="text-gray-700 hover:text-blue-600">
                Orders
              </Link>
              <Link href="/admin/users" className="text-gray-700 hover:text-blue-600">
                Users
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {session.user.name}
              </span>
              <Link href="/" className="text-sm text-blue-600 hover:text-blue-800">
                View Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
