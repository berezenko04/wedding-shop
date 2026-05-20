import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

type ShippingInfoTableProps = {
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber: string;
};

const ShippingInfoTable: React.FC<ShippingInfoTableProps> = ({ shippingAddress, paymentMethod, trackingNumber }) => {
  const columns = [
    { sx: { minwidth: 200 }, title: 'Shipping Address' },
    { sx: { minWidth: 200 }, title: 'Billing Address' },
    { sx: { minWidth: 180 }, title: 'Shipping Method' },
    { sx: { minWidth: 200 }, title: 'Payment Method' },
    { sx: { minWidth: 140 }, title: 'Tracking Number' },
  ];

  return (
    <Table sx={{ minWidth: 1000 }}>
      <TableHead>
        <TableRow>
          {columns.map(({ sx, title }) => (
            <TableCell key={title} sx={sx}>
              {title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{shippingAddress}</TableCell>
          <TableCell>Same as shipping address</TableCell>
          <TableCell>DHL Express</TableCell>
          <TableCell>{paymentMethod}</TableCell>
          <TableCell>{trackingNumber}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ShippingInfoTable;
