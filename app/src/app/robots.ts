import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/auth/',
        '/account/',
        '/_next/',
        '/private/',
        '/temp/',
        '/test/',
      ],
    },
    sitemap: 'https://nyasc-counselor.com/sitemap.xml',
    host: 'https://nyasc-counselor.com',
  }
}
