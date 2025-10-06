import { NextResponse } from 'next/server';
import { generateSitemapData } from '@/lib/seo';

// Mock data - in real app, this would come from database
const mockBlogPosts = [
  {
    postId: '1',
    slug: 'building-resilience-students-evidence-based-strategies',
    status: 'published',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    postId: '2',
    slug: 'crisis-intervention-protocols-school-counselors',
    status: 'published',
    updatedAt: '2024-01-10T14:30:00Z',
  },
  {
    postId: '3',
    slug: 'supporting-lgbtq-students-creating-inclusive-environments',
    status: 'published',
    updatedAt: '2024-01-05T09:15:00Z',
  },
];

const mockProducts = [
  {
    productId: '1',
    slug: 'social-emotional-learning-toolkit',
    status: 'active',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    productId: '2',
    slug: 'crisis-intervention-bundle',
    status: 'active',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    productId: '3',
    slug: 'college-readiness-assessment',
    status: 'active',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    productId: '4',
    slug: 'bullying-prevention-activities',
    status: 'active',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export async function GET() {
  try {
    const sitemapData = generateSitemapData(mockBlogPosts as any, mockProducts as any);
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapData.map(item => `  <url>
    <loc>${process.env.NEXTAUTH_URL || 'https://yourdomain.com'}${item.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
