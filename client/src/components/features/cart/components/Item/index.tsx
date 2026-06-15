import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// components
import ProductPrice from '@/components/features/product/components/Price';
import ProductDiscount from '@/components/features/product/components/Discount';
import Counter from '@/components/ui/Counter';

// api
import CartService from '@/api/cart/cart.service';

// types
import type { UpdateCartBody, CartItem } from '@/api/cart/cart.types';

// icons
import { DeleteOutline } from '@mui/icons-material';

type Props = CartItem & {};

const CartItem: React.FC<Props> = ({ id, size, quantity, product }) => {
  const queryClient = useQueryClient();

  const { mutate: updateQuantity, isPending } = useMutation({
    mutationFn: (dto: UpdateCartBody) => CartService.updateCart(dto),
    onMutate: async (dto) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData<CartItem[]>(['cart']);

      queryClient.setQueryData<CartItem[]>(['cart'], (old) =>
        old?.map((item) =>
          item.product.id === dto.productId && item.size === dto.size
            ? { ...item, quantity: item.quantity + dto.change }
            : item,
        ),
      );

      return { previousCart };
    },
    onError: (_err, _dto, context) => {
      queryClient.setQueryData(['cart'], context?.previousCart);
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(['cart'], updatedCart);
    },
  });

  const handleRemove = async () => {
    const result = await CartService.deleteFromCart(id);
    queryClient.setQueryData(['cart'], result);
  };

  return (
    <Stack flexDirection="row" alignItems="flex-start" gap={3} py={2}>
      <Box
        component="img"
        sx={{
          flexShrink: 0,
          width: { xs: 80, sm: 180 },
          height: { xs: 100, sm: 240 },
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        src={product.posterUrl}
      />
      <Stack gap={{ xs: 1, sm: 2 }} sx={{ flex: 1, minWidth: 0 }}>
        <Stack gap={0.5}>
          <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={1}>
            <Typography variant="medium" noWrap sx={{ minWidth: 0 }}>
              {product.title}
            </Typography>
            <IconButton size="small" onClick={handleRemove} sx={{ flexShrink: 0 }}>
              <DeleteOutline sx={{ color: 'grey.300' }} />
            </IconButton>
          </Stack>
          <ProductPrice
            price={product.price}
            discount={product.discount}
            sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'align-center' } }}
          />
          <ProductDiscount discount={product.discount} />
        </Stack>
        <Stack gap={{ xs: 0.5, sm: 1 }}>
          <Typography variant="medium" fontSize={16} textTransform="uppercase">
            Size: {size || 'Accessory'}
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
