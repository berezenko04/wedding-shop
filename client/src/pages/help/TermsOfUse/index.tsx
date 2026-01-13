import { Stack, Typography, Divider } from "@mui/material";

const TermsOfUse = () => {
  return (
    <Stack spacing={4}>
      <Typography variant="h3">Terms of Use</Typography>

      <Stack spacing={1}>
        <Typography variant="h6">📜 Acceptance of Terms</Typography>
        <Typography>
          By accessing and using this website, you agree to be bound by these Terms of Use. If you do not agree with any
          part of the terms, please do not use our services.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">🛍 Use of the Website</Typography>
        <Typography>
          You agree to use this website for lawful purposes only and in a way that does not infringe the rights of,
          restrict, or inhibit anyone else’s use of the website.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">📦 Products & Services</Typography>
        <Typography>
          All product descriptions, pricing, and availability are subject to change without notice. We reserve the right
          to modify or discontinue any service at any time.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">🔐 Intellectual Property</Typography>
        <Typography>
          All content on this website, including text, graphics, logos, and images, is the property of Sandrela and is
          protected by applicable intellectual property laws.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">⚠ Limitation of Liability</Typography>
        <Typography>
          We shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or
          inability to use this website or our services.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">🔄 Changes to Terms</Typography>
        <Typography>
          We reserve the right to update or modify these Terms of Use at any time. Changes will be effective immediately
          upon posting on this page.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default TermsOfUse;
