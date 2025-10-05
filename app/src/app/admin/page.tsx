import { Metadata } from 'next'
import { getCurrentUser, requireAdmin as requireAdminAuth } from '@/lib/auth-server'
import { requireAdmin } from '@/lib/rbac'
import { getDashboardStats } from '@/lib/db/dynamo'
import AdminStats from '@/components/admin/AdminStats'
import RecentOrders from '@/components/admin/RecentOrders'
import RecentPosts from '@/components/admin/RecentPosts'
import QuickActions from '@/components/admin/QuickActions'

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Dashboard | NYASC',
  description: 'Admin dashboard for Not Your Average School Counselor',
  robots: 'noindex, nofollow'
}

export default async function AdminDashboard() {
  const user = await getCurrentUser()
  await requireAdmin(user!)

  const stats = await getDashboardStats()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}</p>
      </div>

      <AdminStats stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <RecentPosts />
      </div>

      <QuickActions />
    </div>
  )
}
