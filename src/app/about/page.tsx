import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
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
              <Link href="/about" className="text-blue-600 font-medium">About</Link>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hey there! I'm a middle school counselor who's been in the trenches for years. 
            Let me tell you my story and why I created this space for us.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Story */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-600 mb-6">
                I know what it's like to juggle 500 things at once while trying to be everything 
                to everyone - especially those amazing, chaotic, beautiful middle schoolers. 
                They're simultaneously 8 and 18, and they need different approaches than what 
                works for elementary or high school students.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                I created this space because I was tired of resources that looked good on Pinterest 
                but flopped in real life. Everything here is tested in real schools with real kids. 
                No fluff, no corporate speak, just the real stuff that actually works when you're 
                in the thick of it.
              </p>
            </div>
          </div>

          {/* Mission & Values */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">My Mission</h3>
              <p className="text-blue-700">
                To give you the tools and support you need to make a real difference in your students' lives, 
                without burning yourself out in the process.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-900 mb-4">My Values</h3>
              <ul className="text-green-700 space-y-2">
                <li>• Real talk, no corporate speak</li>
                <li>• Resources that actually work</li>
                <li>• Supporting counselor well-being</li>
                <li>• Middle school specific approaches</li>
              </ul>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">Let's Connect!</h3>
            <p className="text-purple-700 mb-6">
              Have questions? Want to share your own stories? I'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Send Me a Message
              </Button>
              <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                Follow My Journey
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
