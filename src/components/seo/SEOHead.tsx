'use client';

import Head from 'next/head';
import { generateStructuredData } from '@/lib/seo-advanced';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  structuredData?: any;
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  structuredData
}: SEOHeadProps) {
  const fullTitle = title ? `${title} | Not Your Average School Counselor` : 'Not Your Average School Counselor - Real Resources for Real Counselors';
  const fullDescription = description || 'Practical school counseling resources, lesson plans, and tools that actually work. No fluff, just real solutions for middle school counselors.';
  const fullUrl = url ? `https://nyasc.co${url}` : 'https://nyasc.co';
  const fullImage = image ? `https://nyasc.co${image}` : 'https://nyasc.co/og-image.jpg';

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={[...keywords, 'school counselor resources', 'middle school counseling', 'counselor lesson plans'].join(', ')} />
      <meta name="author" content="Not Your Average School Counselor" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="Not Your Average School Counselor" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:creator" content="@nyascounselor" />
      
      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
    </Head>
  );
}
