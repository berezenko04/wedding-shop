import { Box, Stack, Typography } from "@mui/material";

// components
import ProductPrice from "@/components/features/product/Price";

// types
import { CartItem } from "@/api/cart/cart.types";

type CartItemProps = CartItem & {};

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  return (
    <Stack flexDirection="row" alignItems="flex-start" gap={3}>
      <Box
        component="img"
        sx={{ width: 180, height: 240, objectFit: "cover", objectPosition: "center" }}
        src={product.posterUrl}
      />
      <Stack gap={2}>
        <Stack>
          <Typography variant="medium">{product.title}</Typography>
          <ProductPrice price={product.price} discount={product.discount} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CartItem;
