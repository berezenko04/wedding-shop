import { httpDelete, httpGet, httpPost } from "@/middlewares/axios.middleware";

// types
import { AddToCartBody, CartItem } from "./cart.types";
import { BaseResponseData } from "@/types/base.types";

const R = {
  cart: "/cart",
} as const;

const CartService = {
  async getAll() {
    return httpGet<CartItem[]>(R.cart);
  },
  async addToCart(body: AddToCartBody) {
    return httpPost<CartItem[]>(R.cart, body);
  },
  async deleteFromCart(id: string) {
    return httpDelete<BaseResponseData>(R.cart, { params: { id } });
  },
};

export default CartService;
