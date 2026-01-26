import { httpGet, httpPost } from '@/middlewares/axios.middleware';

// types
import { CreateOrderBody, CreateOrderResponse, GetAllOrdersResponse } from './orders.types';

const R = {
  orders: '/orders',
  ordersCsv: (id: string) => `/orders/csv/${id}`,
} as const;

const OrdersService = {
  async getAll() {
    return httpGet<GetAllOrdersResponse>(R.orders);
  },
  async getCsv(id: string) {
    return httpGet<string>(R.ordersCsv(id));
  },
  async createOrder(body: CreateOrderBody) {
    return httpPost<CreateOrderResponse>(R.orders, body);
  },
};

export default OrdersService;
