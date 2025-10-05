import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface Order {
  id: string
  customerEmail: string
  total: number
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
  items: Array<{
    name: string
    quantity: number
  }>
}

interface RecentOrdersProps {
  orders?: Order[]
}

export default function RecentOrders({ orders = [] }: RecentOrdersProps) {
  // Mock data for now
  const mockOrders: Order[] = [
    {
      id: 'ord_123',
      customerEmail: 'customer@example.com',
      total: 29.99,
      status: 'completed',
      createdAt: '2024-01-15T10:30:00Z',
      items: [{ name: 'Counseling Toolkit', quantity: 1 }]
    },
    {
      id: 'ord_124',
      customerEmail: 'teacher@school.edu',
      total: 49.99,
      status: 'pending',
      createdAt: '2024-01-15T09:15:00Z',
      items: [{ name: 'Complete Bundle', quantity: 1 }]
    },
    {
      id: 'ord_125',
      customerEmail: 'admin@district.org',
      total: 99.99,
      status: 'completed',
      createdAt: '2024-01-14T16:45:00Z',
      items: [{ name: 'Premium Bundle', quantity: 1 }]
    }
  ]

  const displayOrders = orders.length > 0 ? orders : mockOrders

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/orders">
            <Eye className="h-4 w-4 mr-2" />
            View All
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">#{order.id}</p>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{order.customerEmail}</p>
                <p className="text-sm text-gray-500">
                  {order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                </p>
                <p className="text-xs text-gray-400">{formatDate(order.createdAt)}</p>
              </div>
              <div className="text-right ml-4">
                <p className="font-semibold text-gray-900">{formatCurrency(order.total)}</p>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/orders/${order.id}`}>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
