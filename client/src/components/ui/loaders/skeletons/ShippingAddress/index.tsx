import { Skeleton, Stack } from '@mui/material';

import OutlinedBlock from '@/components/ui/Layout/OutlinedBlock';

const ShippingAddressSkeleton: React.FC = () => {
  return (
    <OutlinedBlock>
      <Stack flexDirection="row" justifyContent="space-between" gap={4} alignItems="flex-start">
        <Stack gap={1} sx={{ flex: 1, minWidth: 0 }}>
          <Skeleton variant="text" animation="wave" height={30} sx={{ width: { xs: '100%', sm: 400 } }} />
          {[...Array(3)].map((_, idx) => (
            <Skeleton key={idx} variant="text" animation="wave" height={24} sx={{ width: { xs: '65%', sm: 240 } }} />
          ))}
        </Stack>
      </Stack>
    </OutlinedBlock>
  );
};

export default ShippingAddressSkeleton;
