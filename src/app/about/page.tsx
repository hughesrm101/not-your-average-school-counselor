export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About Me</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Hey there! I'm a middle school counselor who's been in the trenches for years. 
            I know what it's like to juggle 500 things at once while trying to be everything 
            to everyone - especially those amazing, chaotic, beautiful middle schoolers.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            I created this space because I was tired of resources that looked good on Pinterest 
            but flopped in real life. These kids are simultaneously 8 and 18, and they need 
            different approaches than what works for elementary or high school students.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Everything here is tested in real schools with real kids. No fluff, no corporate speak, 
            just the real stuff that actually works when you're in the thick of it.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">My Mission</h3>
            <p className="text-blue-700">
              To give you the tools and support you need to make a real difference in your students' lives, 
              without burning yourself out in the process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
