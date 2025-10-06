import { Metadata } from 'next'
import AdminDashboardClient from '@/components/admin/AdminDashboardClient'

// export const dynamic = 'force-dynamic'; // Not compatible with static export

export const metadata: Metadata = {
  title: 'Admin Dashboard | NYASC',
  description: 'Admin dashboard for Not Your Average School Counselor',
  robots: 'noindex, nofollow'
}

export default function AdminDashboard() {
  return <AdminDashboardClient />
}
