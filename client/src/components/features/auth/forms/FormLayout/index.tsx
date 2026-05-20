import { Button, Link, Stack, Typography } from '@mui/material';

// icons
import { KeyboardArrowLeft } from '@mui/icons-material';

type FormLayoutProps = {
  title: string;
  description: string;
  isBackToLogin?: boolean;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  children: React.ReactNode;
};

const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  description,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
  isBackToLogin = true,
}) => {
  return (
    <Stack gap={4} sx={{ width: '100%', alignItems: 'center', maxWidth: 420 }}>
      <Stack alignItems="center" gap={1.5}>
        <Typography variant="h3" textAlign="center">
          {title}
        </Typography>
        <Typography textAlign="center">{description}</Typography>
      </Stack>
      <Stack gap={3} sx={{ width: '100%' }}>
        {children}
        {footerText && (
          <Stack flexDirection="row" alignItems="center" justifyContent="center" gap={1}>
            <Typography>{footerText}</Typography>
            <Link variant="underlined" href={footerLinkHref}>
              {footerLinkText}
            </Link>
          </Stack>
        )}
        {isBackToLogin && (
          <Button href="/login" startIcon={<KeyboardArrowLeft />} color="grey" size="small">
            Back to Login
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default FormLayout;
