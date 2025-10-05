import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, ShoppingCart, Users, FileText, TrendingUp, TrendingDown } from 'lucide-react'

interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalUsers: number
  totalPosts: number
  revenueChange: number
  ordersChange: number
  usersChange: number
  postsChange: number
}

interface AdminStatsProps {
  stats: DashboardStats
}

export default function AdminStats({ stats }: AdminStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatPercentage = (change: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(1)}%`
  }

  const statsData = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      change: stats.revenueChange,
      icon: DollarSign,
      description: 'vs last month'
    },
    {
      title: 'Total Orders',
      value: formatNumber(stats.totalOrders),
      change: stats.ordersChange,
      icon: ShoppingCart,
      description: 'vs last month'
    },
    {
      title: 'Total Users',
      value: formatNumber(stats.totalUsers),
      change: stats.usersChange,
      icon: Users,
      description: 'vs last month'
    },
    {
      title: 'Blog Posts',
      value: formatNumber(stats.totalPosts),
      change: stats.postsChange,
      icon: FileText,
      description: 'vs last month'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat) => {
        const isPositive = stat.change >= 0
        const ChangeIcon = isPositive ? TrendingUp : TrendingDown
        
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center text-xs text-gray-500">
                <ChangeIcon className={`h-3 w-3 mr-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
                <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
                  {formatPercentage(stat.change)}
                </span>
                <span className="ml-1">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
