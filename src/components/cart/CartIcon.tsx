'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart" className="relative">
      <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-blue-600" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
