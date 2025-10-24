import { PickerItemType } from "@/components/ui/Picker";
import { Sex, SortBy } from "@/types/enums.types";

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
