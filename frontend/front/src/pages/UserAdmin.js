import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserAdmin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("USER");
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/users");
      setUsers(res.data);
    } catch (err) {
      setMessage("❌ Failed to load users.");
    }
  };

  const handleInputChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async () => {
    try {
      if (role === "ADMIN") {
        await axios.post("http://localhost:8080/admin/users/admin", {
          username: form.username,
          password: form.password,
          email: form.email,
          role: { name: "ADMIN" },
        });
      } else {
        await axios.post("http://localhost:8080/admin/users", {
          username: form.username,
          password: form.password,
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          dateOfBirth: form.dateOfBirth,
          role: { name: "USER" },
          address: {
            street: form.street,
            zipCode: form.zipCode,
            placeName: form.placeName,
            stateName: form.stateName,
          },
        });
      }

      setMessage("✅ User created successfully!");
      setForm({});
      fetchUsers();
    } catch (err) {
      setMessage("❌ Failed to create user.");
    }
  };

  const handleDelete = async (username) => {
    try {
      await axios.delete(`http://localhost:8080/admin/users/${username}`);
      setMessage(`✅ User "${username}" removed.`);
      fetchUsers();
    } catch (err) {
      setMessage("❌ Failed to remove user.");
    }
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
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">User Administration</h1>
          {message && (
            <div className={`mt-3 rounded-md p-3 ${message.includes("❌") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
              {message}
            </div>
          )}
        </header>

        <div className="grid gap-8 md:grid-cols-12">
          {/* Create User Form */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900">Create New User</h2>
              </div>
              <div className="p-4 sm:p-6">
                {/* Role switcher */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">User Type</label>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setRole("ADMIN")}
                      className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        role === "ADMIN"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Admin
                    </button>
                    <button
                      onClick={() => setRole("USER")}
                      className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        role === "USER"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      User
                    </button>
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      placeholder="Username"
                      value={form.username || ""}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={form.password || ""}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={form.email || ""}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                  </div>

                  {role === "USER" && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-700">
                            First Name
                          </label>
                          <input
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            value={form.firstName || ""}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-700">
                            Last Name
                          </label>
                          <input
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            value={form.lastName || ""}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="dateOfBirth" className="mb-1 block text-sm font-medium text-gray-700">
                          Date of Birth
                        </label>
                        <input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={form.dateOfBirth || ""}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="street" className="mb-1 block text-sm font-medium text-gray-700">
                          Street Address
                        </label>
                        <input
                          id="street"
                          name="street"
                          placeholder="Street"
                          value={form.street || ""}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="zipCode" className="mb-1 block text-sm font-medium text-gray-700">
                            Zip Code
                          </label>
                          <input
                            id="zipCode"
                            name="zipCode"
                            placeholder="Zip Code"
                            value={form.zipCode || ""}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="placeName" className="mb-1 block text-sm font-medium text-gray-700">
                            City
                          </label>
                          <input
                            id="placeName"
                            name="placeName"
                            placeholder="City"
                            value={form.placeName || ""}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="stateName" className="mb-1 block text-sm font-medium text-gray-700">
                          State
                        </label>
                        <input
                          id="stateName"
                          name="stateName"
                          placeholder="State"
                          value={form.stateName || ""}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={handleCreate}
                  className="mt-6 w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Create {role}
                </button>
              </div>
            </div>
          </div>

          {/* Users List */}
          <div className="md:col-span-7 lg:col-span-8">
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 p-4 sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="divide-y divide-gray-200">
                  {users.length === 0 ? (
                    <p className="py-4 text-center text-sm text-gray-500">No users found</p>
                  ) : (
                    users.map((user) => (
                      <div key={user.userId} className="flex items-center justify-between py-4">
                        <div>
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-purple-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-purple-700">
                                {user.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <p className="font-medium text-gray-900">{user.username}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                            {user.role.name}
                          </span>
                          <button
                            onClick={() => handleDelete(user.username)}
                            className="ml-4 rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100"
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
  );
};

export default UserAdmin;
