import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useAppDispatch } from './redux/store';

// components
import RootLayout from './components/layouts/RootLayout';
import PrimaryLayout from './components/layouts/PrimaryLayout';
import HomeLayout from './components/layouts/HomeLayout';
import AuthLayout from './components/layouts/AuthLayout';
import AppLayout from './components/layouts/AppLayout';
import ProfileLayout from './components/layouts/ProfileLayout';
import Loader from './components/ui/Loaders/Loader';

// providers
import PrivateRoute from './components/providers/PrivateRoute';
import PublicRoute from './components/providers/PublicRoute';

// redux
import { refresh } from './redux/auth/auth.actions';

// routes
import { pages } from './routes';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            element: <PublicRoute />,
            children: [
              { path: '/register', element: <pages.Register /> },
              { path: '/login', element: <pages.Login /> },
            ],
          },
          { path: '/forgot-password', element: <pages.ForgotPassword /> },
          { path: '/verify-otp', element: <pages.VerifyOtp /> },
          { path: '/verify-otp-success', element: <pages.VerifyOtpSuccess /> },
          { path: '/reset-password', element: <pages.ResetPassword /> },
          { path: '/reset-password-success', element: <pages.ResetPasswordSuccess /> },
        ],
      },
      {
        element: <AppLayout />,
        children: [
          {
            element: <HomeLayout />,
            children: [{ index: true, element: <pages.Home /> }],
          },
          {
            element: <PrimaryLayout />,
            children: [
              { path: '/catalog', element: <pages.Catalog /> },
              { path: '/catalog/:slug', element: <pages.CatalogProduct /> },
              { path: '*', element: <pages.NotFound /> },
              { path: '/shipping-and-delivery', element: <pages.ShippingAndDelivery /> },
              { path: '/returns', element: <pages.Returns /> },
              { path: '/payment-options', element: <pages.PaymentOptions /> },
              { path: '/contact-us', element: <pages.ContactUs /> },
              { path: '/terms-of-use', element: <pages.TermsOfUse /> },
              { path: '/privacy-and-policy', element: <pages.PrivacyAndPolicy /> },
              {
                element: <PrivateRoute />,
                children: [
                  { path: '/checkout', element: <pages.Checkout /> },
                  { path: '/checkout/success', element: <pages.CheckoutSuccess /> },
                  {
                    path: '/profile',
                    element: <ProfileLayout />,
                    children: [
                      { index: true, element: <pages.Account /> },
                      { path: 'wishlist', element: <pages.Wishlist /> },
                      { path: 'settings', element: <pages.Settings /> },
                      { path: 'reviews', element: <pages.Reviews /> },
                      { path: 'orders', element: <pages.Orders /> },
                      { path: 'shipping-address', element: <pages.Shipping /> },
                      { path: 'payment', element: <pages.Payment /> },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
