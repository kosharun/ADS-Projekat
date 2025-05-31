"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      })

      const userId = res.data.userId
      const role = res.data.role
      localStorage.setItem("userId", userId)
      localStorage.setItem("role", role)
      if (role === "ADMIN") {
        navigate("/admin")
      } else if (role === "USER") {
        navigate("/dashboard")
      }
    } catch (err) {
      setError("Invalid credentials or server error.")
    }
  }

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center items-center p-12 text-white">
        <div className="max-w-md text-center space-y-8">
          {/* Logo/Brand */}
          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl rotate-6 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl -rotate-6 animate-pulse delay-300"></div>
              <div className="relative bg-white rounded-2xl w-full h-full flex items-center justify-center">
                <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Welcome to FlowOrder
            </h1>
            <p className="text-xl text-purple-200 leading-relaxed">
              Experience seamless authentication with our next-generation platform designed for managing your orders.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            {["Secure", "Fast", "Reliable", "Modern"].map((feature, index) => (
              <div
                key={feature}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {feature}
              </div>
            ))}
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 right-20 w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-32 left-16 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-2000"></div>
          <div className="absolute top-1/2 right-8 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-3000"></div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl rotate-6"></div>
              <div className="relative bg-white rounded-xl w-full h-full flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
            <div className="p-8 lg:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to continue your journey</p>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-4"></div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl animate-shake">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-red-700 text-sm font-medium">{error}</span>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  {/* Username Field */}
                  <div className="group">
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 transition-all duration-300 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 group-hover:border-gray-300"
                        placeholder="Enter your username"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg
                          className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="group">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 transition-all duration-300 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 group-hover:border-gray-300"
                        placeholder="Enter your password"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg
                          className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 active:scale-[0.98] relative overflow-hidden group"
                >
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Back to Homepage Button */}
                <button
                  type="button"
                  onClick={() => navigate("/home")}
                  className="w-full py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl shadow-sm transform transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-gray-500/20 active:scale-[0.98] flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  <span>Back to Homepage</span>
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-200 relative group"
                  >
                    Sign up
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Decorative Elements */}
          <div className="mt-8 flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-white/30 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 500}ms` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default LoginPage
