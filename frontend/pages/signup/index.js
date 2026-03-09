import { useState } from 'react';
import Link from 'next/link';
import { BACKEND_URL as backend_url } from '@/config/env.js';
import { useRouter } from 'next/router';
import Navbar from '@/comps/navbar';

export default function Signup() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    companyEmail: '',
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
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = 'Company email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
      newErrors.companyEmail = 'Please enter a valid company email';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const saveLoggedInUserToLocalStorage = (userString) => {
    localStorage.setItem("loggedInUser", userString);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      
      fetch(`${backend_url}/api/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // include cookies in the request
      })
      .then(res => res.json()) // parse JSON
      .then(data => {
        if (data.success) {
          setSuccessMessage(data.message);
          setErrorMessage('');
          setFormData({
            fullName: '',
            companyName: '',
            companyEmail: '',
            password: '',
            confirmPassword: '',
          });
          saveLoggedInUserToLocalStorage(data.details); // JSON string
          setTimeout(() => {
            router.push('/dashboard');
          }, 1000);
        } else {
          setSuccessMessage('');
          setErrorMessage(data.message);
          setErrors(JSON.parse(data.details).formErrors || {});
        }
      })
      .catch(err => {
        console.error('Signup error:', err);
      });

      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar />

      {/* Signup Form Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <div className="max-w-md mx-auto relative">
          {/* Decorative gradient background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          </div>

          {/* Form Container */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-800 backdrop-blur-sm p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-cyan-300">
                Create Account
              </h1>
              <p className="text-slate-400">Join KnowBaseAI today</p>
            </div>

            {/* center text for error and success message */}
            {(
              !!errorMessage ?
              <div className='text-center mb-0.5 text-red-500 text-sm'>
                {errorMessage}
              </div>
              : !!successMessage ?
              <div className='text-center mb-0.5 text-green-500 text-sm'>
                {successMessage}
              </div>
              : null
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                className="cursor-pointer w-full px-4 py-3 mt-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 active:scale-95"
              >
                Create Account
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-slate-400 text-sm mt-6">
              Already have an account? <Link href="/login" className="text-blue-400 hover:text-blue-300">Log in</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
