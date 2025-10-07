export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Digital Resources</h1>
        <p className="text-lg text-gray-600 mb-8">
          Coming soon! We're working on bringing you the best digital resources for school counselors.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">What's Coming</h3>
          <ul className="text-blue-700 space-y-2">
            <li>• SEL Toolkits for Middle School</li>
            <li>• Career Exploration Activities</li>
            <li>• Mindfulness Resources</li>
            <li>• Crisis Intervention Guides</li>
          </ul>
        </div>
      </div>
    </div>
  );
}