import { PaymentMethods, Sizes } from '@/types/enums.types';

export type CreateOrderBody = {
  shippingAddressId: string;
  shippingMethod: string;
  paymentMethodId: string;
};

export type CreateOrderResponse = {
  orderNumber: string;
  url: string;
};

export type GetAllOrdersResponse = {
  orders: Order[];
  total: number;
};

export type Order = {
  id: string;
  orderNumber: number;
  shippingAddress: string;
  shippingMethod: string;
  trackingNumber: string;
  subtotal: number;
  shipmentCost: number;
  paymentMethod: PaymentMethods;
  createdAt: Date;
  items: OrderItem[];
};

export type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  discount: number | null;
  size: Sizes;
  product: {
    posterUrl: string;
    title: string;
  };
};
