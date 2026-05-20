import { httpDelete, httpGet, httpPatch } from '@/api/axios.middleware';

// types
import { UpdateCartBody, CartItem } from './cart.types';

const R = {
  cart: '/cart',
} as const;

const CartService = {
  async getAll() {
    return httpGet<CartItem[]>(R.cart);
  },
  async updateCart(body: UpdateCartBody) {
    return httpPatch<CartItem[]>(R.cart, body);
  },
  async deleteFromCart(id: string) {
    return httpDelete<CartItem[]>(R.cart, { params: { id } });
  },
};

export default CartService;
