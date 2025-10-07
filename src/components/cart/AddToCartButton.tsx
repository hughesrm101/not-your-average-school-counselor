'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/db/schema';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    
    try {
      addItem({
        productId: product.id,
        quantity: 1,
        price: product.price,
        name: product.name,
        image: product.images[0],
      });
      
      // Show success message (you could add a toast notification here)
      console.log('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={loading || product.status !== 'active'}
      className={className}
    >
      {loading ? 'Adding...' : 'Add to Cart'}
    </Button>
  );
}
