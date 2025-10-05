import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentUser, requireAdmin as requireAdminAuth } from '@/lib/auth-server'
import { requireAdmin } from '@/lib/rbac'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Dashboard | NYASC',
  description: 'Admin dashboard for Not Your Average School Counselor',
  robots: 'noindex, nofollow'
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/login?redirect=/admin')
  }

  try {
    await requireAdmin(user)
  } catch {
    redirect('/account')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader user={user} />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
