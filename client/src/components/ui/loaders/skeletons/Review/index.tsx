import { Skeleton, Stack } from '@mui/material';

const ReviewSkeleton: React.FC = () => {
  return (
    <Stack gap={2}>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center" gap={4}>
        <Stack flexDirection="row" gap={2}>
          <Skeleton variant="circular" animation="wave" width={48} height={48} />
          <Stack>
            <Skeleton variant="rectangular" animation="wave" width={120} height={24} />
            <Skeleton variant="text" animation="wave" width={160} height={24} />
          </Stack>
        </Stack>
      </Stack>
      <Stack gap={0.5}>
        {[...Array(3)].map((_, idx) => (
          <Skeleton key={idx} variant="text" animation="wave" width={700} height={24} />
        ))}
      </Stack>
      <Skeleton variant="text" animation="wave" width={200} height={24} />
    </Stack>
  );
};

export default ReviewSkeleton;
