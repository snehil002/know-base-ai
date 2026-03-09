import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";

export default function Navbar ({ params={} }) {
  const authUser = useContext(AuthContext);

  return (
    <nav className="border-b border-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {
            (params.pathname === "/dashboard")
            ? 
            <button
              onClick={params.toggleSidebar}
              className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            :
            <></>
          }
          <Link href="/" className="text-lg font-bold tracking-wider bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            KnowBaseAI
          </Link>
        </div>
        <div className="flex gap-3">
          {
            (authUser) 
            ?
            <>
              <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors duration-200">
                {authUser.companyEmail}
              </button>
              <Link href="/logout" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-red-400 transition-colors duration-200">
                Logout
              </Link>
            </>
            :
            <>
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors duration-200">
                Log In
              </Link>
              <Link href="/signup" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-200 shadow-lg hover:shadow-blue-500/30 inline-block">
                Sign Up
              </Link>
            </>
          }
        </div>
      </div>
    </nav>
  );
}