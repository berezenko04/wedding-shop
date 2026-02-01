import { httpGet, httpPost } from '@/middlewares/axios.middleware';

// types
import { CreateOrderBody, CreateOrderResponse, GetAllOrdersResponse } from './orders.types';
import { Pagination } from '@/types/base.types';

const R = {
  orders: '/orders',
  ordersCsv: (id: string) => `/orders/csv/${id}`,
} as const;

const OrdersService = {
  async getAll(params: Pagination) {
    return httpGet<GetAllOrdersResponse>(R.orders, { params });
  },
  async getCsv(id: string) {
    return httpGet<string>(R.ordersCsv(id), { responseType: 'blob' });
  },
  async createOrder(body: CreateOrderBody) {
    return httpPost<CreateOrderResponse>(R.orders, body);
  },
};

export default OrdersService;
