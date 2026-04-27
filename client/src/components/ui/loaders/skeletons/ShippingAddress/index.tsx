import { Skeleton, Stack } from '@mui/material';

// components
import OutlinedBlock from '@/components/ui/layout/OutlinedBlock';

const ShippingAddressSkeleton: React.FC = () => {
  return (
    <OutlinedBlock>
      <Stack flexDirection="row" justifyContent="space-between" gap={4} alignItems="flex-start">
        <Stack gap={1}>
          <Skeleton variant="text" animation="wave" width={400} height={30} />
          {[...Array(3)].map((_, idx) => (
            <Skeleton key={idx} variant="text" animation="wave" width={240} height={24} />
          ))}
        </Stack>
      </Stack>
    </OutlinedBlock>
  );
};

export default ShippingAddressSkeleton;
