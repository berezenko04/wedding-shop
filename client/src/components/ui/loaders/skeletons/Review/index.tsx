import { Skeleton, Stack } from '@mui/material';

const ReviewSkeleton: React.FC = () => {
  return (
    <Stack gap={2}>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center" gap={4}>
        <Stack flexDirection="row" gap={2} sx={{ flex: 1, minWidth: 0 }}>
          <Skeleton variant="circular" animation="wave" width={48} height={48} sx={{ flexShrink: 0 }} />
          <Stack sx={{ flex: 1, minWidth: 0 }}>
            <Skeleton variant="rectangular" animation="wave" height={24} sx={{ width: { xs: '60%', sm: 120 } }} />
            <Skeleton variant="text" animation="wave" height={24} sx={{ width: { xs: '80%', sm: 160 } }} />
          </Stack>
        </Stack>
      </Stack>

      <Stack gap={0.5}>
        {[...Array(3)].map((_, idx) => (
          <Skeleton
            key={idx}
            variant="text"
            animation="wave"
            height={24}
            sx={{
              width: { xs: '100%', sm: 700 },
              ...(idx === 2 && { width: { xs: '65%', sm: 420 } }),
            }}
          />
        ))}
      </Stack>

      <Skeleton variant="text" animation="wave" height={24} sx={{ width: { xs: '50%', sm: 200 } }} />
    </Stack>
  );
};

export default ReviewSkeleton;
