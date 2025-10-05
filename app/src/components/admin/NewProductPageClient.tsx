'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ProductForm from '@/components/admin/ProductForm'

export default function NewProductPageClient() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/auth/me')
        
        if (!response.ok) {
          router.push('/auth/login?redirect=/admin/products/new')
          return
        }

        const { user: currentUser } = await response.json()
        
        // Check if user is admin by trying to access admin stats
        const adminResponse = await fetch('/api/admin/stats')
        if (!adminResponse.ok) {
          router.push('/account')
          return
        }

        setUser(currentUser)
      } catch (error) {
        console.error('Error loading user data:', error)
        router.push('/auth/login?redirect=/admin/products/new')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

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
