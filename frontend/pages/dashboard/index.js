import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('create-users');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
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
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      console.log('[v0] New user created:', formData);
      setFormData({
        fullName: '',
        email: '',
        password: '',
      });
    } else {
      setErrors(newErrors);
    }
  };

  const closeSidebar = () => setSidebarOpen(false);

  const sampleMessages = [
    {
      type: 'user',
      text: 'How do I create a new user in the system?',
      timestamp: '2:30 PM'
    },
    {
      type: 'ai',
      text: 'To create a new user, navigate to the "Create New Users" tab in the Admin Panel. Fill in the required fields: Full Name, Email, and Password (minimum 8 characters). Once you\'ve entered all information, click the "Create User" button to add them to your organization.',
      timestamp: '2:31 PM'
    },
    {
      type: 'user',
      text: 'What are the password requirements?',
      timestamp: '2:32 PM'
    },
    {
      type: 'ai',
      text: 'Passwords must be at least 8 characters long. For security best practices, we recommend using a mix of uppercase letters, lowercase letters, numbers, and special characters. This helps ensure stronger account security.',
      timestamp: '2:33 PM'
    },
    {
      type: 'user',
      text: 'Can I edit user information after creation?',
      timestamp: '2:34 PM'
    },
    {
      type: 'ai',
      text: 'User information management features are coming soon. In the current version, you can create new users through the Admin Panel. For modifying existing user details, please reach out to our support team.',
      timestamp: '2:35 PM'
    }
  ];

  const [chatInput, setChatInput] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) return;

    selectedFiles.forEach((file, index) => {
      console.log('[v0] Uploading file:', file.name);
      setUploadProgress(prev => ({
        ...prev,
        [index]: 0
      }));

      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[index] || 0;
          if (currentProgress >= 100) {
            clearInterval(interval);
            return prev;
          }
          return {
            ...prev,
            [index]: currentProgress + Math.random() * 30
          };
        });
      }, 300);

      setTimeout(() => {
        setUploadProgress(prev => ({
          ...prev,
          [index]: 100
        }));
      }, 2000);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/" className="text-lg font-bold tracking-wider bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              KnowBaseAI
            </Link>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors duration-200">
              Profile
            </button>
            <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-red-400 transition-colors duration-200">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <aside className={`fixed lg:static top-0 left-0 h-screen w-64 bg-slate-900 border-r border-slate-800 z-30 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-xl font-bold">Admin Panel</h2>
          </div>

          <nav className="p-4 space-y-2">
            <button
              onClick={() => {
                setActiveTab('create-users');
                closeSidebar();
              }}
              className={`w-full px-4 py-3 rounded-lg transition-all text-left font-medium ${
                activeTab === 'create-users'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Create New Users
            </button>
            <button
              onClick={() => {
                setActiveTab('chat-ai');
                closeSidebar();
              }}
              className={`w-full px-4 py-3 rounded-lg transition-all text-left font-medium ${
                activeTab === 'chat-ai'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Chat with AI
            </button>
            <button
              onClick={() => {
                setActiveTab('upload-documents');
                closeSidebar();
              }}
              className={`w-full px-4 py-3 rounded-lg transition-all text-left font-medium ${
                activeTab === 'upload-documents'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Upload Documents
            </button>

            {/* Separator */}
            <div className="my-2 border-t border-slate-800"></div>

            {/* Chat Tabs */}
            <button
              onClick={() => {
                setActiveTab('chat-1');
                closeSidebar();
              }}
              className={`w-full px-4 py-3 rounded-lg transition-all text-left font-medium ${
                activeTab === 'chat-1'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Chat #1
            </button>
            <button
              onClick={() => {
                setActiveTab('chat-2');
                closeSidebar();
              }}
              className={`w-full px-4 py-3 rounded-lg transition-all text-left font-medium ${
                activeTab === 'chat-2'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Chat #2
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {activeTab === 'create-users' && (
            <div className="max-w-4xl mx-auto p-6 sm:p-8">
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
                <h1 className="text-3xl font-bold mb-2">Create New User</h1>
                <p className="text-slate-400 mb-8">Add a new user to your organization</p>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
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

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg bg-slate-800 border transition-colors ${
                        errors.email ? 'border-red-500' : 'border-slate-700 focus:border-blue-500'
                      } text-white placeholder-slate-500 focus:outline-none`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-4 py-3 mt-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 active:scale-95"
                  >
                    Create User
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'chat-ai' && (
            <div className="h-[calc(100vh-73px)] flex flex-col bg-slate-950">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="space-y-4">
                  {sampleMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-slate-800 text-slate-100 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="border-t border-slate-800 p-4 sm:p-6">
                <div className="max-w-4xl mx-auto flex gap-3">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'upload-documents' && (
            <div className="max-w-4xl mx-auto p-6 sm:p-8">
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
                <h1 className="text-3xl font-bold mb-2">Upload Documents</h1>
                <p className="text-slate-400 mb-8">Upload files to your knowledge base</p>

                {/* File Upload Area */}
                <div className="mb-8">
                  <label className="block mb-4">
                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
                      <svg className="w-12 h-12 mx-auto text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-slate-300 font-medium">Click to select files</p>
                      <p className="text-slate-500 text-sm">or drag and drop</p>
                    </div>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Selected Files List */}
                {selectedFiles.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">Selected Files ({selectedFiles.length})</h2>
                    <div className="space-y-3">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <svg className="w-6 h-6 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0015.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                            </svg>
                            <div className="min-w-0">
                              <p className="text-slate-200 truncate">{file.name}</p>
                              <p className="text-slate-500 text-sm">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 ml-4">
                            {uploadProgress[index] !== undefined && (
                              <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300"
                                  style={{ width: `${Math.min(uploadProgress[index], 100)}%` }}
                                />
                              </div>
                            )}
                            <button
                              onClick={() => removeFile(index)}
                              disabled={uploadProgress[index] !== undefined}
                              className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                {selectedFiles.length > 0 && (
                  <button
                    onClick={handleUpload}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 active:scale-95"
                  >
                    Upload {selectedFiles.length} {selectedFiles.length === 1 ? 'File' : 'Files'}
                  </button>
                )}
              </div>
            </div>
          )}

          {(activeTab === 'chat-1' || activeTab === 'chat-2') && (
            <div className="h-[calc(100vh-73px)] flex flex-col bg-slate-950">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="space-y-4">
                  {sampleMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-slate-800 text-slate-100 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="border-t border-slate-800 p-4 sm:p-6">
                <div className="max-w-4xl mx-auto flex gap-3">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
