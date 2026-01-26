import { Stack, Typography } from '@mui/material';

// components
import Orders from '@/components/features/profile/Orders';

const OrdersPage: React.FC = () => {
  return (
    <Stack gap={2}>
      <Typography variant="h3">Orders</Typography>
      <Orders />
    </Stack>
  );
};

export default OrdersPage;
