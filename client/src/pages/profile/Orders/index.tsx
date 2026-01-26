import Orders from '@/components/features/profile/Orders';
import { Stack, Typography } from '@mui/material';

const OrdersPage: React.FC = () => {
  return (
    <Stack gap={2}>
      <Typography variant="h3">Orders</Typography>
      <Orders />
    </Stack>
  );
};

export default OrdersPage;
