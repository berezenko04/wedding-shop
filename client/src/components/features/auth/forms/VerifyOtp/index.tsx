import { Button, Stack, Typography } from '@mui/material';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { MuiOtpInput } from 'mui-one-time-password-input';

// components
import AuthFormLayout from '@/components/features/auth/forms/FormLayout';

// api
import AuthService from '@/api/auth/auth.service';

// types
import { VerifyOtpBody } from '@/api/auth/auth.types';

const VerifyOtpForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpBody>({
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async ({ otp }: { otp: string }) => {
    const { resetToken } = await AuthService.verifyOtp({ email, otp });
    navigate('/verify-otp-success', { state: { resetToken } });
  };

  if (!email) return <Navigate to="/login" replace />;

  return (
    <AuthFormLayout
      title="Check your email"
      description={`We sent a password reset code to ${email}`}
      footerText="Didn’t receive the email?"
      footerLinkText="Click to resend"
      footerLinkHref="/forgot-password"
    >
      <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ gap: 1.5 }}>
        <Controller
          name="otp"
          control={control}
          rules={{
            required: 'OTP is required',
            minLength: {
              value: 4,
              message: 'OTP must be 4 digits',
            },
            maxLength: {
              value: 4,
              message: 'OTP must be 4 digits',
            },
          }}
          render={({ field }) => (
            <MuiOtpInput
              {...field}
              length={4}
              sx={{ gap: { xs: 1.5, md: 3 } }}
              TextFieldsProps={{
                InputProps: {
                  sx: (theme) => ({
                    minWidth: { xs: 56, md: 92 },
                    width: '100%',
                    height: { xs: 64, md: 80 },
                    fontSize: { xs: 40, md: 50 },
                    fontWeight: 700,
                    textAlign: 'center',
                    justifyItems: 'center',
                    '& input': {
                      color: theme.palette.primary.main,
                    },
                  }),
                },
              }}
            />
          )}
        />
        {errors.otp && (
          <Typography color="error" variant="body2" sx={{ textAlign: 'center' }}>
            {errors.otp.message}
          </Typography>
        )}
        <Button type="submit" variant="contained" size="small" disabled={isSubmitting}>
          {isSubmitting ? 'Verifying...' : 'Verify Email'}
        </Button>
      </Stack>
    </AuthFormLayout>
  );
};

export default VerifyOtpForm;
