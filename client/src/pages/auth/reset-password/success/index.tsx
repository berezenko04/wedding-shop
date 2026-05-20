import { Button } from '@mui/material';

// components
import AuthFormLayout from '@/components/features/auth/forms/FormLayout';

const ResetPasswordSuccess: React.FC = () => {
  return (
    <AuthFormLayout
      title="Password reset"
      description="Your password has been successfully reset. Click below to log in magically."
      isBackToLogin={false}
    >
      <Button href="/login" color="primary" variant="contained" size="small">
        Log in
      </Button>
    </AuthFormLayout>
  );
};

export default ResetPasswordSuccess;
