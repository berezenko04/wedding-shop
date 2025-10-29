import { httpGet } from "@/middlewares/axios.middleware";

// types
import { CartItem } from "./cart.types";

const R = {
  all: "/cart",
} as const;

const CartService = {
  async getAll() {
    return httpGet<CartItem[]>(R.all);
  },
};

export default CartService;
