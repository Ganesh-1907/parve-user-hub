import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import { AdminLayout } from "@/components/layout/AdminLayout";
=======
import { UserLayout } from "@/components/layout/UserLayout";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Terms from "./pages/Terms";
>>>>>>> 6731938dadb0b1d04c88d2cf326ecdb8b51dc481
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
<<<<<<< HEAD
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AddProductPage from "./pages/admin/AddProductPage";
import EditProductPage from "./pages/admin/EditProductPage";
=======
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
>>>>>>> 6731938dadb0b1d04c88d2cf326ecdb8b51dc481
import NotFound from "./pages/NotFound";
import AdminRoute from "@/components/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes (no layout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
<<<<<<< HEAD
          
          {/* Admin Routes */}
          <Route
            path="/"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/add" element={<AddProductPage />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
          
=======
>>>>>>> 6731938dadb0b1d04c88d2cf326ecdb8b51dc481
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
