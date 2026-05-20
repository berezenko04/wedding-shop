import { Stack, Typography } from '@mui/material';

// components
import UpdateUserForm from '@/components/features/profile/forms/UpdateUser';

const AccountPage: React.FC = () => {
  return (
    <Stack gap={2}>
      <Typography variant="h3">Profile Information</Typography>
      <UpdateUserForm />
    </Stack>
  );
};

export default AccountPage;
