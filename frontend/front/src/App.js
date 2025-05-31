import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import UserDashboard from "./pages/UserDashboard"
import MyOrders from "./pages/MyOrders"
import OrderNow from "./pages/OrderNow"
import { AuthProvider } from "./contexts/AuthContext"
import { CartProvider } from "./contexts/CartContext"
import RegisterPage from "./pages/RegisterPage"
import UserAdmin from "./pages/UserAdmin"
import AdminDashboard from "./pages/AdminDashboard"
import ProductCatalogAdmin from "./pages/ProductCatalogAdmin"
import OrderAdmin from "./pages/OrderAdmin"
import LandingPage from "./pages/LandingPage"
import VolimLjuto from "./pages/volim"

function App() {
  return (
    <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/volimljuto" element={<VolimLjuto/>} />
              <Route path="/home" element={<LandingPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/orders" element={<MyOrders />} />
              <Route path="/order-now" element={<OrderNow />} />

              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserAdmin />} />
              <Route path="/admin/products" element={<ProductCatalogAdmin />} />
              <Route path="/admin/orders" element={<OrderAdmin />} />
            </Routes>
          </Router>
        </CartProvider>
    </AuthProvider>
  )
}

export default App
