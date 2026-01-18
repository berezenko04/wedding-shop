import { Stack, Typography } from '@mui/material'

// components
import OutlinedBlock from '@/components/ui/layout/OutlinedBlock'


const CheckoutCart: React.FC = () => {
  return (
    <OutlinedBlock>
        <Stack>
            <Typography variant='medium' textTransform='uppercase'>Cart</Typography>
        </Stack>
        <Stack>
            <Stack></Stack>
        </Stack>
        <Stack gap={1}>
            <Stack flexDirection='row' justifyContent='space-between' gap={4}>
                <Typography>Total</Typography>
                <Typography>8600 USD</Typography>
            </Stack>
            <Stack flexDirection='row' justifyContent='space-between' gap={4}>
                <Typography>Discount</Typography>
                <Typography>20%</Typography>
            </Stack>
            <Stack flexDirection='row' justifyContent='space-between' gap={4}>
                <Typography>Delivery</Typography>
                <Typography>20 USD</Typography>
            </Stack>
            <Stack flexDirection='row' justifyContent='space-between' gap={4}>
                <Typography variant='medium' fontSize={24} textTransform='uppercase'>Grand Total</Typography>
                <Typography variant='medium' fontSize={24} textTransform='uppercase'>8620 USD</Typography>
            </Stack>
        </Stack>
    </OutlinedBlock>
  )
}

export default CheckoutCart