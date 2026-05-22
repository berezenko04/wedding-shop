import { lazy } from 'react';

export const pages = {
  Register: lazy(() => import('@/pages/auth/register')),
  Login: lazy(() => import('@/pages/auth/login')),
  ForgotPassword: lazy(() => import('@/pages/auth/forgot-password')),
  VerifyOtp: lazy(() => import('@/pages/auth/verify-otp')),
  VerifyOtpSuccess: lazy(() => import('@/pages/auth/verify-otp/success')),
  ResetPassword: lazy(() => import('@/pages/auth/reset-password')),
  ResetPasswordSuccess: lazy(() => import('@/pages/auth/reset-password/success')),

  Home: lazy(() => import('@/pages/home')),
  Catalog: lazy(() => import('@/pages/catalog')),
  CatalogProduct: lazy(() => import('@/pages/catalog/product')),
  Checkout: lazy(() => import('@/pages/checkout')),
  CheckoutSuccess: lazy(() => import('@/pages/checkout/success')),
  NotFound: lazy(() => import('@/pages/not-found')),

  Account: lazy(() => import('@/pages/profile/account')),
  Wishlist: lazy(() => import('@/pages/profile/wishlist')),
  Settings: lazy(() => import('@/pages/profile/settings')),
  Reviews: lazy(() => import('@/pages/profile/reviews')),
  Orders: lazy(() => import('@/pages/profile/orders')),
  Shipping: lazy(() => import('@/pages/profile/shipping')),
  Payment: lazy(() => import('@/pages/profile/payment')),

  ShippingAndDelivery: lazy(() => import('@/pages/help/shipping-and-delivery')),
  Returns: lazy(() => import('@/pages/help/returns')),
  PaymentOptions: lazy(() => import('@/pages/help/payment-options')),
  ContactUs: lazy(() => import('@/pages/help/contact-us')),
  TermsOfUse: lazy(() => import('@/pages/help/terms-of-use')),
  PrivacyAndPolicy: lazy(() => import('@/pages/help/privacy-and-policy')),
} as const;
