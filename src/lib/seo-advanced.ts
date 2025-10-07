import { Metadata } from 'next';

// Advanced SEO configuration
export const seoConfig = {
  siteName: 'Not Your Average School Counselor',
  siteUrl: 'https://nyasc.co',
  defaultTitle: 'Not Your Average School Counselor - Real Resources for Real Counselors',
  defaultDescription: 'Practical school counseling resources, lesson plans, and tools that actually work. No fluff, just real solutions for middle school counselors.',
  keywords: [
    'school counselor resources',
    'middle school counseling',
    'counselor lesson plans',
    'SEL activities',
    'school counselor tools',
    'counseling resources',
    'student support',
    'counselor materials',
    'educational resources',
    'school psychology'
  ],
  author: 'Not Your Average School Counselor',
  twitterHandle: '@nyascounselor',
  facebookAppId: 'your-facebook-app-id'
};

// Generate dynamic metadata
export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website'
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${seoConfig.siteName}` : seoConfig.defaultTitle;
  const fullDescription = description || seoConfig.defaultDescription;
  const fullUrl = url ? `${seoConfig.siteUrl}${url}` : seoConfig.siteUrl;
  const fullImage = image ? `${seoConfig.siteUrl}${image}` : `${seoConfig.siteUrl}/og-image.jpg`;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: [...seoConfig.keywords, ...keywords],
    authors: [{ name: seoConfig.author }],
    creator: seoConfig.author,
    publisher: seoConfig.siteName,
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
      type: type as 'website' | 'article',
      locale: 'en_US',
      url: fullUrl,
      title: fullTitle,
      description: fullDescription,
      siteName: seoConfig.siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: seoConfig.twitterHandle,
    },
    alternates: {
      canonical: fullUrl,
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },
  };
}

// Generate structured data for rich snippets
export function generateStructuredData({
  type,
  title,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url,
  price,
  availability
}: {
  type: 'Article' | 'Product' | 'Organization' | 'WebSite';
  title: string;
  description: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  url?: string;
  price?: number;
  availability?: string;
}) {
  const baseUrl = seoConfig.siteUrl;
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image ? `${baseUrl}${image}` : `${baseUrl}/og-image.jpg`;

  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description: description,
    url: fullUrl,
    image: fullImage,
    author: author ? {
      '@type': 'Person',
      name: author
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: seoConfig.siteName,
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`
      }
    }
  };

  if (type === 'Article') {
    return {
      ...baseStructuredData,
      datePublished: datePublished,
      dateModified: dateModified || datePublished,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl
      }
    };
  }

  if (type === 'Product') {
    return {
      ...baseStructuredData,
      '@type': 'Product',
      offers: {
        '@type': 'Offer',
        price: price,
        priceCurrency: 'USD',
        availability: availability || 'https://schema.org/InStock'
      }
    };
  }

  if (type === 'Organization') {
    return {
      ...baseStructuredData,
      '@type': 'Organization',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-555-0123',
        contactType: 'customer service',
        email: 'hello@nyasc.co'
      }
    };
  }

  return baseStructuredData;
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{name: string, url: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${seoConfig.siteUrl}${crumb.url}`
    }))
  };
}

// Generate FAQ structured data
export function generateFAQStructuredData(faqs: Array<{question: string, answer: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}
