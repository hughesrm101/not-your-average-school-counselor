'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Download, Users, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
// import { Product, Bundle } from '@/types';

// Real NYASC products from TPT and Etsy
const featuredProducts: any[] = [
  {
    productId: '1',
    title: 'Making Friends & Keeping Them',
    slug: 'making-friends-keeping-them',
    description: 'A comprehensive lesson plan with activities to help students build and maintain healthy friendships.',
    price: 4.50,
    cover: '/products/covers/making-friends.jpg',
    categories: ['Social Skills', 'Friendship'],
    grades: ['Elementary', 'Middle School'],
    tags: ['friendship', 'social skills', 'lesson plan'],
    status: 'active',
    isBundle: false,
    platform: 'TPT',
    rating: 4.9,
    sales: 150,
    files: [
      { s3Key: 'products/1/making-friends.pdf', name: 'Making Friends Lesson Plan.pdf', size: 1024000, type: 'application/pdf' }
    ],
    seo: {
      title: 'Making Friends & Keeping Them - School Counselor Resource',
      description: 'Help students build and maintain healthy friendships with this comprehensive lesson plan.',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    featured: true,
  },
  {
    productId: '2',
    title: 'Mindful Walking Worksheets',
    slug: 'mindful-walking-worksheets',
    description: 'Movement-based mindfulness activities perfect for students who need to get their energy out.',
    price: 2.75,
    cover: '/products/covers/mindful-walking.jpg',
    categories: ['Mindfulness', 'Movement'],
    grades: ['Elementary', 'Middle School', 'High School'],
    tags: ['mindfulness', 'movement', 'worksheets', 'calm down'],
    status: 'active',
    isBundle: false,
    platform: 'Etsy',
    rating: 4.8,
    sales: 89,
    files: [
      { s3Key: 'products/2/mindful-walking.pdf', name: 'Mindful Walking Worksheets.pdf', size: 1024000, type: 'application/pdf' }
    ],
    seo: {
      title: 'Mindful Walking Worksheets - School Counselor Resource',
      description: 'Movement-based mindfulness activities perfect for students who need to get their energy out.',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    featured: true,
  },
  {
    productId: '3',
    title: 'Parent Newsletters Bundle',
    slug: 'parent-newsletters-bundle',
    description: '12 professional parent newsletters covering topics like anxiety, friendship, and study skills.',
    price: 8.00,
    cover: '/products/covers/parent-newsletters.jpg',
    categories: ['Parent Communication', 'Newsletters'],
    grades: ['Elementary', 'Middle School', 'High School'],
    tags: ['parent communication', 'newsletters', 'professional'],
    status: 'active',
    isBundle: true,
    platform: 'TPT',
    rating: 4.9,
    sales: 203,
    files: [
      { s3Key: 'products/3/parent-newsletters.pdf', name: 'Parent Newsletters Bundle.pdf', size: 2048000, type: 'application/pdf' }
    ],
    seo: {
      title: 'Parent Newsletters Bundle - School Counselor Resource',
      description: '12 professional parent newsletters covering important topics for student success.',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    featured: true,
  },
];

export default function FeaturedProducts() {
  // Use the real featured products directly - no loading state needed
  const products = featuredProducts;

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="heading-2 mb-4">Featured Products</h2>
        <p className="body-large text-nyasc-gray-600 max-w-3xl mx-auto mb-8">
          Discover our most popular resources designed specifically for school counselors.
        </p>
        <Link href="/shop" className="inline-flex items-center text-nyasc-blue-600 hover:text-nyasc-blue-700 font-medium">
          View All Products
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => {
          const price = 'isBundle' in product ? product.bundlePrice : product.price;
          const isBundle = 'isBundle' in product ? product.isBundle : false;
          
          return (
            <motion.div
              key={product.productId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/shop/${product.slug}`} className="block">
                <div className="card-hover overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-nyasc-blue-500 to-nyasc-blue-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                        {isBundle ? 'Bundle' : 'Product'}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center space-x-2 text-white/80 text-sm mb-1">
                        <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                          {product.categories[0]}
                        </span>
                        {product.featured && (
                          <span className="bg-nyasc-yellow-500 text-nyasc-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-semibold text-nyasc-gray-900 mb-2 group-hover:text-nyasc-blue-600 transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    
                    <p className="text-sm text-nyasc-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-lg font-bold text-nyasc-gray-900">
                        {formatPrice(price)}
                      </div>
                      <div className="flex items-center text-sm text-nyasc-gray-500">
                        <Star className="h-4 w-4 fill-nyasc-yellow-400 text-nyasc-yellow-400 mr-1" />
                        <span>{product.rating || 4.9}</span>
                        {product.sales && (
                          <span className="ml-1">({product.sales})</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-nyasc-gray-500 mb-4">
                      <div className="flex items-center">
                        <Download className="h-3 w-3 mr-1" />
                        {product.files.length} file{product.files.length !== 1 ? 's' : ''}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {product.grades.join(', ')}
                      </div>
                    </div>
                    
                    {product.platform && (
                      <div className="mb-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-nyasc-blue-100 text-nyasc-blue-800">
                          Available on {product.platform}
                        </span>
                      </div>
                    )}
                    
                    <button className="w-full btn-primary text-sm">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 pt-16 border-t border-gray-200"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-nyasc-blue-600 mb-2">500+</div>
            <div className="text-sm text-nyasc-gray-600">Digital Resources</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-nyasc-blue-600 mb-2">50+</div>
            <div className="text-sm text-nyasc-gray-600">Product Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-nyasc-blue-600 mb-2">K-12</div>
            <div className="text-sm text-nyasc-gray-600">All Grade Levels</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-nyasc-blue-600 mb-2">24/7</div>
            <div className="text-sm text-nyasc-gray-600">Instant Access</div>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <Link href="/shop">
          <button className="btn-primary">
            Browse All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
