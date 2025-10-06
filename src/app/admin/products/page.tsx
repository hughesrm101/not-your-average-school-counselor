import { Metadata } from 'next'
import ProductsPageClient from '@/components/admin/ProductsPageClient'

// export const dynamic = 'force-dynamic'; // Not compatible with static export

export const metadata: Metadata = {
  title: 'Products | Admin | NYASC',
  description: 'Manage digital products',
  robots: 'noindex, nofollow'
}

export default function ProductsPage() {
  return <ProductsPageClient />
}
