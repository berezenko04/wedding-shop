import { useQuery } from '@tanstack/react-query';

// api
import OrdersService from '@/api/orders/orders.service';

// data
import { PAGE_LIMIT } from '@/data/main';

export const useOrders = (page: number = 1) => {
  return useQuery({
    queryKey: ['orders', page],
    queryFn: () => OrdersService.getAll({ page, limit: PAGE_LIMIT }),
    enabled: page !== undefined && page !== null,
  });
};
