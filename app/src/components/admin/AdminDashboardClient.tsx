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
    async function loadData() {
      try {
        // Get current user
        const userResponse = await fetch('/api/auth/me')
        if (!userResponse.ok) {
          router.push('/auth/login?redirect=/admin')
          return
        }
        const { user: currentUser } = await userResponse.json()
        setUser(currentUser)
        
        // Get dashboard stats
        const statsResponse = await fetch('/api/admin/stats')
        if (!statsResponse.ok) {
          router.push('/account')
          return
        }
        const { stats: dashboardStats } = await statsResponse.json()
        setStats(dashboardStats)
      } catch (error) {
        console.error('Error loading admin data:', error)
        router.push('/auth/login?redirect=/admin')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

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
