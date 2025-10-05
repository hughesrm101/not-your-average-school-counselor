import { Metadata } from 'next'
import { getCurrentUser } from '@/lib/auth-server'
import { requireAdmin } from '@/lib/rbac'
import ProductForm from '@/components/admin/ProductForm'

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Add New Product | Admin | NYASC',
  description: 'Add a new digital product',
  robots: 'noindex, nofollow'
}

export default async function NewProductPage() {
  const user = await getCurrentUser()
  await requireAdmin(user!)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600">Create a new digital product for your store</p>
      </div>

      <ProductForm />
    </div>
  )
}
