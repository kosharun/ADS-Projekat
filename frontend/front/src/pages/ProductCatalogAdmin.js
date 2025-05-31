"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const ProductCatalogAdmin = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({})
  const [message, setMessage] = useState("")
  const [updateId, setUpdateId] = useState("")
  const [updateQuantity, setUpdateQuantity] = useState("")

  const API = "http://localhost:8080/admin/products"

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API)
      setProducts(res.data)
    } catch {
      setMessage("❌ Failed to load products.")
    }
  }

  const handleInput = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCreate = async () => {
    const today = new Date()
    const availableUntilDate = new Date(form.availableUntil)

    // Osnovna validacija
    if (!form.name || !form.description || !form.price || !form.availableUntil || !form.stockQuantity) {
      setMessage("❌ Please fill in all fields.")
      return
    }

    if (availableUntilDate <= today) {
      setMessage("❌ 'Available Until' must be a future date.")
      return
    }

    try {
      await axios.post(API, {
        catalog: { catalogId: 4 },
        name: form.name,
        description: form.description,
        price: Number.parseFloat(form.price),
        availableUntil: form.availableUntil,
        stockQuantity: Number.parseInt(form.stockQuantity),
      })

      setForm({})
      setMessage("✅ Product created.")
      fetchProducts()
    } catch (err) {
      console.error(err)
      setMessage("❌ Failed to create product.")
    }
  }

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return
    try {
      await axios.delete(`${API}/${productId}`)
      setMessage("✅ Product removed.")
      fetchProducts()
    } catch {
      setMessage("❌ Failed to delete product.")
    }
  }

  const handleUpdateStock = async () => {
    if (!updateId || !updateQuantity) {
      setMessage("❌ Please enter both Product ID and Quantity.")
      return
    }

    try {
      await axios.patch(`${API}/${updateId}/quantity`, null, {
        params: {
          quantity: updateQuantity,
        },
      })
      setMessage("✅ Stock updated.")
      setUpdateId("")
      setUpdateQuantity("")
      fetchProducts()
    } catch {
      setMessage("❌ Failed to update stock.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
            onClick={() => navigate("/admin")}
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

        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Product Catalog Administration</h1>
          {message && (
            <div
              className={`mt-3 rounded-md p-3 ${message.includes("❌") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}
            >
              {message}
            </div>
          )}
        </header>

        <div className="grid gap-8 md:grid-cols-12">
          {/* Create Product Form */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900">Create New Product</h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      placeholder="Product Name"
                      value={form.name || ""}
                      onChange={handleInput}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Product Description"
                      value={form.description || ""}
                      onChange={handleInput}
                      rows={3}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="price" className="mb-1 block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={form.price || ""}
                        onChange={handleInput}
                        className="w-full rounded-md border border-gray-300 pl-7 pr-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="availableUntil" className="mb-1 block text-sm font-medium text-gray-700">
                      Available Until
                    </label>
                    <input
                      id="availableUntil"
                      name="availableUntil"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={form.availableUntil || ""}
                      onChange={handleInput}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="stockQuantity" className="mb-1 block text-sm font-medium text-gray-700">
                      Stock Quantity
                    </label>
                    <input
                      id="stockQuantity"
                      name="stockQuantity"
                      type="number"
                      placeholder="Stock Quantity"
                      value={form.stockQuantity || ""}
                      onChange={handleInput}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCreate}
                  className="mt-6 w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Create Product
                </button>
              </div>
            </div>

            {/* Update Stock Form */}
            <div className="mt-8 rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900">Update Stock</h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="updateId" className="mb-1 block text-sm font-medium text-gray-700">
                      Product ID
                    </label>
                    <input
                      id="updateId"
                      type="number"
                      placeholder="Product ID"
                      value={updateId}
                      onChange={(e) => setUpdateId(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="updateQuantity" className="mb-1 block text-sm font-medium text-gray-700">
                      New Quantity
                    </label>
                    <input
                      id="updateQuantity"
                      type="number"
                      placeholder="New Quantity"
                      value={updateQuantity}
                      onChange={(e) => setUpdateQuantity(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <button
                  onClick={handleUpdateStock}
                  className="mt-4 w-full rounded-md bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  Update Quantity
                </button>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="md:col-span-7 lg:col-span-8">
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900">All Products</h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {products.length === 0 ? (
                    <p className="col-span-full py-4 text-center text-sm text-gray-500">No products found</p>
                  ) : (
                    products.map((product) => (
                      <div
                        key={product.productId}
                        className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden"
                      >
                        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">{product.name}</h3>
                            <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                              #{product.productId}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="mb-3 text-sm text-gray-600">{product.description}</p>
                          <div className="mb-4 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Price:</span>
                              <span className="text-sm font-medium text-purple-600">${product.price.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Stock:</span>
                              <span className="text-sm font-medium">{product.stockQuantity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Available Until:</span>
                              <span className="text-sm font-medium">
                                {new Date(product.availableUntil).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDelete(product.productId)}
                            className="mt-2 w-full rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCatalogAdmin
