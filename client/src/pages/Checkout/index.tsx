import { Grid, Stack } from '@mui/material';

// components
import CheckoutCart from '@/components/features/checkout/Cart';
import ShippingAddress from '@/components/features/checkout/ShippingAddress';

const Checkout: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 8 }}>
        <Stack gap={3}>
          <ShippingAddress />
        </Stack>
      </Grid>
      <Grid size={{ xs: 4 }}>
        <CheckoutCart />
      </Grid>
    </Grid>
  );
};

export default Checkout;
