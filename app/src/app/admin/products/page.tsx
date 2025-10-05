import { Metadata } from 'next'
import { getCurrentUser } from '@/lib/auth-server'
import { requireAdmin } from '@/lib/rbac'
import { getAllProducts } from '@/lib/db/dynamo'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

import ProductTable from '@/components/admin/ProductTable'

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Products | Admin | NYASC',
  description: 'Manage digital products',
  robots: 'noindex, nofollow'
}

export default async function ProductsPage() {
  const user = await getCurrentUser()
  await requireAdmin(user!)

  const products = await getAllProducts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your digital products</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      <ProductTable products={products} />
    </div>
  )
}
