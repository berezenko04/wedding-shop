import { Sizes } from "@/types/enums.types";

export type CartItem = {
  id: string;
  quantity: number;
  size: Sizes;
  product: {
    id: string;
    title: string;
    posterUrl: string;
    price: number;
    discount: number | null;
  };
};

export type AddToCartBody = {
  productId: string;
  size: Sizes;
  quantity: number;
};
