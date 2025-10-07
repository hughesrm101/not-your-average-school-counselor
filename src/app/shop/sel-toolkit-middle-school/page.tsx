import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { CartIcon } from '@/components/cart/CartIcon';
import { NewsletterSignup } from '@/components/newsletter/NewsletterSignup';

export default function SELToolkitPage() {
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
          <span className="text-gray-900">SEL Toolkit for Middle School</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-sm overflow-hidden flex items-center justify-center">
              <span className="text-8xl">🧠</span>
            </div>
            
            {/* Additional Images */}
            <div className="grid grid-cols-4 gap-4">
              <div className="aspect-square bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-2xl">💙</span>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">Middle School</Badge>
                <Badge variant="outline">SEL</Badge>
                <Badge variant="outline">Activities</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">SEL Toolkit for Middle School</h1>
              <p className="text-3xl font-bold text-green-600 mb-6">$29.99</p>
            </div>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-600 mb-6">
                The most comprehensive social-emotional learning toolkit designed specifically for middle school students. 
                These aren't your typical "feelings" activities - they're real tools that actually work with 11-14 year olds 
                who are navigating hormones, social media, and the awkwardness of growing up.
              </p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Included:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">50+ ready-to-use SEL activities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Teacher guides with step-by-step instructions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Student worksheets (printable PDFs)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Assessment rubrics and tracking sheets</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Parent communication templates</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-600">Digital versions for remote learning</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Perfect For:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">Individual counseling sessions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">Small group interventions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">Classroom SEL lessons</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">Advisory period activities</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="border-t pt-6">
              <AddToCartButton 
                product={{
                  id: "sel-toolkit",
                  name: "SEL Toolkit for Middle School",
                  description: "Comprehensive social-emotional learning activities designed specifically for middle school students",
                  price: 29.99,
                  category: "digital" as const,
                  type: "resource" as const,
                  status: "active" as const,
                  images: [],
                  tags: ["sel", "middle-school", "social-emotional"],
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

        {/* Detailed Description */}
        <section className="mt-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why This Toolkit Actually Works</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Real Middle School Problems</h3>
                <p className="text-gray-600 mb-4">
                  These activities address the actual issues middle schoolers face: social media drama, 
                  friend group conflicts, academic pressure, and the constant comparison to peers.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• "When My Best Friend Starts Hanging Out With Someone Else"</li>
                  <li>• "Dealing With Mean Comments Online"</li>
                  <li>• "Feeling Left Out at Lunch"</li>
                  <li>• "Managing Test Anxiety"</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Evidence-Based Strategies</h3>
                <p className="text-gray-600 mb-4">
                  Every activity is grounded in research and tested in real middle school settings. 
                  No fluff, no corporate speak - just strategies that actually work.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Cognitive Behavioral Therapy techniques</li>
                  <li>• Mindfulness and breathing exercises</li>
                  <li>• Social skills building activities</li>
                  <li>• Emotional regulation strategies</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Counselors Are Saying</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  "Finally! Activities that don't make my middle schoolers roll their eyes. 
                  These actually get them talking and thinking about their emotions in a real way."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">SJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah J.</p>
                    <p className="text-sm text-gray-500">Middle School Counselor, Texas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  "I've been using these activities for 6 months and my students actually ask for them. 
                  The conflict resolution activities have been game-changers for our school."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">MC</span>
                  </div>
                  <div>
                    <p className="font-semibold">Maria C.</p>
                    <p className="text-sm text-gray-500">Middle School Counselor, California</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <Link href="/shop/career-exploration-middle-school">
                <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-4xl">💼</span>
                </div>
              </Link>
              <CardHeader>
                <CardTitle>
                  <Link href="/shop/career-exploration-middle-school" className="hover:text-blue-600">
                    Career Exploration Toolkit
                  </Link>
                </CardTitle>
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
              <Link href="/shop/mindfulness-middle-school">
                <div className="h-48 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                  <span className="text-4xl">🧘</span>
                </div>
              </Link>
              <CardHeader>
                <CardTitle>
                  <Link href="/shop/mindfulness-middle-school" className="hover:text-blue-600">
                    Mindfulness for Middle Schoolers
                  </Link>
                </CardTitle>
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
              <Link href="/shop/conflict-resolution-middle-school">
                <div className="h-48 bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center">
                  <span className="text-4xl">🤝</span>
                </div>
              </Link>
              <CardHeader>
                <CardTitle>
                  <Link href="/shop/conflict-resolution-middle-school" className="hover:text-blue-600">
                    Conflict Resolution Toolkit
                  </Link>
                </CardTitle>
                <CardDescription>Teach peaceful conflict resolution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-green-600">$27.99</span>
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
