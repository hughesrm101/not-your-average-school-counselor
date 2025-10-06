'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ProductForm from '@/components/admin/ProductForm'

export default function NewProductPageClient() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

          useEffect(() => {
            // For static export, we'll use mock data
            setUser({ name: 'Admin', isAdmin: true })
            setLoading(false)
          }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600">Loading...</p>
        </div>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

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
