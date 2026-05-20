import { Box, Collapse, Stack, TableCell, TableRow } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import { useRef, useState } from 'react';

// components
import ChipShipped from '@/components/ui/ChipShipped';
import DownloadButton from '@/components/ui/Buttons/Download';
import PrintButton from '@/components/ui/Buttons/Print';
import ExpandButton from '@/components/ui/Buttons/Expand';
import ShippingInfoTable from './ShippingInfoTable';
import ProductsTable from './ProductsTable';
import OrderTotal from './Total';

// api
import OrdersService from '@/api/orders/orders.service';

// hooks
import { useFileDownload } from '@/hooks/useFileDownload';

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
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const download = useFileDownload();

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const grandTotal = subtotal + shipmentCost;

  const exportCsv = async () => {
    const data = await OrdersService.getCsv(id);
    download(data, `order-#${orderNumber}-${createdAt}.csv`, 'text/csv;charset=utf-8;');
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
              <OrderTotal subtotal={subtotal} shipmentCost={shipmentCost} grandTotal={grandTotal} />
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>
      <Box sx={{ display: 'none' }}>
        <Box ref={contentRef}>
          <Stack sx={{ p: 2, gap: 3 }}>
            <ShippingInfoTable
              shippingAddress={shippingAddress}
              paymentMethod={paymentMethod}
              trackingNumber={trackingNumber}
            />
            <ProductsTable items={items} />
            <OrderTotal subtotal={subtotal} shipmentCost={shipmentCost} grandTotal={grandTotal} />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Order;
