import { useState } from 'react';

export default function Home() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyEmail: '',
    companyName: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = 'Company email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
      newErrors.companyEmail = 'Please enter a valid email';
    }
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      setShowSignupModal(false);
      setFormData({
        fullName: '',
        companyEmail: '',
        companyName: '',
        password: '',
        confirmPassword: '',
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Navbar */}
      <nav className="border-b border-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-lg font-bold tracking-wider bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">KnowBaseAI</div>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors duration-200">
              Log In
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-200 shadow-lg hover:shadow-blue-500/30">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

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
            <button onClick={() => setShowSignupModal(true)} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95">
              Sign Up
            </button>
            <button className="px-8 py-4 border-2 border-slate-600 text-white font-semibold rounded-lg hover:border-slate-400 hover:bg-slate-900/50 transition-all duration-300 active:scale-95">
              Log In
            </button>
          </div>
        </div>
      </main>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full border border-slate-800">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <h2 className="text-2xl font-bold">Create Account</h2>
              <button onClick={() => setShowSignupModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg bg-slate-800 border transition-colors ${
                    errors.fullName ? 'border-red-500' : 'border-slate-700 focus:border-blue-500'
                  } text-white placeholder-slate-500 focus:outline-none`}
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              {/* Company Name */}
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-slate-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg bg-slate-800 border transition-colors ${
                    errors.companyName ? 'border-red-500' : 'border-slate-700 focus:border-blue-500'
                  } text-white placeholder-slate-500 focus:outline-none`}
                  placeholder="Acme Inc"
                />
                {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
              </div>

              {/* Company Email */}
              <div>
                <label htmlFor="companyEmail" className="block text-sm font-medium text-slate-300 mb-2">
                  Company Email
                </label>
                <input
                  type="email"
                  id="companyEmail"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg bg-slate-800 border transition-colors ${
                    errors.companyEmail ? 'border-red-500' : 'border-slate-700 focus:border-blue-500'
                  } text-white placeholder-slate-500 focus:outline-none`}
                  placeholder="john@acme.com"
                />
                {errors.companyEmail && <p className="text-red-500 text-sm mt-1">{errors.companyEmail}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg bg-slate-800 border transition-colors ${
                    errors.password ? 'border-red-500' : 'border-slate-700 focus:border-blue-500'
                  } text-white placeholder-slate-500 focus:outline-none`}
                  placeholder="At least 8 characters"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg bg-slate-800 border transition-colors ${
                    errors.confirmPassword ? 'border-red-500' : 'border-slate-700 focus:border-blue-500'
                  } text-white placeholder-slate-500 focus:outline-none`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-3 mt-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 active:scale-95"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
