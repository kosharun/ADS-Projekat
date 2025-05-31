"use client"

import { useEffect, useState } from "react"
import { getUserOrders, getCurrentUserId, cancelOrder } from "../services/api"
import { useNavigate } from "react-router-dom"

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = getCurrentUserId()
        const response = await getUserOrders(userId)
        setOrders(response.data)
      } catch (err) {
        setError("Error fetching orders: " + err.message)
      }
    }

    fetchOrders()
  }, [])

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId)
      setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId))
    } catch (err) {
      setError("Error canceling order: " + err.message)
    }
  }

  // Helper function to get status badge color
  const getStatusColor = (status) => {
    const statusMap = {
      pending: "bg-amber-100 text-amber-800 border-amber-200",
      completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
      cancelled: "bg-rose-100 text-rose-800 border-rose-200",
    }
    return statusMap[status?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
            onClick={() => navigate("/dashboard")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">My Orders</h1>
          <p className="text-gray-500 mt-1">View and manage your order history</p>
        </div>

        {error && <div className="mb-6 rounded-lg bg-rose-50 p-4 text-rose-700 border border-rose-200">{error}</div>}

        {orders.length === 0 ? (
          <div className="text-center bg-white rounded-xl shadow-sm p-12 border border-gray-100">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <p className="text-gray-600">You don't have any orders yet.</p>
            <button
              onClick={() => navigate("/order-now")}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Shop Now
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
                  <div className="flex justify-between items-center">
                    <h2 className="font-medium text-gray-800">Order #{order.orderId}</h2>
                    <span className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Total</span>
                      <span className="text-sm font-medium text-gray-900">${order.totalPrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Status</span>
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${getStatusColor(order.status.name)}`}
                      >
                        {order.status.name}
                      </span>
                    </div>
                  </div>

                  {order.orderItems && order.orderItems.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Items</h3>
                      <ul className="space-y-2">
                        {order.orderItems.map((item) => (
                          <li key={item.orderItemId} className="flex justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <span className="text-gray-800">{item.product.name}</span>
                              <span className="text-gray-500">×{item.quantity}</span>
                            </div>
                            <span className="font-medium text-gray-900">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {order.status.name === "Pending" && (
                    <button
                      onClick={() => handleCancelOrder(order.orderId)}
                      className="mt-4 w-full rounded-lg border border-rose-200 bg-rose-50 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100 transition-colors"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders
