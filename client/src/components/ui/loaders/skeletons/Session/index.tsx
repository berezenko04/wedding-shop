import { Skeleton, Stack } from '@mui/material';

const SessionSkeleton: React.FC = () => {
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      gap={3}
      px={3}
      py={2}
      sx={(theme) => ({ border: `1px solid ${theme.palette.grey[100]}` })}
    >
      <Stack flexDirection="row" alignItems="center" gap={2} sx={{ flex: 1, minWidth: 0 }}>
        <Skeleton variant="rectangular" animation="wave" width={40} height={40} sx={{ flexShrink: 0 }} />
        <Stack sx={{ flex: 1, minWidth: 0 }}>
          <Skeleton variant="text" animation="wave" sx={{ width: { xs: '100%', sm: 300 } }} />
          <Skeleton variant="text" animation="wave" sx={{ width: { xs: '70%', sm: 200 } }} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SessionSkeleton;
