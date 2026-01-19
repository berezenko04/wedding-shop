import { Stack, Typography } from '@mui/material';

// components
import OutlinedBlock from '@/components/ui/layout/OutlinedBlock';

const ShippingAddress: React.FC = () => {
  return (
    <OutlinedBlock>
      <Stack flexDirection="row" alignItems="center" gap={4}>
        <Typography variant="medium" textTransform="uppercase">
          Shipping Address
        </Typography>
      </Stack>
    </OutlinedBlock>
  );
};

export default ShippingAddress;
