import {
  FavoriteBorder,
  LocalShippingOutlined,
  PaymentOutlined,
  PersonOutline,
  RateReviewOutlined,
  SettingsOutlined,
  ShoppingCartCheckoutOutlined,
} from '@mui/icons-material';

export const footerHelpMenu = [
  { title: 'Shipping and Delivery', href: '/shipping-and-delivery' },
  { title: 'Returns', href: '/returns' },
  { title: 'Payment Options', href: '/payment-options' },
  { title: 'Contact Us', href: '/contact-us' },
];

export const footerContacts = [
  { title: 'Github', href: 'https://github.com/berezenko04' },
  { title: 'Ankerdine Crescent, SE18 3LQ', href: 'https://maps.app.goo.gl/WWFFsVYGtapeyhYaA' },
];

export const privacyMenu = [
  { title: 'Terms Of Use', href: '/terms-of-use' },
  { title: 'Privacy & Cookie Policy', href: '/privacy-and-policy' },
];

export const profileMenu = [
  { title: 'Account', href: '/profile', icon: PersonOutline },
  { title: 'Wish List', href: '/profile/wishlist', icon: FavoriteBorder },
  { title: 'Settings', href: '/profile/settings', icon: SettingsOutlined },
  { title: 'My Reviews', href: '/profile/reviews', icon: RateReviewOutlined },
  { title: 'My Orders', href: '/profile/orders', icon: ShoppingCartCheckoutOutlined },
  { title: 'Shipping Address', href: '/profile/shipping-address', icon: LocalShippingOutlined },
  { title: 'Payment', href: '/profile/payment', icon: PaymentOutlined },
];
