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
              <Link href="/shop" className="text-gray-700 hover:text-blue-600">Digital Resources</Link>
              <Link href="/merch" className="text-gray-700 hover:text-blue-600">Merchandise</Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600">Blog</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
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
            Hey friend! 💙
          </h2>
          <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
            <h3 className="text-lg font-bold">✅ WEBHOOK TEST - {new Date().toISOString()}</h3>
            <p>If you see this GREEN box, the webhook is working!</p>
            <p>Commit: {Math.random().toString(36).substr(2, 9)}</p>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            I see you there, juggling 500 things at once, trying to be everything to everyone. 
            Middle school is wild, right? Let me share what I've learned along the way - 
            the real stuff that actually works when you're in the thick of it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4">
              Check Out My Resources
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Read My Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why I'm here</h3>
            <p className="text-lg text-gray-600">Because I've been exactly where you are - overwhelmed, under-resourced, but still showing up every day for these amazing kids</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-3">💙</span>
                  I Get It
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  No corporate speak here. Just real talk about what actually works when you're dealing with 13-year-olds having existential crises over their Instagram likes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-3">☕</span>
                  Time-Saving Magic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Print, copy, done. Because I know you're already running on coffee and good intentions - you don't need more work.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl mr-3">🤝</span>
                  Middle School Reality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  These kids are simultaneously 8 and 18, and everything I create respects that beautiful chaos.
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
            <h3 className="text-3xl font-bold text-gray-900 mb-4">My go-to resources</h3>
            <p className="text-lg text-gray-600">The ones I actually use in my own office - no fluff, just results</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-6xl">🧠</span>
              </div>
              <CardHeader>
                <CardTitle>SEL Toolkit for Middle School</CardTitle>
                <CardDescription>Because these kids are navigating hormones AND homework - they need different tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">$29.99</span>
                  <Badge variant="secondary">Middle School</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-6xl">💼</span>
              </div>
              <CardHeader>
                <CardTitle>Career Exploration for Middle School</CardTitle>
                <CardDescription>When they're still deciding between astronaut and YouTuber - let's help them explore both</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">$19.99</span>
                  <Badge variant="secondary">Middle School</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                <span className="text-6xl">🧘</span>
              </div>
              <CardHeader>
                <CardTitle>Mindfulness for Middle Schoolers</CardTitle>
                <CardDescription>Because "just breathe" doesn't work when they're having a meltdown over a broken Snapchat streak</CardDescription>
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
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What my counselor friends are saying</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  "OMG, finally! Someone who gets that middle schoolers aren't just big elementary kids. These resources actually work with my students instead of making them roll their eyes."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">SJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah J.</p>
                    <p className="text-sm text-gray-500">Middle School Counselor</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  "I was skeptical at first, but these activities actually get my students talking. No more awkward silences or 'this is boring' comments. Game changer!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">MC</span>
                  </div>
                  <div>
                    <p className="font-semibold">Maria C.</p>
                    <p className="text-sm text-gray-500">Middle School Counselor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          </div>
        </section>
        
      {/* Merchandise Section */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Show your counselor pride</h3>
            <p className="text-lg text-gray-600">Custom merchandise designed just for you</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <span className="text-6xl">👕</span>
              </div>
              <CardHeader>
                <CardTitle>Counselor T-Shirts</CardTitle>
                <CardDescription>Comfortable tees with counselor pride</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">$24.99</span>
                  <Badge variant="secondary">Apparel</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-green-400 flex items-center justify-center">
                <span className="text-6xl">☕</span>
              </div>
              <CardHeader>
                <CardTitle>Counselor Mugs</CardTitle>
                <CardDescription>Perfect for your morning coffee</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">$19.99</span>
                  <Badge variant="secondary">Drinkware</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
                <span className="text-6xl">🎒</span>
              </div>
              <CardHeader>
                <CardTitle>Counselor Bags</CardTitle>
                <CardDescription>Carry your resources in style</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">$34.99</span>
                  <Badge variant="secondary">Accessories</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/merch">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Shop All Merchandise
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Let's be friends</h3>
          <p className="text-xl text-blue-100 mb-8">Get my latest resources and the real stories behind them - the good, the messy, and the "what was I thinking" moments</p>
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
              <p className="text-gray-400">Real talk for real counselors who are doing their best</p>
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