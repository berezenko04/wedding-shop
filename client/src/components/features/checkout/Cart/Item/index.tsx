import { Box, Stack } from '@mui/material'

// types
import { CartItem } from '@/api/cart/cart.types'

const CartItem: React.FC<CartItem> = ({product}) => {
  return (
    <Stack flexDirection='row' gap={3}>
        <Box component='img' src={product.posterUrl} sx={{width: 120, height: 160, objectFit: 'cover', objectPosition: 'center'}}/>
    </Stack>
  )
}

export default CartItem