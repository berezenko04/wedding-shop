import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

const CheckoutSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state?.orderNumber) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  if (!state?.orderNumber) {
    return null;
  }

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 6 }}>
        <Box
          component="img"
          src="/404.webp"
          sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </Grid>
      <Grid size={{ xs: 6 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Stack gap={4}>
          <Typography variant="h3">Order #{state.orderNumber}</Typography>
          <Typography
            variant="h1"
            sx={(theme) => ({
              color: `${theme.palette.primary.main} !important`,
            })}
          >
            Thanks for your order!
          </Typography>
          <Typography>The transaction was successful! Your order has been added to your order list.</Typography>
          <Stack flexDirection="row" gap={4} alignItems="center">
            <Button href="/profile/orders" variant="outlined" color="primary">
              Go to the order list
            </Button>
            <Button href="/" variant="contained" color="primary">
              Go to the main page
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CheckoutSuccessPage;
