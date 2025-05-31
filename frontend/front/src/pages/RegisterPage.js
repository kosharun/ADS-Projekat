"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: {
      city: "",
      street: "",
      zipCode: "",
    },
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
        role: { name: "USER" },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      const res = await axios.post("http://localhost:8080/admin/users", formData)
      setSuccess("User registered successfully!")
      setTimeout(() => navigate("/"), 2000) // Redirect to login after 2 seconds
    } catch (err) {
      setError("Registration failed: " + err.response?.data?.message || "Server error.")
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
      <div className="hidden lg:flex lg:w-1/3 relative z-10 flex-col justify-center items-center p-12 text-white">
        <div className="max-w-md text-center space-y-8">
          {/* Logo/Brand */}
          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl rotate-6 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl -rotate-6 animate-pulse delay-300"></div>
              <div className="relative bg-white rounded-2xl w-full h-full flex items-center justify-center">
                <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                  ></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Join Our Community
            </h1>
            <p className="text-xl text-purple-200 leading-relaxed">
              Create your account today and unlock a world of possibilities with our platform.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            {["Free Account", "Premium Support", "Secure", "Easy Setup"].map((feature, index) => (
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

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-2/3 relative z-10 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-3xl">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl rotate-6"></div>
              <div className="relative bg-white rounded-xl w-full h-full flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                  ></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Create an Account</h2>
            <p className="text-purple-200">Join our community today</p>
          </div>

          {/* Form Container */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
            <div className="p-8 lg:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Create an Account</h2>
                <p className="text-gray-600">Fill in your details to get started</p>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-4"></div>
              </div>

              {/* Error/Success Messages */}
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

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl animate-bounce-once">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-green-700 text-sm font-medium">{success}</span>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Account Information Section */}
                  <div className="md:col-span-2">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">Account Information</h3>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>
                  </div>

                  {/* Username Field */}
                  <div className="group">
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <input
                        id="username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 transition-all duration-300 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 group-hover:border-gray-300"
                        placeholder="Choose a username"
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
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 transition-all duration-300 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 group-hover:border-gray-300"
                        placeholder="Create a password"
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

                  {/* Email Field */}
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 transition-all duration-300 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 group-hover:border-gray-300"
                        placeholder="Your email address"
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
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Personal Information Section */}
                  <div className="md:col-span-2 mt-4">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>
                  </div>

                  {/* First Name Field */}
                  <div className="group">
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 transition-all duration-300 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 group-hover:border-gray-300"
                      placeholder="Your first name"
                      required
                    />
                  </div>

                  {/* Last Name Field */}
                  <div className="group">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 transition-all duration-300 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 group-hover:border-gray-300"
                      placeholder="Your last name"
                      required
                    />
                  </div>

                  {/* Date of Birth Field */}
                  <div className="group">
                    <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <input
                        id="dateOfBirth"
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 transition-all duration-300 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 group-hover:border-gray-300"
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="md:col-span-2 mt-4">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">Address Information</h3>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>
                  </div>

                  {/* City Field */}
                  <div className="group">
                    <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>
                    <div className="relative">
                      <input
                        id="city"
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 transition-all duration-300 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 group-hover:border-gray-300"
                        placeholder="Your city"
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
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Street Field */}
                  <div className="group">
                    <label htmlFor="street" className="block text-sm font-semibold text-gray-700 mb-2">
                      Street
                    </label>
                    <div className="relative">
                      <input
                        id="street"
                        type="text"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 transition-all duration-300 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 group-hover:border-gray-300"
                        placeholder="Your street address"
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
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Zip Code Field */}
                  <div className="group">
                    <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-2">
                      Zip Code
                    </label>
                    <div className="relative">
                      <input
                        id="zipCode"
                        type="text"
                        name="address.zipCode"
                        value={formData.address.zipCode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 transition-all duration-300 focus:bg-white focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 group-hover:border-gray-300"
                        placeholder="Your zip code"
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
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 active:scale-[0.98] relative overflow-hidden group"
                  >
                    <span className="relative z-10">Create Account</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </form>

              {/* Navigation Links */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/home")}
                  className="flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-gray-500/20 active:scale-[0.98] w-full sm:w-auto justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  <span>Back to Homepage</span>
                </button>

                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-200 relative group"
                  >
                    Sign in
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
        
        @keyframes bounce-once {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-bounce-once {
          animation: bounce-once 1s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default RegisterPage
