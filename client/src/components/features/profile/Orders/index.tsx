import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableCellProps, TableHead, TableRow } from '@mui/material';

// components
import Order from './Item';

// api
import OrdersService from '@/api/orders/orders.service';

const Orders: React.FC = () => {
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: OrdersService.getAll,
  });

  const columns = [
    { sx: { width: 40 }, title: '' },
    { sx: { minWidth: 140 }, title: 'Order ID' },
    { sx: { minWidth: 160 }, title: 'Date' },
    { sx: { minWidth: 50 }, title: 'Items' },
    { sx: { minWidth: 60 }, title: 'Total Amount' },
    { sx: { minWidth: 60 }, title: 'Status' },
    { sx: { minWidth: 90 }, title: 'Action', align: 'right' },
  ];

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map(({ sx, title, align }) => (
            <TableCell sx={sx} align={(align as TableCellProps['align']) ?? 'left'}>
              {title}
            </TableCell>
          ))}
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
