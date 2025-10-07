import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Not Your Average School Counselor</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/shop" className="text-gray-700 hover:text-blue-600">Shop</Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600">Blog</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Sign In</Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Professional Resources for
            <span className="text-blue-600"> School Counselors</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover evidence-based lesson plans, activities, and tools designed specifically for school counselors. 
            Help students thrive with our comprehensive resource library.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4">
              Explore Resources
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              View Blog
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Resources?</h3>
            <p className="text-lg text-gray-600">Evidence-based, practical, and designed by experienced school counselors</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-3">📚</span>
                  Evidence-Based
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All resources are grounded in research and best practices in school counseling.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-3">⚡</span>
                  Ready to Use
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Download and implement immediately. No prep time required.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-3">🎯</span>
                  Grade-Specific
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Resources tailored for elementary, middle, and high school students.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Resources</h3>
            <p className="text-lg text-gray-600">Our most popular and effective tools</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-6xl">🧠</span>
              </div>
              <CardHeader>
                <CardTitle>Social-Emotional Learning Toolkit</CardTitle>
                <CardDescription>Comprehensive SEL resources for elementary students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">$29.99</span>
                  <Badge variant="secondary">Elementary</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-6xl">💼</span>
              </div>
              <CardHeader>
                <CardTitle>Career Exploration Workbook</CardTitle>
                <CardDescription>Interactive workbook for high school career planning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">$19.99</span>
                  <Badge variant="secondary">High School</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                <span className="text-6xl">🧘</span>
              </div>
              <CardHeader>
                <CardTitle>Mindfulness Activities Pack</CardTitle>
                <CardDescription>50 mindfulness activities for middle school students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">$24.99</span>
                  <Badge variant="secondary">Middle School</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What Counselors Say</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  "These resources have transformed my counseling practice. The SEL toolkit is exactly what I needed for my elementary students."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">SJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Elementary School Counselor</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  "The career exploration workbook has been a game-changer for my high school students. Highly recommend!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">MC</span>
                  </div>
                  <div>
                    <p className="font-semibold">Michael Chen</p>
                    <p className="text-sm text-gray-500">High School Counselor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-xl text-blue-100 mb-8">Get the latest resources and tips delivered to your inbox</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300"
            />
            <Button variant="secondary" size="lg">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Not Your Average School Counselor</h4>
              <p className="text-gray-400">Professional resources for school counselors</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/shop">Shop</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/free-resources">Free Resources</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/refund">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Not Your Average School Counselor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}