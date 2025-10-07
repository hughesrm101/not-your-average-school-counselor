import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function MerchPage() {

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
              <Link href="/merch" className="text-blue-600 font-medium">Merchandise</Link>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600">Blog</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Counselor Merch 💙</h1>
          <p className="text-lg text-gray-600">
            Show your counselor pride with these custom-designed items. 
            Perfect for your office, classroom, or just because you're awesome!
          </p>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Merchandise Coming Soon!</h3>
          <p className="text-blue-700 mb-4">
            We're working on bringing you custom counselor merchandise. Stay tuned for:
          </p>
          <ul className="text-blue-700 space-y-2">
            <li>• Counselor T-Shirts</li>
            <li>• Coffee Mugs</li>
            <li>• Tote Bags</li>
            <li>• Office Decor</li>
          </ul>
        </div>

        {/* Sample Products */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-64 bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
              <span className="text-6xl">👕</span>
            </div>
            <CardHeader>
              <CardTitle>Counselor T-Shirts</CardTitle>
              <CardDescription>Comfortable tees with counselor pride</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-green-600">$24.99</span>
                <Badge variant="secondary">Apparel</Badge>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-64 bg-gradient-to-r from-blue-400 to-green-400 flex items-center justify-center">
              <span className="text-6xl">☕</span>
            </div>
            <CardHeader>
              <CardTitle>Counselor Mugs</CardTitle>
              <CardDescription>Perfect for your morning coffee</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-green-600">$19.99</span>
                <Badge variant="secondary">Drinkware</Badge>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-64 bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
              <span className="text-6xl">🎒</span>
            </div>
            <CardHeader>
              <CardTitle>Counselor Bags</CardTitle>
              <CardDescription>Carry your resources in style</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-green-600">$34.99</span>
                <Badge variant="secondary">Accessories</Badge>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
