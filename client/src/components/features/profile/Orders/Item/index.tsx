import { TableCell, TableRow } from '@mui/material';

// components
import ChipShipped from '@/components/ui/chips/ChipShipped';

// types
import { Order } from '@/api/orders/orders.types';

const Order: React.FC<Order> = ({ orderNumber, createdAt, items }) => {
  return (
    <TableRow>
      <TableCell />
      <TableCell>#{orderNumber}</TableCell>
      <TableCell>{new Date(createdAt).toLocaleDateString('en-GB')}</TableCell>
      <TableCell>{items.length}</TableCell>
      <TableCell>{(2).toFixed(2)} USD</TableCell>
      <TableCell>
        <ChipShipped />
      </TableCell>
    </TableRow>
  );
};

export default Order;
