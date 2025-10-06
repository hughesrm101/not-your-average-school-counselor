import { DefaultSeoProps, NextSeoProps } from 'next-seo';
import { BlogPost, Product, Bundle } from '@/types';

const SITE_URL = process.env.NEXTAUTH_URL || 'https://yourdomain.com';
const SITE_NAME = 'Not Your Average School Counselor';
const SITE_DESCRIPTION = 'Professional resources and tools for school counselors. Digital products, blog posts, and community support for educational professionals.';

// Default SEO configuration
export const defaultSEO: DefaultSeoProps = {
  title: SITE_NAME,
  titleTemplate: `%s | ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
  canonical: SITE_URL,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    handle: '@nyasc',
    site: '@nyasc',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#20556B',
    },
    {
      name: 'msapplication-TileColor',
      content: '#20556B',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: SITE_NAME,
    },
    {
      name: 'application-name',
      content: SITE_NAME,
    },
    {
      name: 'msapplication-tooltip',
      content: SITE_DESCRIPTION,
    },
    {
      name: 'msapplication-starturl',
      content: SITE_URL,
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'icon',
      href: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      rel: 'icon',
      href: '/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
  ],
};

// Home page SEO
export const homeSEO: NextSeoProps = {
  title: 'Professional Resources for School Counselors',
  description: 'Discover digital products, blog posts, and community support designed specifically for school counselors. Enhance your practice with evidence-based resources.',
  canonical: SITE_URL,
  openGraph: {
    title: 'Professional Resources for School Counselors',
    description: 'Discover digital products, blog posts, and community support designed specifically for school counselors. Enhance your practice with evidence-based resources.',
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-home.jpg`,
        width: 1200,
        height: 630,
        alt: 'Not Your Average School Counselor - Professional Resources',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};

// Blog list page SEO
export const blogListSEO: NextSeoProps = {
  title: 'Blog Posts & Articles',
  description: 'Read the latest insights, tips, and strategies for school counselors. Evidence-based articles covering social-emotional learning, crisis intervention, and more.',
  canonical: `${SITE_URL}/blog`,
  openGraph: {
    title: 'Blog Posts & Articles for School Counselors',
    description: 'Read the latest insights, tips, and strategies for school counselors. Evidence-based articles covering social-emotional learning, crisis intervention, and more.',
    url: `${SITE_URL}/blog`,
    images: [
      {
        url: `${SITE_URL}/og-blog.jpg`,
        width: 1200,
        height: 630,
        alt: 'NYASC Blog - School Counselor Resources',
      },
    ],
  },
};

// Blog post SEO
export function getBlogPostSEO(post: BlogPost): NextSeoProps {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.excerpt;
  const image = post.seo?.ogImage || post.cover || `${SITE_URL}/og-blog.jpg`;

  return {
    title,
    description,
    canonical: post.seo?.canonical || url,
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      article: {
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        authors: [post.authorName],
        tags: post.tags,
        section: post.categories[0],
      },
    },
    twitter: {
      cardType: 'summary_large_image',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: post.seo?.keywords?.join(', ') || post.tags?.join(', ') || '',
      },
      {
        name: 'author',
        content: post.authorName,
      },
      {
        name: 'article:published_time',
        content: post.publishedAt || '',
      },
      {
        name: 'article:modified_time',
        content: post.updatedAt || '',
      },
      {
        name: 'article:section',
        content: post.categories[0] || '',
      },
      {
        name: 'article:tag',
        content: post.tags?.join(', ') || '',
      },
    ],
  };
}

// Shop page SEO
export const shopSEO: NextSeoProps = {
  title: 'Digital Products for School Counselors',
  description: 'Browse our collection of digital products designed for school counselors. Worksheets, activities, assessments, and resources for every grade level.',
  canonical: `${SITE_URL}/shop`,
  openGraph: {
    title: 'Digital Products for School Counselors',
    description: 'Browse our collection of digital products designed for school counselors. Worksheets, activities, assessments, and resources for every grade level.',
    url: `${SITE_URL}/shop`,
    images: [
      {
        url: `${SITE_URL}/og-shop.jpg`,
        width: 1200,
        height: 630,
        alt: 'NYASC Shop - Digital Products',
      },
    ],
  },
};

// Product SEO
export function getProductSEO(product: Product | Bundle): NextSeoProps {
  const url = `${SITE_URL}/shop/${product.slug}`;
  const title = product.seo?.title || product.title;
  const description = product.seo?.description || product.description;
  const image = product.seo?.ogImage || product.cover || `${SITE_URL}/og-product.jpg`;
  const price = 'isBundle' in product ? (product as any).bundlePrice : (product as any).price;

  return {
    title,
    description,
    canonical: product.seo?.canonical || url,
    openGraph: {
      type: 'product',
      title,
      description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: product.seo?.keywords?.join(', ') || product.tags?.join(', ') || '',
      },
      {
        name: 'product:price:amount',
        content: price.toString(),
      },
      {
        name: 'product:price:currency',
        content: 'USD',
      },
      {
        name: 'product:availability',
        content: product.status === 'active' ? 'in stock' : 'out of stock',
      },
      {
        name: 'product:condition',
        content: 'new',
      },
      {
        name: 'product:brand',
        content: SITE_NAME,
      },
      {
        name: 'product:category',
        content: product.categories[0] || 'Educational Resources',
      },
    ],
  };
}

// Account page SEO
export const accountSEO: NextSeoProps = {
  title: 'My Account',
  description: 'Manage your account, view orders, download products, and update preferences.',
  canonical: `${SITE_URL}/account`,
  noindex: true,
  nofollow: true,
};

// Admin page SEO
export const adminSEO: NextSeoProps = {
  title: 'Admin Dashboard',
  description: 'Administrative dashboard for managing content, products, and users.',
  canonical: `${SITE_URL}/admin`,
  noindex: true,
  nofollow: true,
};

// Legal pages SEO
export const legalSEO = {
  privacy: {
    title: 'Privacy Policy',
    description: 'Learn how we collect, use, and protect your personal information.',
    canonical: `${SITE_URL}/legal/privacy`,
  },
  terms: {
    title: 'Terms of Service',
    description: 'Read our terms of service and user agreement.',
    canonical: `${SITE_URL}/legal/terms`,
  },
  refund: {
    title: 'Refund Policy',
    description: 'Our refund policy for digital products and services.',
    canonical: `${SITE_URL}/legal/refund`,
  },
};

// Generate JSON-LD structured data
export function generateBlogPostStructuredData(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.cover,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(', '),
    articleSection: post.categories[0],
    wordCount: post.contentMDX?.split(' ').length || 0,
  };
}

export function generateProductStructuredData(product: Product | Bundle) {
  const price = 'isBundle' in product ? (product as any).bundlePrice : (product as any).price;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.cover,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'USD',
      availability: product.status === 'active' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
    category: product.categories[0] || 'Educational Resources',
    keywords: product.tags?.join(', '),
    audience: {
      '@type': 'Audience',
      audienceType: 'School Counselors',
    },
  };
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      'https://twitter.com/nyasc',
      'https://facebook.com/nyasc',
      'https://linkedin.com/company/nyasc',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'hi@yourdomain.com',
    },
  };
}

export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Generate sitemap data
export function generateSitemapData(posts: BlogPost[], products: (Product | Bundle)[]) {
  const staticPages = [
    { url: '', priority: 1.0, changefreq: 'weekly' },
    { url: '/blog', priority: 0.9, changefreq: 'daily' },
    { url: '/shop', priority: 0.9, changefreq: 'daily' },
    { url: '/legal/privacy', priority: 0.3, changefreq: 'monthly' },
    { url: '/legal/terms', priority: 0.3, changefreq: 'monthly' },
    { url: '/legal/refund', priority: 0.3, changefreq: 'monthly' },
  ];

  const blogPages = posts
    .filter(post => post.status === 'published')
    .map(post => ({
      url: `/blog/${post.slug}`,
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: post.updatedAt,
    }));

  const productPages = products
    .filter(product => product.status === 'active')
    .map(product => ({
      url: `/shop/${product.slug}`,
      priority: 0.8,
      changefreq: 'weekly',
      lastmod: product.updatedAt,
    }));

  return [...staticPages, ...blogPages, ...productPages];
}

// Generate robots.txt content
export function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin and account pages
Disallow: /admin/
Disallow: /account/
Disallow: /api/

# Allow important pages
Allow: /blog/
Allow: /shop/
Allow: /legal/
`;
}

// Generate meta tags for social sharing
export function generateSocialMetaTags({
  title,
  description,
  image,
  url,
  type = 'website',
}: {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: 'website' | 'article' | 'product';
}) {
  return {
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:url': url,
    'og:type': type,
    'og:site_name': SITE_NAME,
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
    'twitter:site': '@nyasc',
    'twitter:creator': '@nyasc',
  };
}
