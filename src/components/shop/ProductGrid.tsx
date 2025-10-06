'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Download, Users, Search, Filter } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
// import { Product, Bundle } from '@/types';

// Mock data - in real app, this would come from API
const mockProducts: any[] = [
  {
    productId: '1',
    title: 'Social Emotional Learning Toolkit',
    slug: 'social-emotional-learning-toolkit',
    description: 'Comprehensive collection of SEL activities, assessments, and resources for all grade levels.',
    price: 49.99,
    cover: '/products/covers/sel-toolkit.jpg',
    categories: ['Social Emotional Learning', 'Assessment'],
    grades: ['Elementary', 'Middle School', 'High School'],
    tags: ['SEL', 'activities', 'assessment', 'toolkit'],
    status: 'active',
    isBundle: false,
    files: [
      { s3Key: 'products/1/sel-toolkit.pdf', name: 'SEL Toolkit.pdf', size: 2048000, type: 'application/pdf' }
    ],
    seo: {
      title: 'Social Emotional Learning Toolkit',
      description: 'Comprehensive collection of SEL activities, assessments, and resources for all grade levels.',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    featured: true,
  },
  {
    productId: '2',
    title: 'Crisis Intervention Bundle',
    slug: 'crisis-intervention-bundle',
    description: 'Essential resources for handling crisis situations, including protocols, forms, and support materials.',
    bundlePrice: 79.99,
    isBundle: true,
    bundleItems: [
      { productId: '2a', quantity: 1, price: 29.99 },
      { productId: '2b', quantity: 1, price: 24.99 },
      { productId: '2c', quantity: 1, price: 24.99 }
    ],
    cover: '/products/covers/crisis-bundle.jpg',
    categories: ['Crisis Intervention', 'Safety'],
    grades: ['Elementary', 'Middle School', 'High School'],
    tags: ['crisis', 'intervention', 'safety', 'protocols'],
    status: 'active',
    files: [
      { s3Key: 'products/2/crisis-protocols.pdf', name: 'Crisis Protocols.pdf', size: 1536000, type: 'application/pdf' },
      { s3Key: 'products/2/response-forms.pdf', name: 'Response Forms.pdf', size: 1024000, type: 'application/pdf' },
      { s3Key: 'products/2/support-materials.pdf', name: 'Support Materials.pdf', size: 2048000, type: 'application/pdf' }
    ],
    seo: {
      title: 'Crisis Intervention Bundle',
      description: 'Essential resources for handling crisis situations, including protocols, forms, and support materials.',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    featured: true,
  },
  {
    productId: '3',
    title: 'College Readiness Assessment',
    slug: 'college-readiness-assessment',
    description: 'Comprehensive assessment tools to evaluate and support student college readiness.',
    price: 34.99,
    cover: '/products/covers/college-readiness.jpg',
    categories: ['College Readiness', 'Assessment'],
    grades: ['High School'],
    tags: ['college', 'readiness', 'assessment', 'planning'],
    status: 'active',
    isBundle: false,
    files: [
      { s3Key: 'products/3/college-assessment.pdf', name: 'College Readiness Assessment.pdf', size: 1280000, type: 'application/pdf' }
    ],
    seo: {
      title: 'College Readiness Assessment',
      description: 'Comprehensive assessment tools to evaluate and support student college readiness.',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    featured: false,
  },
  {
    productId: '4',
    title: 'Bullying Prevention Activities',
    slug: 'bullying-prevention-activities',
    description: 'Interactive activities and lesson plans to prevent bullying and promote positive school culture.',
    price: 29.99,
    cover: '/products/covers/bullying-prevention.jpg',
    categories: ['Bullying Prevention', 'Activities'],
    grades: ['Elementary', 'Middle School'],
    tags: ['bullying', 'prevention', 'activities', 'culture'],
    status: 'active',
    isBundle: false,
    files: [
      { s3Key: 'products/4/bullying-activities.pdf', name: 'Bullying Prevention Activities.pdf', size: 1792000, type: 'application/pdf' }
    ],
    seo: {
      title: 'Bullying Prevention Activities',
      description: 'Interactive activities and lesson plans to prevent bullying and promote positive school culture.',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    featured: false,
  },
  {
    productId: '5',
    title: 'Mental Health Screening Tools',
    slug: 'mental-health-screening-tools',
    description: 'Evidence-based screening tools for identifying mental health concerns in students.',
    price: 39.99,
    cover: '/products/covers/mental-health-screening.jpg',
    categories: ['Mental Health', 'Assessment'],
    grades: ['Elementary', 'Middle School', 'High School'],
    tags: ['mental health', 'screening', 'assessment', 'early intervention'],
    status: 'active',
    isBundle: false,
    files: [
      { s3Key: 'products/5/screening-tools.pdf', name: 'Mental Health Screening Tools.pdf', size: 1536000, type: 'application/pdf' }
    ],
    seo: {
      title: 'Mental Health Screening Tools',
      description: 'Evidence-based screening tools for identifying mental health concerns in students.',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    featured: false,
  },
  {
    productId: '6',
    title: 'Parent Communication Toolkit',
    slug: 'parent-communication-toolkit',
    description: 'Templates, scripts, and strategies for effective parent communication and engagement.',
    price: 24.99,
    cover: '/products/covers/parent-communication.jpg',
    categories: ['Parent Communication', 'Templates'],
    grades: ['Elementary', 'Middle School', 'High School'],
    tags: ['parent communication', 'templates', 'engagement', 'partnerships'],
    status: 'active',
    isBundle: false,
    files: [
      { s3Key: 'products/6/parent-toolkit.pdf', name: 'Parent Communication Toolkit.pdf', size: 1024000, type: 'application/pdf' }
    ],
    seo: {
      title: 'Parent Communication Toolkit',
      description: 'Templates, scripts, and strategies for effective parent communication and engagement.',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    featured: false,
  },
];

export default function ProductGrid() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'products' | 'bundles'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'price_low' | 'price_high'>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(mockProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchQuery || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags?.some((tag: any) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || 
      product.categories.includes(selectedCategory);
    
    const matchesGrade = !selectedGrade || 
      product.grades.includes(selectedGrade);

    const matchesType = selectedType === 'all' || 
      (selectedType === 'products' && !('isBundle' in product ? product.isBundle : false)) ||
      (selectedType === 'bundles' && ('isBundle' in product ? product.isBundle : false));

    return matchesSearch && matchesCategory && matchesGrade && matchesType;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'price_low':
        const priceA = 'isBundle' in a ? a.bundlePrice : a.price;
        const priceB = 'isBundle' in b ? b.bundlePrice : b.price;
        return priceA - priceB;
      case 'price_high':
        const priceAHigh = 'isBundle' in a ? a.bundlePrice : a.price;
        const priceBHigh = 'isBundle' in b ? b.bundlePrice : b.price;
        return priceBHigh - priceAHigh;
      default:
        return 0;
    }
  });

  const categories = Array.from(new Set(products.flatMap(product => product.categories)));
  const grades = Array.from(new Set(products.flatMap(product => product.grades)));

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4 w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Search and Controls */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-nyasc-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nyasc-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nyasc-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nyasc-blue-500 focus:border-transparent"
          >
            <option value="">All Grades</option>
            {grades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-nyasc-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-nyasc-blue-100 text-nyasc-blue-600' : 'text-nyasc-gray-400 hover:text-nyasc-gray-600'}`}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-nyasc-blue-100 text-nyasc-blue-600' : 'text-nyasc-gray-400 hover:text-nyasc-gray-600'}`}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nyasc-blue-500 focus:border-transparent text-sm"
            >
              <option value="relevance">Sort by relevance</option>
              <option value="newest">Sort by newest</option>
              <option value="price_low">Sort by price: low to high</option>
              <option value="price_high">Sort by price: high to low</option>
            </select>
            
            {(searchQuery || selectedCategory || selectedGrade || selectedType !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                  setSelectedGrade('');
                  setSelectedType('all');
                }}
                className="text-sm text-nyasc-blue-600 hover:text-nyasc-blue-700 flex items-center"
              >
                <Filter className="h-4 w-4 mr-1" />
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
        {sortedProducts.map((product, index) => {
          const price = 'isBundle' in product ? product.bundlePrice : product.price;
          const isBundle = 'isBundle' in product ? product.isBundle : false;
          
          return (
            <motion.div
              key={product.productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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
                    {product.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-nyasc-yellow-500 text-nyasc-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      </div>
                    )}
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
                        <span>4.9</span>
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

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-nyasc-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="heading-4 mb-2">No products found</h3>
          <p className="text-nyasc-gray-600 mb-4">
            Try adjusting your search terms or filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
              setSelectedGrade('');
              setSelectedType('all');
            }}
            className="btn-primary"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
