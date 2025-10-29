import { Sizes } from "@/types/enums.types";

export type CartItem = {
  id: string;
  quantity: number;
  size: Sizes;
  product: {
    title: string;
    posterUrl: string;
    price: number;
    discount: number | null;
  };
};
