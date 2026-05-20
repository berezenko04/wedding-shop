import { Stack, Typography, Divider } from "@mui/material";

const PrivacyAndPolicy: React.FC = () => {
  return (
    <Stack spacing={4}>
      <Typography variant="h3">Privacy & Policy</Typography>

      <Stack spacing={1}>
        <Typography variant="h6">🔐 Information We Collect</Typography>
        <Typography>
          We may collect personal information such as your name, email address, and other details you provide when using
          our website or services.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">📊 How We Use Your Information</Typography>
        <Typography>
          The information we collect is used to provide, improve, and personalize our services, as well as to
          communicate with you regarding updates or support.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">🍪 Cookies</Typography>
        <Typography>
          We may use cookies and similar technologies to enhance user experience, analyze website traffic, and improve
          our services.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">🤝 Data Sharing</Typography>
        <Typography>
          We do not sell, trade, or rent your personal information to third parties. Your data may be shared only when
          required by law or to provide our services.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">🛡 Data Security</Typography>
        <Typography>
          We take reasonable measures to protect your personal information from unauthorized access, alteration, or
          disclosure.
        </Typography>
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="h6">🔄 Changes to This Policy</Typography>
        <Typography>
          We reserve the right to update or modify this Privacy Policy at any time. Changes will be effective
          immediately upon posting on this page.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PrivacyAndPolicy;
