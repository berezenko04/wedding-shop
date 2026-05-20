import { Divider, Stack, Typography } from '@mui/material';
import { Fragment } from 'react/jsx-runtime';

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
    <OutlinedBlock
      sx={{
        height: '100%',
        maxHeight: { xs: 'none', md: '75vh' },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack gap={4} flex={1} sx={{ overflow: 'hidden' }}>
        <Typography variant="medium" textTransform="uppercase" sx={{ flexShrink: 0 }}>
          Cart
        </Typography>

        <CustomScrollContainer sx={{ flex: 1, overflowY: 'auto', minHeight: { xs: 124, sm: 240 } }}>
          {cart.map((c, idx) => (
            <Fragment key={c.id || idx}>
              <CartItem {...c} />
              <Divider sx={{ mt: 3, mb: idx + 1 !== cart.length ? 3 : 0 }} />
            </Fragment>
          ))}
        </CustomScrollContainer>

        <Stack gap={1} sx={{ flexShrink: 0 }}>
          <Stack flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={{ xs: 0.5, sm: 4 }}>
            <Typography>Total</Typography>
            <Typography>{total.toFixed(2)} USD</Typography>
          </Stack>
          <Stack flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={{ xs: 0.5, sm: 4 }}>
            <Typography>Delivery</Typography>
            <Typography>{DELIVERY_COST} USD</Typography>
          </Stack>
          <Stack flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={{ xs: 1, sm: 4 }}>
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
