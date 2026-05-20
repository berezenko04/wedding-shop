import { Skeleton, Stack } from '@mui/material';

// components
import OutlinedBlock from '@/components/ui/Layout/OutlinedBlock';

const PaymentMethodSkeleton: React.FC = () => {
  return (
    <OutlinedBlock>
      <Stack flexDirection="row" justifyContent="space-between" gap={4} alignItems="flex-start">
        <Stack flexDirection="row" alignItems="center" gap={2} sx={{ minWidth: 0, flex: 1 }}>
          <Skeleton variant="rounded" animation="wave" width={60} height={40} sx={{ flexShrink: 0 }} />
          <Stack sx={{ minWidth: 0, flex: 1 }}>
            <Skeleton variant="text" animation="wave" height={24} sx={{ width: { xs: '100%', sm: 360 } }} />
            <Skeleton variant="text" animation="wave" height={24} sx={{ width: { xs: '75%', sm: 280 } }} />
          </Stack>
        </Stack>
      </Stack>
    </OutlinedBlock>
  );
};

export default PaymentMethodSkeleton;
