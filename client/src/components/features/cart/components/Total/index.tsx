import { calcFinalPrice } from '@/utils/calcFinalPrice';
import { Stack, Typography } from '@mui/material';

type CartTotalProps = {
  items: { price: number; quantity: number; discount: number | null }[];
};

const CartTotal: React.FC<CartTotalProps> = ({ items }) => {
  return (
    <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={4}>
      <Typography fontSize={24} variant="medium" textTransform="uppercase">
        Total
      </Typography>
      <Typography fontSize={24} variant="medium">
        {items
          .reduce((acc, { price, discount, quantity }) => acc + calcFinalPrice(price, discount) * quantity, 0)
          .toFixed(2)}
        &nbsp;USD
      </Typography>
    </Stack>
  );
};

export default CartTotal;
