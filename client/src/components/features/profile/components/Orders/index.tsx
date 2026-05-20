import { useState } from 'react';
import { Stack, Table, TableBody, TableCell, TableCellProps, TableHead, TableRow } from '@mui/material';

// components
import Order from './Item';
import EmptyState from '@/components/ui/EmptyState';
import OrdersSkeleton from '@/components/ui/Loaders/Skeletons/Orders';
import CustomPagination from '@/components/ui/Layout/CustomPagination';

// hooks
import { useOrders } from '@/hooks/useOrders';

// data
import { PAGE_LIMIT } from '@/data/main';

// icons
import { RemoveShoppingCartOutlined } from '@mui/icons-material';

const Orders: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const { data: orders, isLoading } = useOrders(page);

  const pages = orders?.total ? Math.ceil(orders.total / PAGE_LIMIT) : 0;

  const columns = [
    { sx: { width: 40 }, title: '' },
    { sx: { minWidth: 140 }, title: 'Order ID' },
    { sx: { minWidth: 160 }, title: 'Date' },
    { sx: { minWidth: 50 }, title: 'Items' },
    { sx: { minWidth: 160 }, title: 'Total Amount' },
    { sx: { minWidth: 60 }, title: 'Status' },
    { sx: { minWidth: 90 }, title: 'Action', align: 'right' },
  ];

  return (
    <Stack gap={3}>
      {isLoading ? (
        <OrdersSkeleton />
      ) : orders && orders?.total > 0 ? (
        <Stack
          sx={{
            width: '100%',
            overflowX: 'auto',
          }}
        >
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                {columns.map(({ sx, title, align }) => (
                  <TableCell key={title} sx={sx} align={(align as TableCellProps['align']) ?? 'left'}>
                    {title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.orders.map((order) => (
                <Order key={order.id} {...order} />
              ))}
            </TableBody>
          </Table>
          {pages > 1 && <CustomPagination page={page} count={pages} onChange={(_, val) => setPage(val)} />}
        </Stack>
      ) : (
        <EmptyState
          title="Your orders is empty"
          description="Your orders will appear here once you make a purchase."
          icon={RemoveShoppingCartOutlined}
        />
      )}
    </Stack>
  );
};

export default Orders;
