import { Grid } from '@mui/material';

// components
import CheckoutCart from '@/components/features/checkout/Cart';

const Checkout: React.FC = () => {
  return (
    <Grid container>
      <Grid size={{ xs: 8 }}></Grid>
      <Grid size={{ xs: 4 }}>
        <CheckoutCart />
      </Grid>
    </Grid>
  );
};

export default Checkout;
