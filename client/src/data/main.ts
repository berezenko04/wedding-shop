import { SortBy } from "@/types/enums.types";

export const companies = [
  { src: "/logos/bussiness-insider.png", alt: "Business Insider" },
  { src: "/logos/forbes.png", alt: "Forbes" },
  { src: "/logos/washington-post.png", alt: "Washington Post" },
  { src: "/logos/amazon.png", alt: "Amazon" },
  { src: "/logos/square.png", alt: "Square" },
];

export const sortByCatalog = [
  { label: "Price: Low to High", value: SortBy.PRICE_ASC },
  { label: "Price: High to Low", value: SortBy.PRICE_DESC },
];

export const sexOptionsFilter = [
  { label: "For him", value: "male" },
  { label: "For her", value: "female" },
];
