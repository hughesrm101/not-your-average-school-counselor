import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-advanced'

const inter = Inter({ subsets: ['latin'] })

export const metadata = generateSEOMetadata({
  title: 'Not Your Average School Counselor - Real Resources for Real Counselors',
  description: 'Practical school counseling resources, lesson plans, and tools that actually work. No fluff, just real solutions for middle school counselors.',
  keywords: ['school counselor resources', 'middle school counseling', 'counselor lesson plans', 'SEL activities'],
  url: '/',
  type: 'website'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}