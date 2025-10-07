import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { DatabaseService } from '@/lib/db/dynamo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { CartIcon } from '@/components/cart/CartIcon';
import { NewsletterSignup } from '@/components/newsletter/NewsletterSignup';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await DatabaseService.getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    notFound();
  }

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
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg shadow-sm overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-6xl">📚</span>
                </div>
              )}
            </div>
            
            {/* Additional Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1, 5).map((image, index) => (
                  <div key={index} className="aspect-square bg-white rounded-lg shadow-sm overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 2}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                {product.tags && product.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-green-600 mb-6">${product.price.toFixed(2)}</p>
            </div>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-600 mb-6">{product.description}</p>
              

            </div>

            {/* Add to Cart */}
            <div className="border-t pt-6">
              <AddToCartButton 
                product={product}
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

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* This would be populated with related products */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-4xl">💼</span>
              </div>
              <CardHeader>
                <CardTitle>Career Exploration Toolkit</CardTitle>
                <CardDescription>Help students discover their future paths</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-green-600">$19.99</span>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                <span className="text-4xl">🧘</span>
              </div>
              <CardHeader>
                <CardTitle>Mindfulness Activities</CardTitle>
                <CardDescription>Calm strategies for stressed students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-green-600">$24.99</span>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
                <span className="text-4xl">🎯</span>
              </div>
              <CardHeader>
                <CardTitle>Goal Setting Workshop</CardTitle>
                <CardDescription>Help students set and achieve goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-green-600">$29.99</span>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16">
          <NewsletterSignup 
            title="Get More Resources Like This"
            description="Join our community and get early access to new resources, plus exclusive tips and strategies."
            source="product-page"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-500"
          />
        </section>
      </div>
    </div>
  );
}
