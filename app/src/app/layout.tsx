import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { seoConfig, generatePerformanceMeta } from '@/lib/seo-advanced'
import { Analytics } from '@/components/analytics/Analytics'
import { CookieConsent } from '@/components/legal/CookieConsent'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.defaultDescription,
  keywords: seoConfig.defaultKeywords,
  authors: [{ name: seoConfig.author }],
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
    type: 'website',
    locale: seoConfig.locale,
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [
      {
        url: `${seoConfig.siteUrl}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'Not Your Average School Counselor - Professional Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [`${seoConfig.siteUrl}/og-default.jpg`],
    creator: '@nyasc_counselor',
    site: '@nyasc_counselor',
  },
  verification: seoConfig.verification,
  alternates: {
    canonical: seoConfig.siteUrl,
  },
  other: generatePerformanceMeta(),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Critical resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#00bcd4" />
        <meta name="msapplication-TileColor" content="#00bcd4" />
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  )
}