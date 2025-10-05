'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, X, DollarSign } from 'lucide-react';

const categories = [
  'Social Emotional Learning',
  'Crisis Intervention',
  'Assessment',
  'College Readiness',
  'Bullying Prevention',
  'Mental Health',
  'Parent Communication',
  'Activities',
  'Templates',
  'Safety',
];

const grades = [
  'Elementary',
  'Middle School',
  'High School',
];

const priceRanges = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: 'Over $100', min: 100, max: 1000 },
];

export default function ShopFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'all' | 'products' | 'bundles'>('all');

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleGrade = (grade: string) => {
    setSelectedGrades(prev => 
      prev.includes(grade) 
        ? prev.filter(g => g !== grade)
        : [...prev, grade]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedGrades([]);
    setSelectedPriceRange('');
    setSelectedType('all');
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedGrades.length > 0 || selectedPriceRange || selectedType !== 'all';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-nyasc-gray-900 flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-nyasc-blue-600 hover:text-nyasc-blue-700 flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </button>
        )}
      </div>

      {/* Product Type */}
      <div>
        <h4 className="font-medium text-nyasc-gray-900 mb-3">Product Type</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              value="all"
              checked={selectedType === 'all'}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="h-4 w-4 text-nyasc-blue-600 focus:ring-nyasc-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-nyasc-gray-700">All Products</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              value="products"
              checked={selectedType === 'products'}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="h-4 w-4 text-nyasc-blue-600 focus:ring-nyasc-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-nyasc-gray-700">Individual Products</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="type"
              value="bundles"
              checked={selectedType === 'bundles'}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="h-4 w-4 text-nyasc-blue-600 focus:ring-nyasc-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-nyasc-gray-700">Bundles</span>
          </label>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-medium text-nyasc-gray-900 mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="h-4 w-4 text-nyasc-blue-600 focus:ring-nyasc-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-nyasc-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Grade Levels */}
      <div>
        <h4 className="font-medium text-nyasc-gray-900 mb-3">Grade Levels</h4>
        <div className="space-y-2">
          {grades.map(grade => (
            <label key={grade} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedGrades.includes(grade)}
                onChange={() => toggleGrade(grade)}
                className="h-4 w-4 text-nyasc-blue-600 focus:ring-nyasc-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-nyasc-gray-700">{grade}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium text-nyasc-gray-900 mb-3 flex items-center">
          <DollarSign className="h-4 w-4 mr-1" />
          Price Range
        </h4>
        <div className="space-y-2">
          {priceRanges.map(range => (
            <label key={range.label} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                value={range.label}
                checked={selectedPriceRange === range.label}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="h-4 w-4 text-nyasc-blue-600 focus:ring-nyasc-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-nyasc-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-nyasc-blue-50 rounded-lg p-4"
        >
          <h4 className="font-medium text-nyasc-gray-900 mb-2">Active Filters</h4>
          <div className="space-y-2">
            {selectedType !== 'all' && (
              <div>
                <span className="text-sm font-medium text-nyasc-gray-700">Type: </span>
                <span className="text-sm text-nyasc-gray-600">
                  {selectedType === 'products' ? 'Individual Products' : 'Bundles'}
                </span>
              </div>
            )}
            {selectedCategories.length > 0 && (
              <div>
                <span className="text-sm font-medium text-nyasc-gray-700">Categories: </span>
                <span className="text-sm text-nyasc-gray-600">
                  {selectedCategories.join(', ')}
                </span>
              </div>
            )}
            {selectedGrades.length > 0 && (
              <div>
                <span className="text-sm font-medium text-nyasc-gray-700">Grades: </span>
                <span className="text-sm text-nyasc-gray-600">
                  {selectedGrades.join(', ')}
                </span>
              </div>
            )}
            {selectedPriceRange && (
              <div>
                <span className="text-sm font-medium text-nyasc-gray-700">Price: </span>
                <span className="text-sm text-nyasc-gray-600">
                  {selectedPriceRange}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Popular Categories */}
      <div>
        <h4 className="font-medium text-nyasc-gray-900 mb-3">Popular Categories</h4>
        <div className="flex flex-wrap gap-2">
          {['SEL', 'Crisis Intervention', 'Assessment', 'Mental Health'].map(category => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedCategories.includes(category)
                  ? 'bg-nyasc-blue-600 text-white'
                  : 'bg-nyasc-gray-100 text-nyasc-gray-700 hover:bg-nyasc-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <h4 className="font-medium text-nyasc-gray-900 mb-3">Featured</h4>
        <div className="space-y-3">
          <div className="bg-nyasc-yellow-50 border border-nyasc-yellow-200 rounded-lg p-3">
            <div className="text-sm font-medium text-nyasc-gray-900 mb-1">Best Sellers</div>
            <div className="text-xs text-nyasc-gray-600">Most popular products this month</div>
          </div>
          <div className="bg-nyasc-blue-50 border border-nyasc-blue-200 rounded-lg p-3">
            <div className="text-sm font-medium text-nyasc-gray-900 mb-1">New Releases</div>
            <div className="text-xs text-nyasc-gray-600">Latest additions to our catalog</div>
          </div>
        </div>
      </div>
    </div>
  );
}
