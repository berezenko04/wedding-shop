import { Skeleton, Stack } from '@mui/material';

// components
import OutlinedBlock from '@/components/ui/layout/OutlinedBlock';

const PaymentMethodSkeleton: React.FC = () => {
  return (
    <OutlinedBlock>
      <Stack flexDirection="row" justifyContent="space-between" gap={4} alignItems="flex-start">
        <Stack flexDirection="row" alignItems="center" gap={2}>
          <Skeleton variant="rounded" animation="wave" width={60} height={40} />
          <Stack>
            <Skeleton variant="text" animation="wave" width={360} height={24} />
            <Skeleton variant="text" animation="wave" width={280} height={24} />
          </Stack>
        </Stack>
      </Stack>
    </OutlinedBlock>
  );
};

export default PaymentMethodSkeleton;
