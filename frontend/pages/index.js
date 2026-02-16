export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">KnowBaseAI</div>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Log In
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          {/* Decorative gradient background */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-600/10 to-transparent via-slate-950 blur-3xl pointer-events-none"></div>

          {/* Main Heading */}
          <h1 className="text-6xl sm:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            KnowBaseAI
          </h1>

          {/* Description */}
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            AI Knowledge Assistant for your internal documents
          </p>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="p-6 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
              <p className="text-slate-300">Makes onboarding easier</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
              <p className="text-slate-300">Makes understanding docs easier</p>
            </div>
            <div className="p-6 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
              <p className="text-slate-300">Instant answers from company knowledge</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-600/50">
              Sign Up
            </button>
            <button className="px-8 py-3 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-900 transition-colors">
              Log In
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}


