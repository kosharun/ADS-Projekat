"use client"

import { useEffect, useState } from "react"
import { getAvailableProducts, createOrder, getCurrentUserId } from "../services/api"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const OrderNow = () => {
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState({})
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    getAvailableProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err))
  }, [])

  const handleQuantityChange = (productId, quantity) => {
    setSelected((prev) => ({
      ...prev,
      [productId]: Number(quantity),
    }))
  }

  const handleOrderSubmit = async () => {
    const items = Object.entries(selected)
      .filter(([_, qty]) => qty > 0)
      .map(([productId, qty]) => ({
        productId: Number(productId),
        quantity: qty,
      }))

    if (items.length === 0) {
      setMessage("You must select at least one product.")
      return
    }

    const totalPrice = items.reduce((acc, item) => {
      const product = products.find((p) => p.productId === item.productId)
      return acc + (product?.price || 0) * item.quantity
    }, 0)

    try {
      const userId = getCurrentUserId()
      const orderDTO = { userId, totalPrice } // Create order payload
      const orderRes = await createOrder(orderDTO) // Call createOrder API
      const orderId = orderRes.data.orderId

      // Create order items
      const orderItemRequests = items.map((item) => ({
        orderId,
        productId: item.productId,
        quantity: item.quantity,
      }))

      // Send order items to the API
      for (const orderItem of orderItemRequests) {
        await axios.post("http://localhost:8080/orderItems", orderItem)
      }

      setMessage("Order placed successfully!")
      setSelected({})
    } catch (error) {
      console.error(error)
      setMessage("Failed to submit order.")
    }
  }

  // Calculate cart total
  const cartTotal = Object.entries(selected).reduce((total, [productId, quantity]) => {
    if (quantity > 0) {
      const product = products.find((p) => p.productId === Number(productId))
      return total + (product?.price || 0) * quantity
    }
    return total
  }, 0)

  // Count items in cart
  const itemCount = Object.values(selected).filter((qty) => qty > 0).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
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

          {itemCount > 0 && (
            <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm border border-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-indigo-600"
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
              <span>
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
              <span className="font-medium text-indigo-600">${cartTotal.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Shop Products</h1>
          <p className="text-gray-500 mt-1">Browse our collection and place your order</p>
        </div>

        {message && (
          <div
            className={`mb-6 rounded-lg p-4 ${message.includes("Failed") ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}
          >
            {message}
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.productId}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-medium text-gray-800">{product.name}</h2>
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">{product.description}</p>

                <div className="flex justify-between items-center text-sm mb-4">
                  <span className="text-gray-500">Available</span>
                  <span
                    className={`font-medium ${product.stockQuantity > 10 ? "text-emerald-600" : product.stockQuantity > 0 ? "text-amber-600" : "text-rose-600"}`}
                  >
                    {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : "Out of stock"}
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={product.stockQuantity}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    value={selected[product.productId] || ""}
                    onChange={(e) => handleQuantityChange(product.productId, e.target.value)}
                    placeholder="Quantity"
                    disabled={product.stockQuantity <= 0}
                  />

                  {selected[product.productId] > 0 && (
                    <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                      <span className="text-xs font-medium text-indigo-600">
                        ${(product.price * selected[product.productId]).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {itemCount > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleOrderSubmit}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              Place Order (${cartTotal.toFixed(2)})
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderNow
