import { Divider, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

// components
import OutlinedBlock from '@/components/ui/layout/OutlinedBlock';
import CartItem from './Item';

// types
import { CartItem as CartItemType } from '@/api/cart/cart.types';

const CheckoutCart: React.FC = () => {
  const queryClient = useQueryClient();

  const cart = queryClient.getQueryData<CartItemType[]>(['cart']) || [];

  return (
    <OutlinedBlock flex={1} maxHeight="80vh">
      <Stack gap={4} flex={1}>
        <Stack>
          <Typography variant="medium" textTransform="uppercase">
            Cart
          </Typography>
        </Stack>
        <Stack flex={1}>
          {cart.map((c) => (
            <>
              <CartItem {...c} />
              <Divider sx={{ mt: 3 }} />
            </>
          ))}
        </Stack>
        <Stack gap={1}>
          <Stack flexDirection="row" justifyContent="space-between" gap={4}>
            <Typography>Total</Typography>
            <Typography>8600 USD</Typography>
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between" gap={4}>
            <Typography>Discount</Typography>
            <Typography>20%</Typography>
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between" gap={4}>
            <Typography>Delivery</Typography>
            <Typography>20 USD</Typography>
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between" gap={4}>
            <Typography variant="medium" fontSize={24} textTransform="uppercase">
              Grand Total
            </Typography>
            <Typography variant="medium" fontSize={24} textTransform="uppercase">
              8620 USD
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </OutlinedBlock>
  );
};

export default CheckoutCart;
