import { Stack, Typography } from "@mui/material";

type CartTotalProps = {
  items: { price: number; quantity: number; discount: number | null }[];
};

const CartTotal: React.FC<CartTotalProps> = ({ items }) => {
  return (
    <Stack flexDirection='row' alignItems='center' justifyContent='space-between' gap={4}>
      <Typography fontSize={24} variant="medium" textTransform="uppercase">
        Total
      </Typography>
      <Typography fontSize={24} variant="medium">
        {items.reduce((acc, item) => acc + item.price * (1 - (item?.discount ?? 0)) * item.quantity, 0).toFixed(2)} USD
      </Typography>
    </Stack>
  );
};

export default CartTotal;
