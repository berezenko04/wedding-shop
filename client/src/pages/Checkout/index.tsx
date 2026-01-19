import { Grid, Stack, Typography } from '@mui/material';

// components
import CheckoutCart from '@/components/features/checkout/Cart';
import ShippingAddress from '@/components/features/checkout/ShippingAddress';
import PaymentMethod from '@/components/features/checkout/PaymentMethod';

const Checkout: React.FC = () => {
  return (
    <Stack gap={4}>
      <Typography variant="h3">Checkout</Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 7 }}>
          <Stack gap={3}>
            <ShippingAddress />
            <PaymentMethod />
          </Stack>
        </Grid>
        <Grid size={{ xs: 5 }}>
          <CheckoutCart />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Checkout;
