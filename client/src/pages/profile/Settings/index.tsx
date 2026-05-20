import { Stack, Typography } from '@mui/material';

// components
import Sessions from '@/components/features/profile/components/Sessions';
import ChangePasswordForm from '@/components/features/auth/forms/ChangePassword';

const SettingsPage: React.FC = () => {
  return (
    <Stack gap={7} sx={{ width: '100%' }}>
      <Stack gap={4}>
        <Typography variant="h3">Settings</Typography>
        <Sessions />
      </Stack>
      <Stack gap={4}>
        <Typography variant="h3">Password</Typography>
        <ChangePasswordForm />
      </Stack>
    </Stack>
  );
};

export default SettingsPage;
