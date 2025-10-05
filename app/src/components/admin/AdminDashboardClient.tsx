'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminStats from '@/components/admin/AdminStats'
import RecentOrders from '@/components/admin/RecentOrders'
import RecentPosts from '@/components/admin/RecentPosts'
import QuickActions from '@/components/admin/QuickActions'

export default function AdminDashboardClient() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

          useEffect(() => {
            // For static export, we'll use mock data
            setUser({ name: 'Admin', isAdmin: true })
            setStats({
              totalProducts: 0,
              totalOrders: 0,
              totalRevenue: 0,
              totalUsers: 0
            })
            setLoading(false)
          }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Loading...</p>
        </div>
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}</p>
      </div>

      {stats && <AdminStats stats={stats} />}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <RecentPosts />
      </div>

      <QuickActions />
    </div>
  )
}
