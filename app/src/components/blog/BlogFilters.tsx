'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';

const categories = [
  'Social Emotional Learning',
  'Crisis Intervention',
  'Student Support',
  'Mental Health',
  'Inclusion',
  'Parent Communication',
  'Career Guidance',
  'Assessment',
  'Technology',
  'Professional Development',
];

const grades = [
  'Elementary',
  'Middle School',
  'High School',
];

const tags = [
  'resilience',
  'coping skills',
  'mental health',
  'crisis',
  'intervention',
  'safety protocols',
  'LGBTQ+',
  'inclusion',
  'diversity',
  'parent communication',
  'partnerships',
  'collaboration',
  'career guidance',
  'technology',
  'job market',
  'assessment',
  'evaluation',
  'professional development',
  'training',
  'best practices',
];

export default function BlogFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedGrades([]);
    setSelectedTags([]);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedGrades.length > 0 || selectedTags.length > 0;

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

      {/* Grades */}
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

      {/* Tags */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-nyasc-gray-900">Tags</h4>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-nyasc-blue-600 hover:text-nyasc-blue-700"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        </div>
        <div className="space-y-2">
          {(isExpanded ? tags : tags.slice(0, 10)).map(tag => (
            <label key={tag} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
                className="h-4 w-4 text-nyasc-blue-600 focus:ring-nyasc-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-nyasc-gray-700">#{tag}</span>
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
            {selectedTags.length > 0 && (
              <div>
                <span className="text-sm font-medium text-nyasc-gray-700">Tags: </span>
                <span className="text-sm text-nyasc-gray-600">
                  {selectedTags.map(tag => `#${tag}`).join(', ')}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Popular Tags */}
      <div>
        <h4 className="font-medium text-nyasc-gray-900 mb-3">Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          {['mental health', 'crisis intervention', 'SEL', 'inclusion', 'assessment'].map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-nyasc-blue-600 text-white'
                  : 'bg-nyasc-gray-100 text-nyasc-gray-700 hover:bg-nyasc-gray-200'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
