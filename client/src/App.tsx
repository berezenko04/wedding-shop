import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import { useAppDispatch } from "./redux/store";

// components
import PrimaryLayout from "./components/layouts/PrimaryLayout";
import HomeLayout from "./components/layouts/HomeLayout";
import AuthLayout from "./components/layouts/AuthLayout";

// redux
import { refresh } from "./redux/auth/auth.actions";

const RegisterPage = lazy(() => import("@/pages/auth/Register"));
const LoginPage = lazy(() => import("@/pages/auth/Login"));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/ForgotPassword"));
const VerifyOtpPage = lazy(() => import("@/pages/auth/VerifyOtp"));
const VerifyOtpSuccessPage = lazy(() => import("@/pages/auth/VerifyOtpSuccess"));
const ResetPasswordPage = lazy(() => import("@/pages/auth/ResetPassword"));
const ResetPasswordSuccessPage = lazy(() => import("@/pages/auth/ResetPasswordSuccess"));

const HomePage = lazy(() => import("@/pages/Home"));
const CatalogPage = lazy(() => import("@/pages/Catalog"));
const CatalogProductPage = lazy(() => import("@/pages/CatalogProduct"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

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

        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route element={<PrimaryLayout />}>
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:slug" element={<CatalogProductPage />} />
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
