import { useQuery } from '@tanstack/react-query';
import { Stack } from '@mui/material';

// components
import Order from './Item';

// api
import OrdersService from '@/api/orders/orders.service';

const Orders: React.FC = () => {
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: OrdersService.getAll,
  });

  console.log(orders);

  return (
    <Stack>
      {orders?.orders.map((order) => (
        <Order />
      ))}
    </Stack>
  );
};

export default Orders;
