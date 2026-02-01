import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Pagination, Stack, Table, TableBody, TableCell, TableCellProps, TableHead, TableRow } from '@mui/material';

// components
import Order from './Item';

// api
import OrdersService from '@/api/orders/orders.service';

// constants
import { PAGE_LIMIT } from '@/constants';

const Orders: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const { data: orders } = useQuery({
    queryKey: ['orders', page],
    queryFn: async () => OrdersService.getAll({ page, limit: PAGE_LIMIT }),
  });

  const pages = orders?.total ? Math.ceil(orders.total / PAGE_LIMIT) : 0;

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
    <Stack gap={3}>
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
      {pages > 1 && <Pagination page={page} count={pages} onChange={(_, val) => setPage(val)} />}
    </Stack>
  );
};

export default Orders;
