// types
import { PaymentMethods, SortBy } from "@/types/enums.types";

export const companies = [
  { src: "/logos/bussiness-insider.png", alt: "Business Insider" },
  { src: "/logos/forbes.png", alt: "Forbes" },
  { src: "/logos/washington-post.png", alt: "Washington Post" },
  { src: "/logos/amazon.png", alt: "Amazon" },
  { src: "/logos/square.png", alt: "Square" },
];

export const sortByCatalog = [
  { label: "Recommended", value: "none" },
  { label: "Price: Low to High", value: SortBy.PRICE_ASC },
  { label: "Price: High to Low", value: SortBy.PRICE_DESC },
];

export const paymentMethodsList = [
  { label: "PayPal", value: PaymentMethods.PAYPAL, images: ["paypal.png"] },
  { label: "Amazon", value: PaymentMethods.AMAZON, images: ["amazon.png"] },
  { label: "Card", value: PaymentMethods.CARD, images: ["visa.png"] },
];
