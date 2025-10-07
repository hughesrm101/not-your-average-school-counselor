'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  status: string;
  category: string;
  type: string;
  slug: string;
  inventory?: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((product: any) => product.id !== productId));
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete product');
      }
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                  {product.status}
                </Badge>
              </div>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className="font-semibold">${product.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Category:</span>
                  <span className="text-sm">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Type:</span>
                  <span className="text-sm">{product.type}</span>
                </div>
                {product.inventory !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Inventory:</span>
                    <span className="text-sm">{product.inventory}</span>
                  </div>
                )}
                <div className="flex space-x-2 pt-2">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="flex-1 text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </Link>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-600 mb-4">No products found</p>
            <Link
              href="/admin/products/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Create your first product
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
