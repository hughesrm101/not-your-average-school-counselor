import { Metadata } from 'next';

// Advanced SEO configuration for top 1% performance
export const seoConfig = {
  siteName: 'Not Your Average School Counselor',
  siteUrl: 'https://nyasc-counselor.com',
  defaultTitle: 'Not Your Average School Counselor - Professional Resources',
  titleTemplate: '%s | NYASC',
  defaultDescription: 'Professional school counselor resources, lesson plans, and tools. Evidence-based materials for elementary, middle, and high school counselors.',
  defaultKeywords: [
    'school counselor',
    'counseling resources',
    'SEL activities',
    'lesson plans',
    'counseling worksheets',
    'mental health resources',
    'student support',
    'counseling tools',
    'educational resources',
    'school psychology'
  ],
  author: 'Not Your Average School Counselor',
  publisher: 'NYASC',
  locale: 'en_US',
  type: 'website',
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
    yandex: process.env.YANDEX_VERIFICATION_CODE,
    yahoo: process.env.YAHOO_VERIFICATION_CODE,
  },
};

// Generate advanced metadata for pages
export function generateAdvancedMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
}: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}): Metadata {
  const fullTitle = title.includes('|') ? title : `${title} | ${seoConfig.siteName}`;
  const fullUrl = url ? `${seoConfig.siteUrl}${url}` : seoConfig.siteUrl;
  const fullImage = image ? `${seoConfig.siteUrl}${image}` : `${seoConfig.siteUrl}/og-default.jpg`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: [...seoConfig.defaultKeywords, ...keywords],
    authors: [{ name: author || seoConfig.author }],
    creator: seoConfig.author,
    publisher: seoConfig.publisher,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: seoConfig.locale,
      url: fullUrl,
      siteName: seoConfig.siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImage],
      creator: '@nyasc_counselor',
      site: '@nyasc_counselor',
    },
    alternates: {
      canonical: fullUrl,
    },
    verification: seoConfig.verification,
  };

  // Add article-specific metadata
  if (type === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [author || seoConfig.author],
      section,
      tags,
    };
  }

  return metadata;
}

// Generate product schema
export function generateProductSchema(product: {
  name: string;
  description: string;
  price: number;
  images: string[];
  rating?: number;
  reviewCount?: number;
  availability?: string;
  brand?: string;
  category?: string;
  sku?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map(img => `${seoConfig.siteUrl}${img}`),
    brand: {
      '@type': 'Brand',
      name: product.brand || seoConfig.siteName,
    },
    category: product.category,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.availability || 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: seoConfig.siteName,
      },
    },
    ...(product.rating && product.reviewCount && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount,
      },
    }),
  };
}

// Generate article schema
export function generateArticleSchema(article: {
  title: string;
  description: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
  section?: string;
  tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${seoConfig.siteUrl}/logo.png`,
      },
    },
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    image: article.image ? `${seoConfig.siteUrl}${article.image}` : `${seoConfig.siteUrl}/og-default.jpg`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${seoConfig.siteUrl}/blog/${article.title.toLowerCase().replace(/\s+/g, '-')}`,
    },
    articleSection: article.section,
    keywords: article.tags?.join(', '),
  };
}

// Generate FAQ schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${seoConfig.siteUrl}${crumb.url}`,
    })),
  };
}

// Generate organization schema
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    logo: `${seoConfig.siteUrl}/logo.png`,
    description: seoConfig.defaultDescription,
    sameAs: [
      'https://www.teacherspayteachers.com/Store/Not-Your-Average-School-Counselor',
      'https://www.etsy.com/shop/NotYourAverageSchoolCounselor',
      'https://www.tiktok.com/@notyouraverageschoolcounselor',
      'https://www.instagram.com/notyouraverageschoolcounselor',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'hello@nyasc-counselor.com',
    },
  };
}

// Generate website schema
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    description: seoConfig.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${seoConfig.siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Advanced keyword research data
export const keywordData = {
  primary: [
    { keyword: 'school counselor resources', volume: 2900, difficulty: 45 },
    { keyword: 'counseling lesson plans', volume: 1600, difficulty: 38 },
    { keyword: 'SEL activities for students', volume: 4400, difficulty: 52 },
    { keyword: 'school counselor tools', volume: 880, difficulty: 35 },
    { keyword: 'counseling worksheets', volume: 1300, difficulty: 42 },
  ],
  longTail: [
    { keyword: 'free school counselor resources elementary', volume: 590, difficulty: 28 },
    { keyword: 'social emotional learning activities middle school', volume: 720, difficulty: 31 },
    { keyword: 'counseling lesson plans anxiety depression', volume: 480, difficulty: 25 },
    { keyword: 'school counselor assessment tools forms', volume: 320, difficulty: 22 },
    { keyword: 'SEL worksheets for high school students', volume: 410, difficulty: 26 },
  ],
  local: [
    { keyword: 'school counselor resources california', volume: 120, difficulty: 15 },
    { keyword: 'counseling materials texas', volume: 95, difficulty: 12 },
    { keyword: 'SEL activities florida schools', volume: 85, difficulty: 10 },
  ],
};

// Generate meta tags for performance
export function generatePerformanceMeta() {
  return {
    'X-DNS-Prefetch-Control': 'on',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  };
}

// Core Web Vitals optimization
export const coreWebVitalsConfig = {
  // Image optimization
  imageOptimization: {
    quality: 85,
    format: 'webp',
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  },
  // Font optimization
  fontOptimization: {
    display: 'swap',
    preload: true,
  },
  // Critical resource hints
  resourceHints: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
    { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
  ],
};
