import { Box, Stack, Typography } from "@mui/material";

// components
import ProductPrice from "@/components/features/product/Price";

type CartItemProps = {
  imgSrc: string;
  title: string;
  price: number;
  discount: number | null;
};

const CartItem: React.FC<CartItemProps> = ({ imgSrc, title, price, discount }) => {
  return (
    <Stack flexDirection="row" alignItems="flex-start" gap={3}>
      <Box
        component="img"
        sx={{ width: 180, height: 240, objectFit: "cover", objectPosition: "center" }}
        src={imgSrc}
      />
      <Stack gap={2}>
        <Stack>
          <Typography variant="medium">{title}</Typography>
          <ProductPrice price={price} discount={discount} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CartItem;
