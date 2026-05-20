import { Stack, Typography, Divider } from "@mui/material";

const ShippingAndDelivery = () => {
  return (
    <Stack spacing={4}>
      <Typography variant="h3">
        Shipping & Delivery
      </Typography>

      <Stack spacing={1}>
        <Typography variant="h6">📦 Order Processing</Typography>
        <Typography>
          All orders are processed within <b>1–3 business days</b> after payment confirmation. You will receive an email
          once your order has been shipped.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">🚚 Shipping Methods</Typography>
        <Typography>
          • Standard Shipping: 7–14 business days
          <br />• Express Shipping: 3–7 business days
        </Typography>
        <Typography>Delivery times are estimates and may vary due to customs or local courier delays.</Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">🌍 International Shipping</Typography>
        <Typography>
          We ship worldwide. International orders may be subject to customs duties or taxes. These charges are the
          responsibility of the customer.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">📍 Order Tracking</Typography>
        <Typography>
          Once your order is shipped, a tracking number will be sent via email. Tracking information may take up to 24
          hours to update.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ShippingAndDelivery;
