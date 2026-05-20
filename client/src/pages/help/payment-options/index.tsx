import { Stack, Typography, Divider } from "@mui/material";

const PaymentOptions: React.FC = () => {
  return (
    <Stack spacing={4}>
      <Typography variant="h3">Payment Options</Typography>

      <Stack spacing={1}>
        <Typography variant="h6">💳 Accepted Payment Methods</Typography>
        <Typography>
          We offer multiple secure payment options to make your checkout experience fast and convenient.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">🏦 Cards</Typography>
        <Typography>
          • Visa
          <br />• MasterCard
          <br />• American Express
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">🪙 Digital Payments</Typography>
        <Typography>
          • Apple Pay
          <br />• Google Pay
          <br />• PayPal
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">🔐 Payment Security</Typography>
        <Typography>
          All payments are processed through secure and encrypted gateways. We do not store your card details on our
          servers.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PaymentOptions;
