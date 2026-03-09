import Navbar from '@/comps/navbar';
import Link from 'next/link';

export default function Home() {

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar/>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center relative">
          {/* Enhanced decorative gradient background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-cyan-300">
            KnowBaseAI
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-300 mb-16 max-w-2xl mx-auto leading-relaxed">
            AI Knowledge Assistant for your internal documents
          </p>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            <div className="p-8 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
              <div className="w-12 h-12 rounded-lg bg-blue-600/20 group-hover:bg-blue-600/30 transition-colors duration-300 mb-4 mx-auto"></div>
              <p className="text-slate-200 font-medium">Makes onboarding easier</p>
            </div>
            <div className="p-8 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group">
              <div className="w-12 h-12 rounded-lg bg-cyan-600/20 group-hover:bg-cyan-600/30 transition-colors duration-300 mb-4 mx-auto"></div>
              <p className="text-slate-200 font-medium">Makes understanding docs easier</p>
            </div>
            <div className="p-8 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
              <div className="w-12 h-12 rounded-lg bg-blue-600/20 group-hover:bg-blue-600/30 transition-colors duration-300 mb-4 mx-auto"></div>
              <p className="text-slate-200 font-medium">Instant answers from company knowledge</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95 inline-block text-center">
              Sign Up
            </Link>
            <Link href="/login" className="px-8 py-4 border-2 border-slate-600 text-white font-semibold rounded-lg hover:border-slate-400 hover:bg-slate-900/50 transition-all duration-300 active:scale-95 inline-block text-center">
              Log In
            </Link>
          </div>
        </div>
      </main>

    </div>
  )
}
