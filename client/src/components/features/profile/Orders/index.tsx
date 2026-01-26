import { useQuery } from '@tanstack/react-query';
import { Table, TableCell, TableHead, TableRow } from '@mui/material';

// components
import Order from './Item';

// api
import OrdersService from '@/api/orders/orders.service';

const Orders: React.FC = () => {
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: OrdersService.getAll,
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Order ID</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Items</TableCell>
          <TableCell>Total Amount</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      {orders?.orders.map((order) => (
        <Order {...order} />
      ))}
    </Table>
  );
};

export default Orders;
