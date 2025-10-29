import { httpGet, httpPost } from "@/middlewares/axios.middleware";

// types
import { AddToCartBody, CartItem } from "./cart.types";
import { BaseResponseData } from "@/types/base.types";

const R = {
  all: "/cart",
  add: "/cart",
} as const;

const CartService = {
  async getAll() {
    return httpGet<CartItem[]>(R.all);
  },
  async addToCart(body: AddToCartBody) {
    return httpPost<BaseResponseData>(R.add, body);
  },
};

export default CartService;
