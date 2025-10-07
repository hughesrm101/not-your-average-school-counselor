import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
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
              <Link href="/blog" className="text-blue-600 font-medium">Blog</Link>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Counselor Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories, real strategies, real talk about middle school counseling. 
            No corporate speak, just the messy, beautiful truth about working with these amazing kids.
          </p>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-green-900 mb-4">📝 Blog Coming Soon!</h3>
            <p className="text-lg text-green-700 mb-6">
              I'm working on sharing the real stories behind the resources - 
              the good, the messy, and the "what was I thinking" moments.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Real Talk Posts</h4>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• "When 13-Year-Olds Have Existential Crises"</li>
                  <li>• "The Art of Talking to Middle Schoolers"</li>
                  <li>• "Why 'Just Breathe' Doesn't Work"</li>
                  <li>• "Coffee, Counseling, and Chaos"</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3">Strategy Posts</h4>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• "Building Trust with Reluctant Students"</li>
                  <li>• "Managing Crisis Situations"</li>
                  <li>• "Working with Difficult Parents"</li>
                  <li>• "Self-Care for Counselors"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-green-600 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Get Blog Updates</h3>
          <p className="text-green-100 mb-6">
            Be the first to read new posts and get exclusive insights 
            from the front lines of middle school counseling.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-green-300"
            />
            <Button className="bg-white text-green-600 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}