'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

interface MerchProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  isPhysical: boolean;
  vendor: string;
}

export default function MerchPage() {
  const [products, setProducts] = useState<MerchProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMerchProducts();
  }, []);

  const fetchMerchProducts = async () => {
    try {
      const response = await fetch('/api/printify/products');
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching merch products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading merchandise...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Not Your Average School Counselor
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/shop" className="text-gray-700 hover:text-blue-600">Digital Resources</Link>
              <Link href="/merch" className="text-blue-600 font-medium">Merchandise</Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600">Blog</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Counselor Merch 💙</h1>
          <p className="text-lg text-gray-600">
            Show your counselor pride with these custom-designed items. 
            Perfect for your office, classroom, or just because you're awesome!
          </p>
        </div>

        {/* Connect Printify Button */}
        {products.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Connect Your Printify Store</h3>
            <p className="text-blue-700 mb-4">
              To start selling merchandise, you'll need to connect your Printify account.
            </p>
            <Button 
              onClick={() => {
                // This would redirect to Printify OAuth
                window.open('/api/printify/connect', '_blank');
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Connect Printify Store
            </Button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <span className="text-6xl">👕</span>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{product.name}</CardTitle>
                <CardDescription className="line-clamp-3">{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    {formatPrice(product.price)}
                  </span>
                  <Badge variant="secondary">
                    {product.vendor}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No merchandise yet</h3>
            <p className="text-gray-600 mb-6">
              Connect your Printify store to start selling custom merchandise!
            </p>
            <Button 
              onClick={() => {
                window.open('/api/printify/connect', '_blank');
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Connect Printify Store
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
