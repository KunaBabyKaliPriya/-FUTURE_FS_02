import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-600">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">MiniCRM</span>
            </div>
            <div className="flex gap-4">
              <Link to="/login" className="text-white hover:text-gray-200 px-4 py-2 transition">
                Login
              </Link>
              <Link to="/login" className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Manage Your Leads
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
              Effortlessly
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Track, manage, and convert your leads into customers with our powerful CRM solution.
          </p>
          <Link
            to="/login"
            className="inline-block bg-gradient-to-r from-yellow-400 to-pink-400 text-gray-900 font-semibold px-8 py-3 rounded-lg hover:from-yellow-500 hover:to-pink-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Start Free Trial
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">Track Leads</h3>
            <p className="text-gray-200">Monitor all your leads in one centralized dashboard.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-2">Convert More</h3>
            <p className="text-gray-200">Increase conversion rates with smart follow-ups.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold text-white mb-2">Analytics</h3>
            <p className="text-gray-200">Get insights into your sales performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}