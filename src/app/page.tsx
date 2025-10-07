export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Not Your Average School Counselor
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          Professional resources for school counselors
        </p>
        <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
          Evidence-based resources, lesson plans, and tools designed for real school counselors who need real solutions.
        </p>
        <div className="space-x-4">
          <a 
            href="/shop" 
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            Shop Resources
          </a>
          <a 
            href="/blog" 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors text-lg font-semibold border-2 border-blue-600"
          >
            Read Blog
          </a>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Evidence-Based</h3>
            <p className="text-gray-600">Resources tested in real schools, designed for real impact.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Practical Tools</h3>
            <p className="text-gray-600">Ready-to-use lesson plans, activities, and guides.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Community Driven</h3>
            <p className="text-gray-600">Built by counselors, for counselors. Your voice matters.</p>
          </div>
        </div>
      </div>
    </div>
  )
}