import { Stack, Typography } from "@mui/material";

// components
import EmptyState from "@/components/features/profile/EmptyState";

const ShippingPage: React.FC = () => {
  return (
    <Stack gap={4} sx={{ width: "100%" }}>
      <Typography variant="h3">Shipping Address</Typography>
      <EmptyState
        title="No shipping address saved"
        description="Checkout faster by saving a shipping address"
        buttonText="Add Shipping Address"
        onClick={() => {}}
      />
    </Stack>
  );
};

export default ShippingPage;
