import { Suspense } from 'react';
import { Metadata } from 'next';
import { blogListSEO } from '@/lib/seo';
import BlogList from '@/components/blog/BlogList';
import BlogFilters from '@/components/blog/BlogFilters';

export const metadata: Metadata = {
  title: blogListSEO.title,
  description: blogListSEO.description,
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <div className="text-center mb-12">
          <h1 className="heading-1 mb-4">Blog & Resources</h1>
          <p className="body-large text-nyasc-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest insights, strategies, and best practices for school counselors. 
            Evidence-based articles covering social-emotional learning, crisis intervention, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div>Loading filters...</div>}>
              <BlogFilters />
            </Suspense>
          </div>

          {/* Blog List */}
          <div className="lg:col-span-3">
            <Suspense fallback={<div>Loading blog posts...</div>}>
              <BlogList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
