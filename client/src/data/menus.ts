import {
  FavoriteBorder,
  PaymentOutlined,
  PersonOutline,
  RateReviewOutlined,
  SettingsOutlined,
  ShoppingCartCheckoutOutlined,
} from "@mui/icons-material";

export const footerHelpMenu = [
  { title: "Shipping and Delivery", href: "/shipping-and-delivery" },
  { title: "Returns", href: "/returns" },
  { title: "Payment Options", href: "/payment-options" },
  { title: "Contact Us", href: "/contact-us" },
];

export const footerContacts = [
  { title: "Github", href: "https://github.com/berezenko04" },
  { title: "Ankerdine Crescent, SE18 3LQ", href: "https://maps.app.goo.gl/WWFFsVYGtapeyhYaA" },
];

export const privacyMenu = [
  { title: "Terms Of Use", href: "/terms-of-use" },
  { title: "Privacy & Cookie Policy", href: "/privacy-and-policy" },
];

export const profileMenu = [
  { title: "Account", href: "", icon: PersonOutline },
  { title: "Wish List", href: "wishlist", icon: FavoriteBorder },
  { title: "Settings", href: "settings", icon: SettingsOutlined },
  { title: "My Reviews", href: "reviews", icon: RateReviewOutlined },
  { title: "My Orders", href: "orders", icon: ShoppingCartCheckoutOutlined },
  { title: "Shipping Address", href: "shipping-address", icon: RateReviewOutlined },
  { title: "Payment", href: "payment", icon: PaymentOutlined },
];
