import { Metadata } from 'next'
import NewProductPageClient from '@/components/admin/NewProductPageClient'

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Add New Product | Admin | NYASC',
  description: 'Add a new digital product',
  robots: 'noindex, nofollow'
}

export default function NewProductPage() {
  return <NewProductPageClient />
}
