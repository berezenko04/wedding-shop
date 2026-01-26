import { Divider, Stack, Typography } from '@mui/material';

// components
import OutlinedBlock from '@/components/ui/layout/OutlinedBlock';
import CustomScrollContainer from '@/components/ui/layout/CustomScrollContainer';
import CartItem from './Item';

// hooks
import { useCart } from '@/hooks/useCart';

// constants
import { DELIVERY_COST } from '@/constants';

const CheckoutCart: React.FC = () => {
  const { data: cart = [] } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * (1 - (item?.product.discount ?? 0)) * item.quantity,
    0,
  );

  return (
    <OutlinedBlock flex={1} sx={{ maxHeight: '80vh', overflow: 'hidden' }}>
      <Stack gap={4} flex={1}>
        <Typography variant="medium" textTransform="uppercase">
          Cart
        </Typography>
        <CustomScrollContainer sx={{ maxHeight: 600 }}>
          {cart.map((c, idx) => (
            <>
              <CartItem {...c} />
              <Divider sx={{ mt: 3, mb: idx + 1 !== cart.length ? 3 : 0 }} />
            </>
          ))}
        </CustomScrollContainer>
        <Stack gap={1}>
          <Stack flexDirection="row" justifyContent="space-between" gap={4}>
            <Typography>Total</Typography>
            <Typography>{total.toFixed(2)} USD</Typography>
          </Stack>
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
