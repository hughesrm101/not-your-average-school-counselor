'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
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
];

export default function FeaturedBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="text-center">
        <h2 className="heading-2 mb-4">Latest from Our Blog</h2>
        <p className="body-large text-nyasc-gray-600 mb-12">
          Stay updated with the latest insights and strategies for school counselors.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4 w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const featuredPost = posts.find(post => post.featured);
  const otherPosts = posts.filter(post => !post.featured).slice(0, 2);

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="heading-2 mb-4">Latest from Our Blog</h2>
        <p className="body-large text-nyasc-gray-600 max-w-3xl mx-auto mb-8">
          Stay updated with the latest insights, strategies, and best practices for school counselors.
        </p>
        <Link href="/blog" className="inline-flex items-center text-nyasc-blue-600 hover:text-nyasc-blue-700 font-medium">
          View All Posts
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className="card-hover overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-nyasc-blue-500 to-nyasc-blue-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2 text-white/80 text-sm mb-2">
                      <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                        {featuredPost.categories[0]}
                      </span>
                      <span>Featured</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-nyasc-yellow-300 transition-colors">
                      {featuredPost.title}
                    </h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="body-regular text-nyasc-gray-600 mb-4">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-nyasc-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {featuredPost.authorName}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(featuredPost.publishedAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {calculateReadingTime(featuredPost.contentMDX || '')} min read
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Other posts */}
        <div className="space-y-6">
          {otherPosts.map((post, index) => (
            <motion.div
              key={post.postId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="card-hover">
                  <div className="aspect-video bg-gradient-to-br from-nyasc-yellow-400 to-nyasc-yellow-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="bg-white/20 px-2 py-1 rounded-full text-xs text-white">
                        {post.categories[0]}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-nyasc-gray-900 mb-2 group-hover:text-nyasc-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-nyasc-gray-600 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-nyasc-gray-500">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {post.authorName}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(post.publishedAt)}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <Link href="/blog">
          <button className="btn-primary">
            Read More Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
