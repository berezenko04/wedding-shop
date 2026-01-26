import { Stack, TableCell, TableRow } from '@mui/material';

// components
import ChipShipped from '@/components/ui/chips/ChipShipped';
import DownloadButton from '@/components/ui/buttons/Download';
import PrintButton from '@/components/ui/buttons/Print';

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
      <TableCell>
        <Stack flexDirection="row" alignItems="center" gap={0.5}>
          <PrintButton />
          <DownloadButton />
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default Order;
