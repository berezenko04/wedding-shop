import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// components
import ProductPrice from "@/components/features/product/Price";
import ProductDiscount from "@/components/features/product/Discount";
import Counter from "@/components/ui/Counter";

// api
import CartService from "@/api/cart/cart.service";

// types
import { UpdateCartBody, CartItem } from "@/api/cart/cart.types";

// icons
import { DeleteOutline } from "@mui/icons-material";

type CartItemProps = CartItem & {};

const CartItem: React.FC<CartItemProps> = ({ id, size, quantity, product }) => {
  const queryClient = useQueryClient();

  const { mutate: updateQuantity, isPending } = useMutation({
    mutationFn: (dto: UpdateCartBody) => CartService.updateCart(dto),
    onMutate: async (dto) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData<CartItem[]>(["cart"]);

      queryClient.setQueryData<CartItem[]>(["cart"], (old) =>
        old?.map((item) =>
          item.product.id === dto.productId && item.size === dto.size
            ? { ...item, quantity: item.quantity + dto.change }
            : item
        )
      );

      return { previousCart };
    },
    onError: (_err, _dto, context) => {
      queryClient.setQueryData(["cart"], context?.previousCart);
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(["cart"], updatedCart);
    },
  });

  const handleRemove = async () => {
    const result = await CartService.deleteFromCart(id);
    queryClient.setQueryData(["cart"], result);
  };

  return (
    <Stack flexDirection="row" alignItems="flex-start" gap={3} py={2}>
      <Box
        component="img"
        sx={{ flexShrink: 0, width: 180, height: 240, objectFit: "cover", objectPosition: "center" }}
        src={product.posterUrl}
      />
      <Stack gap={2} sx={{ width: "100%" }}>
        <Stack gap={0.5}>
          <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={3}>
            <Typography variant="medium">{product.title}</Typography>
            <IconButton size="small" onClick={handleRemove}>
              <DeleteOutline sx={{ color: "grey.300" }} />
            </IconButton>
          </Stack>
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
              disabled={isPending}
              onChange={(change) => updateQuantity({ productId: product.id, change, size })}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CartItem;
