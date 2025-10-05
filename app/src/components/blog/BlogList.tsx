'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Search } from 'lucide-react';
import { formatDate, calculateReadingTime } from '@/lib/utils';
// import { BlogPost } from '@/types';

// Mock data - in real app, this would come from API
const mockBlogPosts: any[] = [
  {
    postId: '1',
    title: 'Building Resilience in Students: Evidence-Based Strategies',
    slug: 'building-resilience-students-evidence-based-strategies',
    excerpt: 'Learn practical techniques to help students develop resilience and coping skills for academic and personal success.',
    cover: '/blog/covers/resilience.jpg',
    authorName: 'Dr. Sarah Johnson',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    status: 'published',
    categories: ['Social Emotional Learning', 'Student Support'],
    tags: ['resilience', 'coping skills', 'mental health'],
    grades: ['Elementary', 'Middle School', 'High School'],
    contentMDX: 'Building resilience in students is crucial for their long-term success...',
    seo: {
      title: 'Building Resilience in Students: Evidence-Based Strategies',
      description: 'Learn practical techniques to help students develop resilience and coping skills for academic and personal success.',
    },
    featured: true,
  },
  {
    postId: '2',
    title: 'Crisis Intervention Protocols for School Counselors',
    slug: 'crisis-intervention-protocols-school-counselors',
    excerpt: 'Essential protocols and procedures for handling crisis situations in educational settings.',
    cover: '/blog/covers/crisis-intervention.jpg',
    authorName: 'Michael Chen',
    publishedAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    status: 'published',
    categories: ['Crisis Intervention', 'Safety'],
    tags: ['crisis', 'intervention', 'safety protocols'],
    grades: ['Elementary', 'Middle School', 'High School'],
    contentMDX: 'Crisis intervention is a critical component of school counseling...',
    seo: {
      title: 'Crisis Intervention Protocols for School Counselors',
      description: 'Essential protocols and procedures for handling crisis situations in educational settings.',
    },
    featured: true,
  },
  {
    postId: '3',
    title: 'Supporting LGBTQ+ Students: Creating Inclusive Environments',
    slug: 'supporting-lgbtq-students-creating-inclusive-environments',
    excerpt: 'Best practices for creating safe and supportive environments for LGBTQ+ students in schools.',
    cover: '/blog/covers/lgbtq-support.jpg',
    authorName: 'Dr. Emily Rodriguez',
    publishedAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
    status: 'published',
    categories: ['Inclusion', 'Student Support'],
    tags: ['LGBTQ+', 'inclusion', 'diversity'],
    grades: ['Middle School', 'High School'],
    contentMDX: 'Creating inclusive environments for LGBTQ+ students requires intentional effort...',
    seo: {
      title: 'Supporting LGBTQ+ Students: Creating Inclusive Environments',
      description: 'Best practices for creating safe and supportive environments for LGBTQ+ students in schools.',
    },
    featured: false,
  },
  {
    postId: '4',
    title: 'Mental Health First Aid for Educators',
    slug: 'mental-health-first-aid-educators',
    excerpt: 'How to recognize and respond to mental health crises in students using evidence-based approaches.',
    cover: '/blog/covers/mental-health.jpg',
    authorName: 'Dr. James Thompson',
    publishedAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
    status: 'published',
    categories: ['Mental Health', 'Crisis Intervention'],
    tags: ['mental health', 'first aid', 'crisis response'],
    grades: ['Elementary', 'Middle School', 'High School'],
    contentMDX: 'Mental health first aid is a crucial skill for all educators...',
    seo: {
      title: 'Mental Health First Aid for Educators',
      description: 'How to recognize and respond to mental health crises in students using evidence-based approaches.',
    },
    featured: false,
  },
  {
    postId: '5',
    title: 'Building Strong Parent-School Partnerships',
    slug: 'building-strong-parent-school-partnerships',
    excerpt: 'Strategies for fostering effective communication and collaboration between parents and school staff.',
    cover: '/blog/covers/parent-partnerships.jpg',
    authorName: 'Lisa Park',
    publishedAt: '2023-12-28T15:30:00Z',
    updatedAt: '2023-12-28T15:30:00Z',
    status: 'published',
    categories: ['Parent Communication', 'Collaboration'],
    tags: ['parent communication', 'partnerships', 'collaboration'],
    grades: ['Elementary', 'Middle School', 'High School'],
    contentMDX: 'Strong parent-school partnerships are essential for student success...',
    seo: {
      title: 'Building Strong Parent-School Partnerships',
      description: 'Strategies for fostering effective communication and collaboration between parents and school staff.',
    },
    featured: false,
  },
  {
    postId: '6',
    title: 'Career Guidance in the Digital Age',
    slug: 'career-guidance-digital-age',
    excerpt: 'Modern approaches to career counseling that incorporate technology and current job market trends.',
    cover: '/blog/covers/career-guidance.jpg',
    authorName: 'Robert Williams',
    publishedAt: '2023-12-25T11:00:00Z',
    updatedAt: '2023-12-25T11:00:00Z',
    status: 'published',
    categories: ['Career Guidance', 'Technology'],
    tags: ['career guidance', 'technology', 'job market'],
    grades: ['High School'],
    contentMDX: 'Career guidance has evolved significantly in the digital age...',
    seo: {
      title: 'Career Guidance in the Digital Age',
      description: 'Modern approaches to career counseling that incorporate technology and current job market trends.',
    },
    featured: false,
  },
];

export default function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');

  useEffect(() => {
    // Simulate API call
    const fetchPosts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts(mockBlogPosts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some((tag: any) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || 
      post.categories.includes(selectedCategory);
    
    const matchesGrade = !selectedGrade || 
      post.grades.includes(selectedGrade);

    return matchesSearch && matchesCategory && matchesGrade;
  });

  const categories = Array.from(new Set(posts.flatMap(post => post.categories)));
  const grades = Array.from(new Set(posts.flatMap(post => post.grades)));

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 h-48 bg-gray-200 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"></div>
              <div className="md:w-2/3 p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4 w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-nyasc-gray-400" />
            <input
              type="text"
              placeholder="Search blog posts..."
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
          <p className="text-sm text-nyasc-gray-600">
            Showing {filteredPosts.length} of {posts.length} posts
          </p>
          {(searchQuery || selectedCategory || selectedGrade) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
                setSelectedGrade('');
              }}
              className="text-sm text-nyasc-blue-600 hover:text-nyasc-blue-700"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Blog Posts */}
      <div className="space-y-8">
        {filteredPosts.map((post, index) => (
          <motion.article
            key={post.postId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="card-hover overflow-hidden"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <div className="aspect-video md:aspect-square bg-gradient-to-br from-nyasc-blue-500 to-nyasc-blue-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white">
                        {post.categories[0]}
                      </span>
                    </div>
                    {post.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-nyasc-yellow-500 text-nyasc-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="md:w-2/3 p-6">
                  <h2 className="heading-4 mb-3 group-hover:text-nyasc-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="body-regular text-nyasc-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags?.slice(0, 3).map((tag: any) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-nyasc-gray-100 text-nyasc-gray-600 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-nyasc-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.authorName}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {calculateReadingTime(post.contentMDX || '')} min read
                      </div>
                    </div>
                    
                    <div className="flex items-center text-nyasc-blue-600 group-hover:text-nyasc-blue-700">
                      Read more
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-nyasc-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="heading-4 mb-2">No posts found</h3>
          <p className="text-nyasc-gray-600 mb-4">
            Try adjusting your search terms or filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
              setSelectedGrade('');
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
