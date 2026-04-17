import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import DetailedProduct from "./pages/DetailedProduct";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";

function AppRoutes() {
  const { isLoggedIn } = useApp();

  return (
    <Routes>
      {/* Public */}
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/products" replace /> : <LoginPage />}
      />

      {/* Protected */}
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/:productId"
        element={
          <ProtectedRoute>
            <DetailedProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? "/products" : "/login"} replace />}
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}