import { Stack, Typography } from '@mui/material';

// components
import OutlinedBlock from '@/components/ui/layout/OutlinedBlock';
import EditButton from '@/components/ui/buttons/Edit';

const PaymentMethod: React.FC = () => {
  return (
    <OutlinedBlock sx={{ gap: 2 }}>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={4}>
        <Typography variant="medium" textTransform="uppercase">
          Payment Method
        </Typography>
        <EditButton href="/profile/payment" />
      </Stack>
      <Stack gap={1}>
        
      </Stack>
    </OutlinedBlock>
  );
};

export default PaymentMethod;
