import { Collapse, Stack, TableCell, TableRow } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import { useRef, useState } from 'react';

// components
import ChipShipped from '@/components/ui/chips/ChipShipped';
import DownloadButton from '@/components/ui/buttons/Download';
import PrintButton from '@/components/ui/buttons/Print';
import ExpandButton from '@/components/ui/buttons/Expand';
import ShippingInfoTable from './ShippingInfoTable';
import ProductsTable from './ProductsTable';
import OrderTotal from './Total';

// api
import OrdersService from '@/api/orders/orders.service';

// types
import { Order } from '@/api/orders/orders.types';

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
  const contentRef = useRef<HTMLTableRowElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const grandTotal = subtotal + shipmentCost;

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
      <TableRow sx={{ '.MuiTableCell-root': { borderBottom: 0 } }}>
        <TableCell>
          <ExpandButton onClick={() => setIsOpened((prev) => !prev)} />
        </TableCell>
        <TableCell>#{orderNumber}</TableCell>
        <TableCell>{new Date(createdAt).toLocaleDateString('en-GB')}</TableCell>
        <TableCell>{items.length}</TableCell>
        <TableCell>{grandTotal.toFixed(2)} USD</TableCell>
        <TableCell>
          <ChipShipped />
        </TableCell>
        <TableCell>
          <Stack flexDirection="row" alignItems="center" justifyContent="flex-end" gap={0.5}>
            <PrintButton onClick={reactToPrintFn} />
            <DownloadButton onClick={exportCsv} />
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow ref={contentRef}>
        <TableCell colSpan={7} sx={{ p: 0 }}>
          <Collapse in={isOpened} timeout="auto" unmountOnExit>
            <Stack sx={{ p: 2, gap: 3 }}>
              <ShippingInfoTable
                shippingAddress={shippingAddress}
                paymentMethod={paymentMethod}
                trackingNumber={trackingNumber}
              />
              <ProductsTable items={items} />
              <OrderTotal subtotal={subtotal} shipmentCost={shipmentCost} grandTotal={grandTotal} />
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Order;
