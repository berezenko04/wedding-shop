import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router';

// components
import ProfileMenu from '@/components/navigation/ProfileMenu';

const ProfileLayout: React.FC = () => {
  return (
    <Stack direction="row" gap={4} flex={1}>
      <ProfileMenu />
      <Box sx={{ width: '100%' }}>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default ProfileLayout;
