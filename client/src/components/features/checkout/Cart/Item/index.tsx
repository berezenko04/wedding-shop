import { Box, Stack, Typography } from '@mui/material'

// components
import ProductPrice from '@/components/features/product/Price'
import ProductDiscount from '@/components/features/product/Discount'

// types
import { CartItem } from '@/api/cart/cart.types'



const CartItem: React.FC<CartItem> = ({ quantity, size, product }) => {
  return (
    <Stack flexDirection='row' gap={3}>
      <Box component='img' src={product.posterUrl} sx={{ width: 120, height: 160, objectFit: 'cover', objectPosition: 'center' }} />
      <Stack gap={2}>
        <Stack gap={1}>
          <Typography variant='medium' textTransform='uppercase'>{product.title}</Typography>
          <ProductPrice price={product.price} discount={product.discount} />
          <ProductDiscount discount={product.discount} />
        </Stack>
        <Stack flexDirection='row' alignItems='center' gap={2}>
          <Typography variant='medium' fontSize={16} textTransform='uppercase'>Size: {size}</Typography>
          <Typography variant='medium' fontSize={16} textTransform='uppercase'>Quantity: {quantity}</Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default CartItem