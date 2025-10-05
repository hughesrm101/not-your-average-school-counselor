'use client'

import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/lib/auth-server'
import { requireAdmin } from '@/lib/rbac'
import ProductForm from '@/components/admin/ProductForm'

export default function NewProductPageClient() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const currentUser = await getCurrentUser()
        if (currentUser) {
          await requireAdmin(currentUser)
          setUser(currentUser)
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
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
