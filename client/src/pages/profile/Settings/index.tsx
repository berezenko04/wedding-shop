import { Stack, Typography } from "@mui/material";

// components
import Sessions from "@/components/features/profile/Sessions";

const SettingsPage: React.FC = () => {
  return (
    <Stack gap={4} sx={{ width: "100%" }}>
      <Typography variant="h3">Settings</Typography>
      <Sessions />
    </Stack>
  );
};

export default SettingsPage;
