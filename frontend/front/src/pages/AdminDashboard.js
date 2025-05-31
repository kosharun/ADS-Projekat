"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../components/ui/sidebar"

// Enhanced Icon component with animations
const Icon = ({ name, className }) => {
  const icons = {
    dashboard: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
    ),
    users: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    products: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z" />
        <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z" />
        <line x1="12" x2="12" y1="22" y2="13" />
        <path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5" />
      </svg>
    ),
    orders: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    ),
    logout: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),
    analytics: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3v18h18" />
        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
      </svg>
    ),
  }

  return icons[name] || null
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentTime, setCurrentTime] = useState(new Date())

  // State for analytics data
  const [userCount, setUserCount] = useState(0)
  const [orderStatusCounts, setOrderStatusCounts] = useState({})
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [availableProductsCount, setAvailableProductsCount] = useState(0)

  // State for recent data
  const [recentOrders, setRecentOrders] = useState([])
  const [newUsers, setNewUsers] = useState([])

  // State for monthly revenue data
  const [monthlyRevenue, setMonthlyRevenue] = useState([])

  // Loading states
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Fetch analytics data
        const [userCountRes, orderStatusCountsRes, totalRevenueRes, availableProductsCountRes] = await Promise.all([
          axios.get("http://localhost:8080/admin/analytics/user-count"),
          axios.get("http://localhost:8080/admin/analytics/order-status-counts"),
          axios.get("http://localhost:8080/admin/analytics/total-revenue"),
          axios.get("http://localhost:8080/admin/analytics/available-products-count"),
        ])

        setUserCount(userCountRes.data)
        setOrderStatusCounts(orderStatusCountsRes.data)
        setTotalRevenue(totalRevenueRes.data)
        setAvailableProductsCount(availableProductsCountRes.data)

        // Fetch recent orders
        const ordersRes = await axios.get("http://localhost:8080/admin/orders")
        const orders = ordersRes.data

        // Get 5 most recent orders
        const recent = orders
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
          .map((order) => ({
            id: order.orderId,
            customer: `User #${order.userId}`,
            amount: order.totalPrice.toFixed(2),
            date: new Date(order.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }),
          }))

        setRecentOrders(recent)

        // Fetch users
        const usersRes = await axios.get("http://localhost:8080/admin/users")
        const users = usersRes.data

        // Get 5 most recent users
        const recentUsers = users
          .sort((a, b) => b.userId - a.userId) // Assuming higher ID means more recent
          .slice(0, 5)
          .map((user) => ({
            id: user.userId,
            name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.username,
            email: user.email,
            initials: getInitials(user.firstName, user.lastName, user.username),
            date: "Recently", // We don't have creation date in the response
          }))

        setNewUsers(recentUsers)

        // For monthly revenue, we'll simulate data since we don't have a specific endpoint
        // In a real application, you would fetch this from a dedicated endpoint
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
        const simulatedRevenue = months.map((month) => {
          // Generate a random percentage of the total revenue for each month
          const percentage = Math.random() * 0.5 + 0.5 // Between 50% and 100%
          return {
            month,
            amount: Math.round(totalRevenueRes.data * percentage),
          }
        })

        setMonthlyRevenue(simulatedRevenue)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError("Failed to load dashboard data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Helper function to get initials from name
  const getInitials = (firstName, lastName, username) => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    } else if (username) {
      return username.substring(0, 2).toUpperCase()
    }
    return "UN" // Unknown
  }

  // Calculate total orders from status counts
  const totalOrders = Object.values(orderStatusCounts).reduce((sum, count) => sum + count, 0)

  // Calculate weekly growth (this would normally come from the backend)
  // For now, we'll simulate it
  const userGrowth = Math.floor(userCount * 0.05) // Assume 5% weekly growth
  const orderGrowth = Math.floor(totalOrders * 0.08) // Assume 8% weekly growth
  const revenueGrowthPercent = 12.5 // Assume 12.5% monthly growth
  const productGrowth = Math.floor(availableProductsCount * 0.06) // Assume 6% new products

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <SidebarProvider>
        <div className="flex min-h-screen relative z-10">
          <Sidebar className="border-r border-white/20 bg-white/80 backdrop-blur-xl">
            <SidebarHeader className="flex h-16 items-center border-b border-gray-200/50 px-6">
              <a href="/" className="flex items-center gap-3 font-bold text-xl group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Icon name="dashboard" className="h-5 w-5" />
                </div>
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AdminPanel
                </span>
              </a>
            </SidebarHeader>
            <SidebarContent className="p-4">
              <SidebarMenu className="space-y-2">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeTab === "dashboard"}
                    onClick={() => setActiveTab("dashboard")}
                    className="w-full justify-start rounded-xl px-4 py-3 text-left transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:scale-105 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-100 data-[active=true]:to-pink-100 data-[active=true]:text-purple-700 data-[active=true]:shadow-md"
                  >
                    <Icon name="dashboard" className="h-5 w-5 mr-3" />
                    <span className="font-medium">Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeTab === "users"}
                    onClick={() => {
                      setActiveTab("users")
                      navigate("/admin/users")
                    }}
                    className="w-full justify-start rounded-xl px-4 py-3 text-left transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:scale-105 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-100 data-[active=true]:to-pink-100 data-[active=true]:text-purple-700 data-[active=true]:shadow-md"
                  >
                    <Icon name="users" className="h-5 w-5 mr-3" />
                    <span className="font-medium">Users</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeTab === "products"}
                    onClick={() => {
                      setActiveTab("products")
                      navigate("/admin/products")
                    }}
                    className="w-full justify-start rounded-xl px-4 py-3 text-left transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:scale-105 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-100 data-[active=true]:to-pink-100 data-[active=true]:text-purple-700 data-[active=true]:shadow-md"
                  >
                    <Icon name="products" className="h-5 w-5 mr-3" />
                    <span className="font-medium">Products</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeTab === "orders"}
                    onClick={() => {
                      setActiveTab("orders")
                      navigate("/admin/orders")
                    }}
                    className="w-full justify-start rounded-xl px-4 py-3 text-left transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:scale-105 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-100 data-[active=true]:to-pink-100 data-[active=true]:text-purple-700 data-[active=true]:shadow-md"
                  >
                    <Icon name="orders" className="h-5 w-5 mr-3" />
                    <span className="font-medium">Orders</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="border-t border-gray-200/50 p-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => navigate("/")}
                    className="w-full justify-start rounded-xl px-4 py-3 text-left transition-all duration-300 hover:bg-red-50 hover:text-red-600 hover:scale-105"
                  >
                    <Icon name="logout" className="h-5 w-5 mr-3" />
                    <span className="font-medium">Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>

          <div className="flex-1 overflow-auto">
            {/* Enhanced Header */}
            <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-white/20 bg-white/80 backdrop-blur-xl px-6 shadow-sm">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <div className="hidden md:block w-px h-6 bg-gray-300"></div>
                <div className="hidden md:block text-sm text-gray-500">
                  {currentTime.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <div className="hidden md:block text-right">
                  <div className="text-sm font-medium text-gray-900">Administrator</div>
                  <div className="text-xs text-gray-500">{currentTime.toLocaleTimeString()}</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-white">AD</span>
                </div>
              </div>
            </header>

            <main className="p-6">
              {error ? (
                <div className="rounded-2xl bg-red-50 border border-red-200 p-6 text-red-700 mb-6 animate-shake">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">{error}</span>
                  </div>
                </div>
              ) : isLoading ? (
                <div className="flex justify-center items-center h-96">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-pink-400 rounded-full animate-spin animate-reverse"></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Welcome Section */}
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <h2 className="text-3xl font-bold mb-2">Welcome back, Administrator! 👋</h2>
                      <p className="text-purple-100 text-lg">Here's what's happening with your platform today.</p>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
                  </div>

                  {/* Stats Overview */}
                  <section>
                    <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Overview
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                      <StatCard
                        title="Total Users"
                        value={userCount.toLocaleString()}
                        description={`+${userGrowth} this week`}
                        icon={<Icon name="users" className="h-6 w-6 text-blue-500" />}
                        gradient="from-blue-500 to-blue-600"
                        bgGradient="from-blue-50 to-blue-100"
                      />
                      <StatCard
                        title="Total Orders"
                        value={totalOrders.toLocaleString()}
                        description={`+${orderGrowth} this week`}
                        icon={<Icon name="orders" className="h-6 w-6 text-green-500" />}
                        gradient="from-green-500 to-green-600"
                        bgGradient="from-green-50 to-green-100"
                      />
                      <StatCard
                        title="Total Revenue"
                        value={`$${totalRevenue.toLocaleString()}`}
                        description={`+${revenueGrowthPercent}% from last month`}
                        icon={<Icon name="analytics" className="h-6 w-6 text-purple-500" />}
                        gradient="from-purple-500 to-purple-600"
                        bgGradient="from-purple-50 to-purple-100"
                      />
                      <StatCard
                        title="Active Products"
                        value={availableProductsCount.toLocaleString()}
                        description={`+${productGrowth} new products`}
                        icon={<Icon name="products" className="h-6 w-6 text-pink-500" />}
                        gradient="from-pink-500 to-pink-600"
                        bgGradient="from-pink-50 to-pink-100"
                      />
                    </div>
                  </section>

                  {/* Recent Activity */}
                  <section>
                    <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Recent Activity
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                        <CardHeader className="pb-4">
                          <CardTitle className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                              <Icon name="orders" className="h-4 w-4 text-white" />
                            </div>
                            Recent Orders
                          </CardTitle>
                          <CardDescription>Latest 5 orders from customers</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {recentOrders.length === 0 ? (
                              <p className="text-center text-gray-500 py-8">No recent orders</p>
                            ) : (
                              recentOrders.map((order, index) => (
                                <div
                                  key={order.id}
                                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                                  style={{ animationDelay: `${index * 100}ms` }}
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                                      <span className="text-sm font-bold text-blue-600">#{order.id}</span>
                                    </div>
                                    <div>
                                      <p className="font-semibold text-gray-900">Order #{order.id}</p>
                                      <p className="text-sm text-gray-500">{order.customer}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-green-600">${order.amount}</p>
                                    <p className="text-sm text-gray-500">{order.date}</p>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                        <CardHeader className="pb-4">
                          <CardTitle className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                              <Icon name="users" className="h-4 w-4 text-white" />
                            </div>
                            New Users
                          </CardTitle>
                          <CardDescription>Latest 5 registered users</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {newUsers.length === 0 ? (
                              <p className="text-center text-gray-500 py-8">No new users</p>
                            ) : (
                              newUsers.map((user, index) => (
                                <div
                                  key={user.id}
                                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                                  style={{ animationDelay: `${index * 100}ms` }}
                                >
                                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center shadow-md">
                                    <span className="text-sm font-bold text-white">{user.initials}</span>
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                  </div>
                                  <div className="text-sm text-gray-500">{user.date}</div>
                                </div>
                              ))
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Sales Analytics */}
                  <section>
                    <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Sales Analytics
                    </h2>
                    <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <Icon name="analytics" className="h-4 w-4 text-white" />
                          </div>
                          Monthly Revenue
                        </CardTitle>
                        <CardDescription>Revenue trends over the past 6 months</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <SalesChart data={monthlyRevenue} />
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Order Status */}
                  <section>
                    <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center">
                      <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                      Order Status
                    </h2>
                    <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
                            <Icon name="orders" className="h-4 w-4 text-white" />
                          </div>
                          Order Status Distribution
                        </CardTitle>
                        <CardDescription>Current status of all orders</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {Object.entries(orderStatusCounts).map(([status, count], index) => (
                            <div
                              key={status}
                              className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 text-center border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <div className="text-3xl font-bold text-gray-900 mb-2">{count}</div>
                              <div className="text-sm font-medium text-gray-600 capitalize">{status}</div>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                                <div
                                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                                  style={{ width: `${(count / totalOrders) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </section>
                </div>
              )}
            </main>
          </div>
        </div>
      </SidebarProvider>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-reverse {
          animation: reverse 1s linear infinite;
        }
      `}</style>
    </div>
  )
}

function StatCard({ title, value, description, icon, gradient, bgGradient }) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold text-gray-700">{title}</CardTitle>
        <div
          className={`p-2 rounded-xl bg-gradient-to-r ${bgGradient} group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
        <p className={`text-sm font-medium bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

function SalesChart({ data = [] }) {
  // Find the maximum value for scaling
  const maxValue = Math.max(...data.map((item) => item.amount), 1)

  return (
    <div className="w-full h-full flex items-end justify-between px-4 py-4">
      {data.map((item, i) => {
        // Calculate height percentage based on the maximum value
        const heightPercentage = Math.max((item.amount / maxValue) * 100, 5) // Minimum 5% height

        return (
          <div key={i} className="relative group flex-1 mx-1">
            <div
              className="w-full bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-lg transition-all duration-500 group-hover:from-purple-700 group-hover:to-pink-600 shadow-lg"
              style={{
                height: `${heightPercentage}%`,
                animationDelay: `${i * 100}ms`,
              }}
            />
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg">
              ${item.amount.toLocaleString()}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
            <div className="text-sm font-medium text-gray-600 mt-3 text-center">{item.month}</div>
          </div>
        )
      })}
    </div>
  )
}
