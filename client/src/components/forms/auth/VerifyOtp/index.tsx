import { Button, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { MuiOtpInput } from "mui-one-time-password-input";

// components
import AuthFormLayout from "@/components/forms/auth/FormLayout";

// api
import AuthService from "@/api/auth/auth.service";

// types
import { VerifyOtpBody } from "@/api/auth/auth.types";

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
      otp: "",
    },
  });

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const onSubmit = async ({ otp }: { otp: string }) => {
    const result = await AuthService.verifyOtp({ email, otp });
    navigate(`/reset-password?token=${result.resetToken}`);
  };

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
            required: "OTP is required",
            minLength: {
              value: 4,
              message: "OTP must be 4 digits",
            },
            maxLength: {
              value: 4,
              message: "OTP must be 4 digits",
            },
          }}
          render={({ field }) => (
            <MuiOtpInput
              {...field}
              length={4}
              TextFieldsProps={{
                InputProps: {
                  sx: (theme) => ({
                    width: 92,
                    height: 80,
                    fontSize: 50,
                    fontWeight: 700,
                    textAlign: "center",
                    "& input": {
                      color: theme.palette.primary.main,
                    },
                  }),
                },
              }}
            />
          )}
        />
        {errors.otp && (
          <Typography color="error" variant="body2" sx={{ textAlign: "center" }}>
            {errors.otp.message}
          </Typography>
        )}
        <Button type="submit" variant="contained" size="small" disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify Email"}
        </Button>
      </Stack>
    </AuthFormLayout>
  );
};

export default VerifyOtpForm;
