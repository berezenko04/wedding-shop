import { Box, Stack, Typography } from '@mui/material';

// components
import ProductPrice from '@/components/features/product/Price';
import ProductDiscount from '@/components/features/product/Discount';

// types
import { CartItem } from '@/api/cart/cart.types';

const CartItem: React.FC<CartItem> = ({ quantity, size, product }) => {
  return (
    <Stack flexDirection="row" gap={3}>
      <Box
        component="img"
        src={product.posterUrl}
        sx={{ width: { xs: 80, sm: 180 }, height: { xs: 100, sm: 240 }, objectFit: 'cover', objectPosition: 'center' }}
      />
      <Stack gap={2} sx={{ flex: 1, minWidth: 0 }}>
        <Stack gap={1}>
          <Typography variant="medium" textTransform="uppercase" noWrap sx={{ minWidth: 0 }}>
            {product.title}
          </Typography>
          <ProductPrice
            price={product.price}
            discount={product.discount}
            sx={{
              flexDirection: { xs: 'column', lg: 'row' },
              alignItems: { xs: 'flex-start', lg: 'center' },
              gap: { xs: 0.5, lg: 2 },
            }}
          />
          <ProductDiscount discount={product.discount} />
        </Stack>
        <Stack
          flexDirection={{ xs: 'column', lg: 'row' }}
          alignItems={{ xs: 'flex-start', lg: 'center' }}
          gap={{ xs: 0.5, lg: 2 }}
        >
          <Typography variant="medium" fontSize={16} textTransform="uppercase">
            Size: {size || 'Accessory'}
          </Typography>
          <Typography variant="medium" fontSize={16} textTransform="uppercase">
            Quantity: {quantity}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CartItem;
