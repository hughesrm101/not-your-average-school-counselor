import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { CartIcon } from '@/components/cart/CartIcon';
import { NewsletterSignup } from '@/components/newsletter/NewsletterSignup';

export default function ShopPage() {
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
              <Link href="/shop" className="text-blue-600 font-medium">Digital Resources</Link>
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Digital Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional-grade resources designed specifically for middle school counselors. 
            No fluff, just the real stuff that actually works.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* SEL Toolkit */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <Link href="/shop/sel-toolkit-middle-school">
              <div className="h-64 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-6xl">🧠</span>
              </div>
            </Link>
            <CardHeader>
              <CardTitle>
                <Link href="/shop/sel-toolkit-middle-school" className="hover:text-blue-600">
                  SEL Toolkit for Middle School
                </Link>
              </CardTitle>
              <CardDescription>
                Comprehensive social-emotional learning activities designed specifically for middle school students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-green-600">$29.99</span>
                <Badge variant="secondary">Middle School</Badge>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">✓ 50+ Activities</p>
                <p className="text-sm text-gray-600">✓ Ready-to-use worksheets</p>
                <p className="text-sm text-gray-600">✓ Teacher guides included</p>
              </div>
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
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      />
            </CardContent>
          </Card>

          {/* Career Exploration */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <Link href="/shop/career-exploration-middle-school">
              <div className="h-64 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-6xl">💼</span>
              </div>
            </Link>
            <CardHeader>
              <CardTitle>
                <Link href="/shop/career-exploration-middle-school" className="hover:text-blue-600">
                  Career Exploration Toolkit
                </Link>
              </CardTitle>
              <CardDescription>
                Help students discover their interests and explore future career paths
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-green-600">$19.99</span>
                <Badge variant="secondary">Middle School</Badge>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">✓ Interest inventories</p>
                <p className="text-sm text-gray-600">✓ Career pathway activities</p>
                <p className="text-sm text-gray-600">✓ Skills assessment tools</p>
              </div>
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
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      />
            </CardContent>
          </Card>

          {/* Mindfulness Activities */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <Link href="/shop/mindfulness-middle-school">
              <div className="h-64 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                <span className="text-6xl">🧘</span>
              </div>
            </Link>
            <CardHeader>
              <CardTitle>
                <Link href="/shop/mindfulness-middle-school" className="hover:text-blue-600">
                  Mindfulness for Middle Schoolers
                </Link>
              </CardTitle>
              <CardDescription>
                Calm strategies and mindfulness activities for stressed middle school students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-green-600">$24.99</span>
                <Badge variant="secondary">Middle School</Badge>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">✓ Breathing exercises</p>
                <p className="text-sm text-gray-600">✓ Stress management tools</p>
                <p className="text-sm text-gray-600">✓ Guided meditation scripts</p>
              </div>
                      <AddToCartButton 
                        product={{
                          id: "mindfulness",
                          name: "Mindfulness for Middle Schoolers",
                          description: "Calm strategies and mindfulness activities for stressed middle school students",
                          price: 24.99,
                          category: "digital" as const,
                          type: "resource" as const,
                          status: "active" as const,
                          images: [],
                          tags: ["mindfulness", "middle-school", "stress-management"],
                          createdAt: new Date().toISOString(),
                          updatedAt: new Date().toISOString(),
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      />
            </CardContent>
          </Card>

          {/* Conflict Resolution */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <Link href="/shop/conflict-resolution-middle-school">
              <div className="h-64 bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center">
                <span className="text-6xl">🤝</span>
              </div>
            </Link>
            <CardHeader>
              <CardTitle>
                <Link href="/shop/conflict-resolution-middle-school" className="hover:text-blue-600">
                  Conflict Resolution Toolkit
                </Link>
              </CardTitle>
              <CardDescription>
                Teach students how to resolve conflicts peacefully and build better relationships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-green-600">$27.99</span>
                <Badge variant="secondary">Middle School</Badge>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">✓ Role-play scenarios</p>
                <p className="text-sm text-gray-600">✓ Communication strategies</p>
                <p className="text-sm text-gray-600">✓ Peer mediation guides</p>
              </div>
                      <AddToCartButton 
                        product={{
                          id: "conflict-resolution",
                          name: "Conflict Resolution Toolkit",
                          description: "Teach students how to resolve conflicts peacefully and build better relationships",
                          price: 27.99,
                          category: "digital" as const,
                          type: "resource" as const,
                          status: "active" as const,
                          images: [],
                          tags: ["conflict-resolution", "middle-school", "relationships"],
                          createdAt: new Date().toISOString(),
                          updatedAt: new Date().toISOString(),
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      />
            </CardContent>
          </Card>

          {/* Study Skills */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <Link href="/shop/study-skills-middle-school">
              <div className="h-64 bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
                <span className="text-6xl">📚</span>
              </div>
            </Link>
            <CardHeader>
              <CardTitle>
                <Link href="/shop/study-skills-middle-school" className="hover:text-blue-600">
                  Study Skills Mastery
                </Link>
              </CardTitle>
              <CardDescription>
                Help students develop effective study habits and academic success strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-green-600">$22.99</span>
                <Badge variant="secondary">Middle School</Badge>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">✓ Time management tools</p>
                <p className="text-sm text-gray-600">✓ Note-taking strategies</p>
                <p className="text-sm text-gray-600">✓ Test preparation guides</p>
              </div>
                      <AddToCartButton 
                        product={{
                          id: "study-skills",
                          name: "Study Skills Mastery",
                          description: "Help students develop effective study habits and academic success strategies",
                          price: 22.99,
                          category: "digital" as const,
                          type: "resource" as const,
                          status: "active" as const,
                          images: [],
                          tags: ["study-skills", "middle-school", "academic-success"],
                          createdAt: new Date().toISOString(),
                          updatedAt: new Date().toISOString(),
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      />
            </CardContent>
          </Card>

          {/* Goal Setting */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <Link href="/shop/goal-setting-middle-school">
              <div className="h-64 bg-gradient-to-r from-indigo-400 to-indigo-600 flex items-center justify-center">
                <span className="text-6xl">🎯</span>
              </div>
            </Link>
            <CardHeader>
              <CardTitle>
                <Link href="/shop/goal-setting-middle-school" className="hover:text-blue-600">
                  Goal Setting Workshop
                </Link>
              </CardTitle>
              <CardDescription>
                Teach students how to set, track, and achieve meaningful goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-green-600">$26.99</span>
                <Badge variant="secondary">Middle School</Badge>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">✓ SMART goal templates</p>
                <p className="text-sm text-gray-600">✓ Progress tracking tools</p>
                <p className="text-sm text-gray-600">✓ Motivation strategies</p>
              </div>
                      <AddToCartButton 
                        product={{
                          id: "goal-setting",
                          name: "Goal Setting Workshop",
                          description: "Teach students how to set, track, and achieve meaningful goals",
                          price: 26.99,
                          category: "digital" as const,
                          type: "resource" as const,
                          status: "active" as const,
                          images: [],
                          tags: ["goal-setting", "middle-school", "motivation"],
                          createdAt: new Date().toISOString(),
                          updatedAt: new Date().toISOString(),
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      />
            </CardContent>
          </Card>
        </div>

        {/* Newsletter Signup */}
        <NewsletterSignup 
          title="Get More Resources Like This"
          description="Join our community and get early access to new resources, plus exclusive tips and strategies."
          source="shop-page"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-500"
        />
      </div>
    </div>
  );
}