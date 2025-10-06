import { Suspense } from 'react';
import { Metadata } from 'next';
import { shopSEO } from '@/lib/seo';
import ProductGrid from '@/components/shop/ProductGrid';
import ShopFilters from '@/components/shop/ShopFilters';

export const metadata: Metadata = {
  title: shopSEO.title,
  description: shopSEO.description,
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <div className="text-center mb-12">
          <h1 className="heading-1 mb-4">Digital Products for School Counselors</h1>
          <p className="body-large text-nyasc-gray-600 max-w-3xl mx-auto">
            Browse our collection of digital products designed specifically for school counselors. 
            Worksheets, activities, assessments, and resources for every grade level.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ShopFilters />
            </Suspense>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <Suspense fallback={<div>Loading products...</div>}>
              <ProductGrid />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
