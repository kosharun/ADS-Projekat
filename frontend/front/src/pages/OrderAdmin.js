import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState({ orderId: "", status: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/orders");
      setOrders(res.data);
    } catch {
      setMessage("❌ Failed to fetch orders.");
    }
  };

  const handleStatusChange = (e) => {
    setStatusUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateStatus = async () => {
    const { orderId, status } = statusUpdate;

    if (!orderId || !status.match(/^(pending|completed|cancelled)$/i)) {
      setMessage("❌ Invalid input. Use: pending, completed, or cancelled.");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/admin/orders/${orderId}/status`, null, {
        params: { status },
      });
      setMessage("✅ Order status updated.");
      setStatusUpdate({ orderId: "", status: "" });
      fetchOrders();
    } catch {
      setMessage("❌ Failed to update order.");
    }
  };

  // Helper function to get status badge color
  const getStatusColor = (status) => {
    const statusMap = {
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return statusMap[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

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
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Order Administration</h1>
          {message && (
            <div className={`mt-3 rounded-md p-3 ${message.includes("❌") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
              {message}
            </div>
          )}
        </header>

        {/* Status update form */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900">Update Order Status</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2 md:max-w-xl">
              <div>
                <label htmlFor="orderId" className="mb-1 block text-sm font-medium text-gray-700">
                  Order ID
                </label>
                <input
                  id="orderId"
                  type="number"
                  name="orderId"
                  placeholder="Order ID"
                  value={statusUpdate.orderId}
                  onChange={handleStatusChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="status" className="mb-1 block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={statusUpdate.status}
                  onChange={handleStatusChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                  <option value="">Select status...</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <button
              onClick={updateStatus}
              className="mt-4 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Update Status
            </button>
          </div>
        </div>

        {/* Orders list */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900">All Orders</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {orders.length === 0 ? (
                <p className="col-span-full py-4 text-center text-sm text-gray-500">No orders found</p>
              ) : (
                orders.map((order) => (
                  <div key={order.orderId} className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">Order #{order.orderId}</h3>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(order.status.name)}`}>
                          {order.status.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">User ID:</span>
                          <span className="text-sm font-medium">{order.userId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Date:</span>
                          <span className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Total:</span>
                          <span className="text-sm font-medium text-purple-600">${order.totalPrice.toFixed(2)}</span>
                        </div>
                      </div>

                      {order.orderItems?.length > 0 && (
                        <div className="mt-4">
                          <h4 className="mb-2 text-xs font-medium uppercase text-gray-500">Items</h4>
                          <ul className="space-y-2 text-sm">
                            {order.orderItems.map((item) => (
                              <li key={item.orderItemId} className="flex justify-between">
                                <span className="text-gray-700">
                                  {item.product.name} × {item.quantity}
                                </span>
                                <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderAdmin;
