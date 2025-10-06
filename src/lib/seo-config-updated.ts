import { Metadata } from 'next';

// Advanced SEO configuration for top 1% performance
export const seoConfig = {
  siteName: 'Not Your Average School Counselor',
  siteUrl: 'https://nyasc.co',
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
