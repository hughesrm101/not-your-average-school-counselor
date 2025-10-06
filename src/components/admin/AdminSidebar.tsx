'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Users,
  Mail,
  Settings,
  BarChart3,
  Package,
  Tag,
  CreditCard,
  MessageSquare,
  Search,
  Bell
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Bundles', href: '/admin/bundles', icon: ShoppingBag },
  { name: 'Orders', href: '/admin/orders', icon: CreditCard },
  { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { name: 'Comments', href: '/admin/comments', icon: MessageSquare },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Email Campaigns', href: '/admin/email', icon: Mail },
  { name: 'Coupons', href: '/admin/coupons', icon: Tag },
  { name: 'Search', href: '/admin/search', icon: Search },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
      </div>
      
      <nav className="px-4 pb-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
