import { Collapse, Stack, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';

// components
import ChipShipped from '@/components/ui/chips/ChipShipped';
import DownloadButton from '@/components/ui/buttons/Download';
import PrintButton from '@/components/ui/buttons/Print';
import ExpandButton from '@/components/ui/buttons/Expand';
import ShippingInfoTable from './ShippingInfoTable';

// api
import OrdersService from '@/api/orders/orders.service';

// types
import { Order } from '@/api/orders/orders.types';
import ProductsTable from './ProductsTable';

const Order: React.FC<Order> = ({
  id,
  orderNumber,
  subtotal,
  shipmentCost,
  shippingAddress,
  paymentMethod,
  trackingNumber,
  createdAt,
  items,
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const grandTotal = (subtotal + shipmentCost).toFixed(2);

  const exportCsv = async () => {
    const data = await OrdersService.getCsv(id);

    const blob = new Blob([data], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `order-#${orderNumber}-${createdAt}.csv`;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <TableRow hover sx={{ cursor: 'pointer' }} onClick={() => setIsOpened((prev) => !prev)}>
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
            <DownloadButton onClick={exportCsv} />
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={7} sx={{ p: 0 }}>
          <Collapse in={isOpened} timeout="auto" unmountOnExit>
            <Stack sx={{ p: 2, gap: 3 }}>
              <ShippingInfoTable
                shippingAddress={shippingAddress}
                paymentMethod={paymentMethod}
                trackingNumber={trackingNumber}
              />
              <ProductsTable items={items} />
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Order;
