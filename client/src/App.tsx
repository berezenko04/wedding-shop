import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
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

// routes
import { pages } from './routes';

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
            <Route path="/register" element={<pages.Register />} />
            <Route path="/login" element={<pages.Login />} />
          </Route>
          <Route path="/forgot-password" element={<pages.ForgotPassword />} />
          <Route path="/verify-otp" element={<pages.VerifyOtp />} />
          <Route path="/verify-otp-success" element={<pages.VerifyOtpSuccess />} />
          <Route path="/reset-password" element={<pages.ResetPassword />} />
          <Route path="/reset-password-success" element={<pages.ResetPasswordSuccess />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<pages.Home />} />
          </Route>

          <Route element={<PrimaryLayout />}>
            <Route path="/catalog" element={<pages.Catalog />} />
            <Route path="/catalog/:slug" element={<pages.CatalogProduct />} />
            <Route path="*" element={<pages.NotFound />} />

            <Route path="/shipping-and-delivery" element={<pages.ShippingAndDelivery />} />
            <Route path="/returns" element={<pages.Returns />} />
            <Route path="/payment-options" element={<pages.PaymentOptions />} />
            <Route path="/contact-us" element={<pages.ContactUs />} />
            <Route path="/terms-of-use" element={<pages.TermsOfUse />} />
            <Route path="/privacy-and-policy" element={<pages.PrivacyAndPolicy />} />

            <Route element={<PrivateRoute />}>
              <Route path="/checkout" element={<pages.Checkout />} />
              <Route path="/checkout/success" element={<pages.CheckoutSuccess />} />

              <Route element={<ProfileLayout />} path="/profile">
                <Route path="" element={<pages.Account />} />
                <Route path="wishlist" element={<pages.Wishlist />} />
                <Route path="settings" element={<pages.Settings />} />
                <Route path="reviews" element={<pages.Reviews />} />
                <Route path="orders" element={<pages.Orders />} />
                <Route path="shipping-address" element={<pages.Shipping />} />
                <Route path="payment" element={<pages.Payment />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
