import { Divider, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

// components
import OutlinedBlock from '@/components/ui/layout/OutlinedBlock';
import CartItem from './Item';

// types
import { CartItem as CartItemType } from '@/api/cart/cart.types';

// constants
import { DELIVERY_COST } from '@/constants';

const CheckoutCart: React.FC = () => {
  const queryClient = useQueryClient();

  const cart = queryClient.getQueryData<CartItemType[]>(['cart']) || [];

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * (1 - (item?.product.discount ?? 0)) * item.quantity,
    0,
  );
  return (
    <OutlinedBlock flex={1} maxHeight="80vh">
      <Stack gap={4} flex={1}>
        <Typography variant="medium" textTransform="uppercase">
          Cart
        </Typography>
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
            <Typography>{total.toFixed(2)} USD</Typography>
          </Stack>
          {/* <Stack flexDirection="row" justifyContent="space-between" gap={4}>
            <Typography>Discount</Typography>
            <Typography>20%</Typography>
          </Stack> */}
          <Stack flexDirection="row" justifyContent="space-between" gap={4}>
            <Typography>Delivery</Typography>
            <Typography>{DELIVERY_COST} USD</Typography>
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between" gap={4}>
            <Typography variant="medium" fontSize={24} textTransform="uppercase">
              Grand Total
            </Typography>
            <Typography variant="medium" fontSize={24} textTransform="uppercase">
              {(total + DELIVERY_COST).toFixed(2)} USD
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </OutlinedBlock>
  );
};

export default CheckoutCart;
