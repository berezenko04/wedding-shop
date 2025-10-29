import { Box, Stack, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// components
import ProductPrice from "@/components/features/product/Price";
import ProductDiscount from "@/components/features/product/Discount";
import Counter from "@/components/ui/Counter";

// api
import CartService from "@/api/cart/cart.service";

// types
import { AddToCartBody, CartItem } from "@/api/cart/cart.types";

type CartItemProps = CartItem & {};

const CartItem: React.FC<CartItemProps> = ({ size, quantity, product }) => {
  const queryClient = useQueryClient();

  const { mutate: updateQuantity } = useMutation({
    mutationFn: (dto: AddToCartBody) => CartService.addToCart(dto),
    onMutate: async (dto) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData<CartItem[]>(["cart"]);
  
      queryClient.setQueryData<CartItem[]>(["cart"], (old) =>
        old?.map((item) =>
          item.product.id === dto.productId && item.size === dto.size
            ? { ...item, quantity: dto.quantity }
            : item
        )
      );
  
      return { previousCart };
    },
    onError: (_err, _dto, context) => {
      queryClient.setQueryData(["cart"], context?.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <Stack flexDirection="row" alignItems="flex-start" gap={3} py={2}>
      <Box
        component="img"
        sx={{ width: 180, height: 240, objectFit: "cover", objectPosition: "center" }}
        src={product.posterUrl}
      />
      <Stack gap={2}>
        <Stack gap={0.5}>
          <Typography variant="medium">{product.title}</Typography>
          <ProductPrice price={product.price} discount={product.discount} />
          <ProductDiscount discount={product.discount} />
        </Stack>
        <Stack gap={1}>
          <Typography variant="medium" fontSize={16} textTransform="uppercase">
            Size: {size}
          </Typography>
          <Stack flexDirection="row" alignItems="center" gap={1.5}>
            <Typography variant="medium" fontSize={16} textTransform="uppercase">
              Quantity:
            </Typography>
            <Counter
              min={1}
              max={5}
              value={quantity}
              onChange={(newQty) => updateQuantity({ productId: product.id, quantity: newQty, size })}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CartItem;
