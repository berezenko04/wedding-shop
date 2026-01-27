import { Stack, TableCell, TableRow } from '@mui/material';

// components
import ChipShipped from '@/components/ui/chips/ChipShipped';
import DownloadButton from '@/components/ui/buttons/Download';
import PrintButton from '@/components/ui/buttons/Print';
import ExpandButton from '@/components/ui/buttons/Expand';

// types
import { Order } from '@/api/orders/orders.types';

const Order: React.FC<Order> = ({ orderNumber, subtotal, shipmentCost, createdAt, items }) => {
  const grandTotal = (subtotal + shipmentCost).toFixed(2);

  return (
    <TableRow>
      <TableCell>
        <ExpandButton />
      </TableCell>
      <TableCell>#{orderNumber}</TableCell>
      <TableCell>{new Date(createdAt).toLocaleDateString('en-GB')}</TableCell>
      <TableCell>{items.length}</TableCell>
      <TableCell>{grandTotal} USD</TableCell>
      <TableCell>
        <ChipShipped />
      </TableCell>
      <TableCell>
        <Stack flexDirection="row" alignItems="center" justifyContent="flex-end" gap={0.5}>
          <PrintButton />
          <DownloadButton />
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default Order;
