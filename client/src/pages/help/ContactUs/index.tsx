import { Stack, Typography, Divider, Link } from "@mui/material";

const ContactUs: React.FC = () => {
  return (
    <Stack spacing={4}>
      <Typography variant="h3">Contact Us</Typography>

      <Stack spacing={1}>
        <Typography variant="h6">📩 Get in Touch</Typography>
        <Typography>
          If you have any questions, feedback, or need assistance, feel free to reach out to us using the contact
          information below.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">📧 Email Support</Typography>
        <Typography>For general inquiries and support requests, contact us at:</Typography>
        <Typography fontWeight={500}>
          <Link href="mailto:help@sandrela.xyz" underline="hover">
            help@sandrela.xyz
          </Link>
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">⏱ Support Hours</Typography>
        <Typography>
          Our support team is available:
          <br />• Monday – Friday
          <br />• 9:00 AM – 6:00 PM (GMT)
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">📍 Business Information</Typography>
        <Typography>
          Sandrela Digital Store
          <br />
          Online-only business
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">💬 Response Time</Typography>
        <Typography>
          We aim to respond to all inquiries within <b>24–48 hours</b>.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ContactUs;
