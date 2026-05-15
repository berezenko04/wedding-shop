import { Grid, Stack, Typography } from '@mui/material';

// components
import CheckoutCart from '@/components/features/checkout/Cart';
import CheckoutForm from '@/components/forms/Checkout';

const Checkout: React.FC = () => {
  return (
    <Stack gap={4}>
      <Typography variant="h3">Checkout</Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 6, xl: 7 }}>
          <CheckoutForm />
        </Grid>
        <Grid size={{ xs: 6, xl: 5 }}>
          <CheckoutCart />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Checkout;
