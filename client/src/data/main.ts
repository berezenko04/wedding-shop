import { PickerItemType } from "@/components/ui/Picker";

// types
import { PaymentMethods, Sex, SortBy } from "@/types/enums.types";

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

export const sexOptionsFilter: PickerItemType<Sex>[] = [
  { label: "For him", value: Sex.MALE },
  { label: "For her", value: Sex.FEMALE },
];

export const paymentMethodsList = [
  { label: "Paypal", value: PaymentMethods.PAYPAL, images: ["paypal.png"] },
  { label: "Amazon", value: PaymentMethods.AMAZON, images: ["amazon.png"] },
  { label: "Card", value: PaymentMethods.CARD, images: ["mastercard.png", "visa.png"] },
];
