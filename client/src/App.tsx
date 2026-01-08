import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import { useAppDispatch } from "./redux/store";

// components
import PrimaryLayout from "./components/layouts/PrimaryLayout";
import HomeLayout from "./components/layouts/HomeLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import AppLayout from "./components/layouts/AppLayout";
import ProfileLayout from "./components/layouts/ProfileLayout";

// redux
import { refresh } from "./redux/auth/auth.actions";
import PrivateRoute from "./components/providers/PrivateRoute";
import PublicRoute from "./components/providers/PublicRoute";

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

const AccountPage = lazy(() => import("@/pages/profile/Account"));
const WishlistPage = lazy(() => import("@/pages/profile/Wishlist"));
const SettingsPage = lazy(() => import("@/pages/profile/Settings"));
const ReviewsPage = lazy(() => import("@/pages/profile/Reviews"));
const ShippingPage = lazy(() => import("@/pages/profile/Shipping"));
const PaymentPage = lazy(() => import("@/pages/profile/Payment"));

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route element={<PublicRoute />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/verify-otp-success" element={<VerifyOtpSuccessPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/reset-password-success" element={<ResetPasswordSuccessPage />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          <Route element={<PrimaryLayout />}>
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:slug" element={<CatalogProductPage />} />
            <Route path="*" element={<NotFoundPage />} />

            <Route element={<PrivateRoute />}>
              <Route element={<ProfileLayout />} path="/profile">
                <Route path="" element={<AccountPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="reviews" element={<ReviewsPage />} />
                <Route path="orders" />
                <Route path="shipping-address" element={<ShippingPage />} />
                <Route path="payment" element={<PaymentPage />} />
              </Route>
            </Route>
          </Route>
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
