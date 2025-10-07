import Link from 'next/link';
import { Button } from '@/components/ui/button';

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

        {/* Coming Soon Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">🚀 Coming Soon!</h3>
            <p className="text-lg text-blue-700 mb-6">
              We're putting the finishing touches on our digital resource library. 
              Everything will be ready for download and immediate use in your office.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">SEL Toolkits</h4>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Social-Emotional Learning activities</li>
                  <li>• Conflict resolution strategies</li>
                  <li>• Peer relationship building</li>
                  <li>• Self-awareness exercises</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Career Exploration</h4>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Interest inventories</li>
                  <li>• Career pathway activities</li>
                  <li>• College prep resources</li>
                  <li>• Skills assessment tools</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-blue-600 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Get Notified When We Launch</h3>
          <p className="text-blue-100 mb-6">
            Be the first to know when our digital resources are ready. 
            Plus, get exclusive early access and special pricing.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Notify Me
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}