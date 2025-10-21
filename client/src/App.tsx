import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";

// components
import PrimaryLayout from "./components/layouts/PrimaryLayout";
import AuthLayout from "./components/layouts/AuthLayout";

const HomePage = lazy(() => import("@/pages/Home"));
const RegisterPage = lazy(() => import("@/pages/Register"));
const LoginPage = lazy(() => import("@/pages/Login"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" />
          <Route path="/verify-otp" />
          <Route path="/verify-otp-success" />
          <Route path="/reset-password" />
          <Route path="/reset-password-success" />
        </Route>

        <Route element={<PrimaryLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" />
          <Route path="/catalog/:slug" />
        </Route>

        <Route path="/profile">
          <Route path="account" />
          <Route path="wishlist" />
          <Route path="settings" />
          <Route path="reviews" />
          <Route path="orders" />
          <Route path="shipping-address" />
          <Route path="payment" />
        </Route>

        <Route>
          <Route path="/privacy-and-policy" />
          <Route path="/terms-of-use" />
        </Route>

        <Route>
          <Route path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
