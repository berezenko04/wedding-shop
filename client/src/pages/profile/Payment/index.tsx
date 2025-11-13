import { Stack, Typography } from "@mui/material";

// components
import PaymentMethods from "@/components/features/profile/PaymentMethods";

const PaymentPage: React.FC = () => {
  return (
    <Stack gap={4} sx={{ width: "100%" }}>
      <Typography variant="h3">Payment methods</Typography>
      <PaymentMethods />
    </Stack>
  );
};

export default PaymentPage;
