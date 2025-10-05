import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  FileText, 
  Package, 
  Mail, 
  Tag,
  Users,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

export default function QuickActions() {
  const actions = [
    {
      title: 'New Blog Post',
      description: 'Create a new blog post',
      href: '/admin/blog/new',
      icon: FileText,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Add Product',
      description: 'Add a new digital product',
      href: '/admin/products/new',
      icon: Package,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Create Bundle',
      description: 'Create a product bundle',
      href: '/admin/bundles/new',
      icon: Plus,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Email Campaign',
      description: 'Send an email campaign',
      href: '/admin/email/new',
      icon: Mail,
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      title: 'Create Coupon',
      description: 'Generate a discount coupon',
      href: '/admin/coupons/new',
      icon: Tag,
      color: 'bg-pink-500 hover:bg-pink-600'
    },
    {
      title: 'View Analytics',
      description: 'Check performance metrics',
      href: '/admin/analytics',
      icon: BarChart3,
      color: 'bg-indigo-500 hover:bg-indigo-600'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              asChild
              className={`${action.color} text-white h-auto p-4 flex flex-col items-start space-y-2`}
            >
              <Link href={action.href}>
                <action.icon className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-semibold">{action.title}</div>
                  <div className="text-sm opacity-90">{action.description}</div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
