import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { CartIcon } from '@/components/cart/CartIcon';
import { NewsletterSignup } from '@/components/newsletter/NewsletterSignup';

export default function CareerExplorationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Not Your Average School Counselor
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/shop" className="text-gray-700 hover:text-blue-600">Digital Resources</Link>
              <Link href="/merch" className="text-gray-700 hover:text-blue-600">Merchandise</Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600">Blog</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <CartIcon />
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">Sign In</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-blue-600">Digital Resources</Link>
          <span>/</span>
          <span className="text-gray-900">Career Exploration Toolkit</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-sm overflow-hidden flex items-center justify-center">
              <span className="text-8xl">💼</span>
            </div>
            
            {/* Additional Images */}
            <div className="grid grid-cols-4 gap-4">
              <div className="aspect-square bg-gradient-to-br from-green-300 to-green-500 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-green-300 to-green-500 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-green-300 to-green-500 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-green-300 to-green-500 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">Middle School</Badge>
                <Badge variant="outline">Career</Badge>
                <Badge variant="outline">Exploration</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Career Exploration Toolkit</h1>
              <p className="text-3xl font-bold text-green-600 mb-6">$19.99</p>
            </div>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-600 mb-6">
                Help your middle schoolers discover their interests and explore future career paths. 
                This toolkit goes beyond the typical "what do you want to be when you grow up" question 
                and actually helps students understand their strengths, interests, and values.
              </p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Included:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Interest inventory assessments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Career pathway exploration activities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Skills assessment worksheets</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Values clarification exercises</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Career research templates</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Parent communication guides</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Perfect For:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">Individual career counseling sessions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">Career exploration workshops</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">Advisory period activities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">Parent-student conferences</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="border-t pt-6">
              <AddToCartButton 
                product={{
                  id: "career-exploration",
                  name: "Career Exploration Toolkit",
                  description: "Help students discover their interests and explore future career paths",
                  price: 19.99,
                  category: "digital" as const,
                  type: "resource" as const,
                  status: "active" as const,
                  images: [],
                  tags: ["career", "middle-school", "exploration"],
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 text-lg font-semibold"
              />
              <p className="text-sm text-gray-500 mt-2 text-center">
                Instant download • Lifetime access • No expiration
              </p>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <p className="text-sm text-gray-600">Instant Download</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔄</div>
                <p className="text-sm text-gray-600">Free Updates</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">💬</div>
                <p className="text-sm text-gray-600">Support Included</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <section className="mt-16">
          <NewsletterSignup 
            title="Get More Resources Like This"
            description="Join our community and get early access to new resources, plus exclusive tips and strategies."
            source="product-page"
            className="bg-gradient-to-r from-green-600 to-emerald-600 border-green-500"
          />
        </section>
      </div>
    </div>
  );
}
