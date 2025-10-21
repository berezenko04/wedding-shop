import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";

// components
import PrimaryLayout from "./components/layouts/PrimaryLayout";
import AuthLayout from "./components/layouts/AuthLayout";

const HomePage = lazy(() => import("@/pages/Home"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

// auth
const RegisterPage = lazy(() => import("@/pages/Register"));
const LoginPage = lazy(() => import("@/pages/Login"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPassword"));
const VerifyOtpPage = lazy(() => import("@/pages/VerifyOtp"));
const VerifyOtpSuccessPage = lazy(() => import("@/pages/VerifyOtpSuccess"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPassword"));
const ResetPasswordSuccessPage = lazy(() => import("@/pages/ResetPasswordSuccess"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/verify-otp-success" element={<VerifyOtpSuccessPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/reset-password-success" element={<ResetPasswordSuccessPage />} />
        </Route>

        <Route element={<PrimaryLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" />
          <Route path="/catalog/:slug" />
          <Route path="*" element={<NotFoundPage />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
