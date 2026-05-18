import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router';

// components
import ProfileMenu from '@/components/navigation/ProfileMenu';
import MobileProfileMenu from '@/components/navigation/MobileProfileMenu';

const ProfileLayout: React.FC = () => {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} gap={4} flex={1}>
      <MobileProfileMenu />
      <ProfileMenu />
      <Box sx={{ width: '100%' }}>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default ProfileLayout;
