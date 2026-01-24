import { httpGet, httpPost } from '@/middlewares/axios.middleware';

// types
import { CreateOrderBody, Order } from './orders.types';
import { BaseResponseData } from '@/types/base.types';

const R = {
  orders: '/orders',
  ordersCsv: (id: string) => `/orders/csv/${id}`,
} as const;

const OrdersService = {
  async getAll() {
    return httpGet<Order[]>(R.orders);
  },
  async getCsv(id: string) {
    return httpGet<string>(R.ordersCsv(id));
  },
  async createOrder(body: CreateOrderBody) {
    return httpPost<BaseResponseData>(R.orders, body);
  },
};

export default OrdersService;
