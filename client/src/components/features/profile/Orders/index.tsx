import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

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
          <TableCell sx={{ width: 40 }} />
          <TableCell sx={{ minWidth: 140 }}>Order ID</TableCell>
          <TableCell sx={{ minWidth: 160 }}>Date</TableCell>
          <TableCell sx={{ minWidth: 50 }}>Items</TableCell>
          <TableCell sx={{ minWidth: 60 }}>Total Amount</TableCell>
          <TableCell sx={{ minWidth: 60 }}>Status</TableCell>
          <TableCell sx={{ minWidth: 90 }} align="right">
            Action
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders?.orders.map((order) => (
          <Order {...order} />
        ))}
      </TableBody>
    </Table>
  );
};

export default Orders;
