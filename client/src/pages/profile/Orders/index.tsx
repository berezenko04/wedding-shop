import { Button, Stack, Typography } from '@mui/material';

// components
import Orders from '@/components/features/profile/Orders';

// api
import OrdersService from '@/api/orders/orders.service';

// hooks
import { useFileDownload } from '@/hooks/useFileDownload';
import { useOrders } from '@/hooks/useOrders';

// icons
import { FileDownloadOutlined } from '@mui/icons-material';

const OrdersPage: React.FC = () => {
  const download = useFileDownload();
  const { data: orders } = useOrders();

  const exportAllToCsv = async () => {
    const data = await OrdersService.getAllCsv();
    download(data, `orders.csv`, 'text/csv;charset=utf-8;');
  };

  return (
    <Stack gap={2}>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={4}>
        <Typography variant="h3">Orders</Typography>
        <Button
          variant="outlined"
          color="grey"
          size="small"
          endIcon={<FileDownloadOutlined />}
          onClick={exportAllToCsv}
          disabled={orders?.total === 0}
        >
          Download CSV
        </Button>
      </Stack>
      <Orders />
    </Stack>
  );
};

export default OrdersPage;
