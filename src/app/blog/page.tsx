export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Counselor Blog</h1>
        <p className="text-lg text-gray-600 mb-8">
          Real stories, real strategies, real talk about middle school counseling.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Coming Soon</h3>
          <ul className="text-green-700 space-y-2">
            <li>• "When 13-Year-Olds Have Existential Crises"</li>
            <li>• "The Art of Talking to Middle Schoolers"</li>
            <li>• "Why 'Just Breathe' Doesn't Work"</li>
            <li>• "Coffee, Counseling, and Chaos"</li>
          </ul>
        </div>
      </div>
    </div>
  );
}