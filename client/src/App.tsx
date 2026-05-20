import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { useAppDispatch } from './redux/store';

// components
import PrimaryLayout from './components/layouts/PrimaryLayout';
import HomeLayout from './components/layouts/HomeLayout';
import AuthLayout from './components/layouts/AuthLayout';
import AppLayout from './components/layouts/AppLayout';
import ProfileLayout from './components/layouts/ProfileLayout';

// providers
import PrivateRoute from './components/providers/PrivateRoute';
import PublicRoute from './components/providers/PublicRoute';

// redux
import { refresh } from './redux/auth/auth.actions';

const RegisterPage = lazy(() => import('@/pages/auth/register'));
const LoginPage = lazy(() => import('@/pages/auth/login'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgot-password'));
const VerifyOtpPage = lazy(() => import('@/pages/auth/verify-otp'));
const VerifyOtpSuccessPage = lazy(() => import('@/pages/auth/verify-otp/success'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/reset-password'));
const ResetPasswordSuccessPage = lazy(() => import('@/pages/auth/reset-password/success'));

const HomePage = lazy(() => import('@/pages/home'));
const CatalogPage = lazy(() => import('@/pages/catalog'));
const CatalogProductPage = lazy(() => import('@/pages/catalog/product'));
const CheckoutPage = lazy(() => import('@/pages/checkout'));
const CheckoutSuccessPage = lazy(() => import('@/pages/checkout/success'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));

const AccountPage = lazy(() => import('@/pages/profile/account'));
const WishlistPage = lazy(() => import('@/pages/profile/wishlist'));
const SettingsPage = lazy(() => import('@/pages/profile/settings'));
const ReviewsPage = lazy(() => import('@/pages/profile/reviews'));
const OrdersPage = lazy(() => import('@/pages/profile/orders'));
const ShippingPage = lazy(() => import('@/pages/profile/shipping'));
const PaymentPage = lazy(() => import('@/pages/profile/payment'));

const ShippingAndDeliveryPage = lazy(() => import('@/pages/help/shipping-and-delivery'));
const ReturnsPage = lazy(() => import('@/pages/help/returns'));
const PaymentOptionsPage = lazy(() => import('@/pages/help/payment-options'));
const ContactUsPage = lazy(() => import('@/pages/help/contact-us'));
const TermsOfUsePage = lazy(() => import('@/pages/help/terms-of-use'));
const PrivacyAndPolicyPage = lazy(() => import('@/pages/help/privacy-and-policy'));

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

            <Route path="/shipping-and-delivery" element={<ShippingAndDeliveryPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/payment-options" element={<PaymentOptionsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/terms-of-use" element={<TermsOfUsePage />} />
            <Route path="/privacy-and-policy" element={<PrivacyAndPolicyPage />} />

            <Route element={<PrivateRoute />}>
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/checkout/success" element={<CheckoutSuccessPage />} />

              <Route element={<ProfileLayout />} path="/profile">
                <Route path="" element={<AccountPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="reviews" element={<ReviewsPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="shipping-address" element={<ShippingPage />} />
                <Route path="payment" element={<PaymentPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
