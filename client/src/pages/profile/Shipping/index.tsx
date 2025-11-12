import { Stack, Typography } from "@mui/material";

// components
import Addresses from "@/components/features/profile/Addresses";

const ShippingPage: React.FC = () => {
  return (
    <Stack gap={4} sx={{ width: "100%" }}>
      <Typography variant="h3">Shipping Address</Typography>
      <Addresses />
    </Stack>
  );
};

export default ShippingPage;
