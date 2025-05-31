"use client"

import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const UserDashboard = () => {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [userName, setUserName] = useState("Jane Doe")

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    localStorage.clear() // Clear user data from localStorage
    navigate("/") // Redirect to the login page
  }

  const stats = [
    { label: "Total Orders", value: "24", change: "+12%", icon: "📦", color: "from-blue-500 to-blue-600" },
    { label: "This Month", value: "8", change: "+25%", icon: "📈", color: "from-green-500 to-green-600" },
    { label: "Pending", value: "3", change: "-5%", icon: "⏳", color: "from-yellow-500 to-yellow-600" },
    { label: "Completed", value: "21", change: "+18%", icon: "✅", color: "from-purple-500 to-purple-600" },
  ]

  const recentOrders = [
    { id: "#ORD-001", item: "Wireless Headphones", status: "Delivered", date: "2024-01-15", amount: "$129.99" },
    { id: "#ORD-002", item: "Smart Watch", status: "Shipped", date: "2024-01-14", amount: "$299.99" },
    { id: "#ORD-003", item: "Laptop Stand", status: "Processing", date: "2024-01-13", amount: "$49.99" },
    { id: "#ORD-004", item: "USB-C Cable", status: "Delivered", date: "2024-01-12", amount: "$19.99" },
  ]

  const quickActions = [
    {
      title: "Browse Products",
      description: "Explore our latest collection",
      icon: "🛍️",
      action: () => navigate("/order-now"),
    },
    { title: "Track Orders", description: "Check your order status", icon: "📍", action: () => navigate("/orders") },
    { title: "Account Settings", description: "Manage your profile", icon: "⚙️", action: () => navigate("/settings") },
    { title: "Support", description: "Get help when you need it", icon: "💬", action: () => navigate("/support") },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {userName}</p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">{currentTime.toLocaleTimeString()}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">JD</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Sign Out"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">
                Good {currentTime.getHours() < 12 ? "Morning" : currentTime.getHours() < 18 ? "Afternoon" : "Evening"},{" "}
                {userName}! 👋
              </h2>
              <p className="text-purple-100 text-lg">Ready to explore what's new today?</p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-2xl`}
                >
                  {stat.icon}
                </div>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-full ${
                    stat.change.startsWith("+") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Quick Actions
              </h3>
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <button
                    key={action.title}
                    onClick={action.action}
                    className="w-full p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105 text-left group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{action.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {action.title}
                        </h4>
                        <p className="text-sm text-gray-500">{action.description}</p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Recent Orders
                </h3>
                <button
                  onClick={() => navigate("/orders")}
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center space-x-1 transition-colors"
                >
                  <span>View All</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{order.item}</h4>
                        <p className="text-sm text-gray-500">
                          {order.id} • {order.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{order.amount}</p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate("/order-now")}
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="relative z-10 flex items-center justify-center space-x-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 5M7 13l-1.5-5m0 0L4 5H2m5 8h10m0 0v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6m8 0V9a1 1 0 00-1-1H8a1 1 0 00-1 1v4.01"
                />
              </svg>
              <div className="text-left">
                <h3 className="text-xl font-bold">Start Shopping</h3>
                <p className="text-purple-100">Discover amazing products</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="group relative overflow-hidden bg-white border-2 border-gray-200 text-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-purple-300"
          >
            <div className="relative z-10 flex items-center justify-center space-x-3">
              <svg
                className="w-8 h-8 text-gray-600 group-hover:text-purple-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <div className="text-left">
                <h3 className="text-xl font-bold group-hover:text-purple-600 transition-colors">View Orders</h3>
                <p className="text-gray-500">Track your purchases</p>
              </div>
            </div>
          </button>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => navigate("/order-now")}
          className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default UserDashboard
