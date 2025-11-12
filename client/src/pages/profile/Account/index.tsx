import { Stack, Typography } from "@mui/material";

// components
import UpdateUserForm from "@/components/forms/profile/UpdateUser";

const AccountPage: React.FC = () => {
  return (
    <Stack gap={2}>
      <Typography variant="medium" textTransform="uppercase" fontSize={24}>
        Profile Information
      </Typography>
      <UpdateUserForm />
    </Stack>
  );
};

export default AccountPage;
