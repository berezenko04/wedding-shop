import { Stack, Typography, Divider } from "@mui/material";

const Returns = () => {
  return (
    <Stack spacing={3}>
      <Typography variant="h3">Returns & Refunds</Typography>

      <Stack spacing={1}>
        <Typography variant="h6">↩️ Return Policy</Typography>
        <Typography>
          You may return eligible items within <b>14 days</b> of receiving your order. Items must be unused and in their
          original packaging.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">📋 Return Conditions</Typography>
        <Typography>
          • Item must be unused and undamaged
          <br />• Original packaging is required
          <br />• Proof of purchase must be provided
          <br />• Digital products are non-refundable
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">💳 Refund Process</Typography>
        <Typography>
          Once we receive and inspect the returned item, we will notify you about the refund status. Approved refunds
          are processed within <b>5–10 business days</b>.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">🚚 Return Shipping</Typography>
        <Typography>
          Customers are responsible for return shipping costs unless the item arrived damaged or incorrect.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Returns;
