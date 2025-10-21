import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

// components
import AuthFormLayout from "@/components/forms/auth/FormLayout";
import FormField from "@/components/ui/layout/FormField";

// api
import AuthService from "@/api/auth/auth.service";

type ForgotPasswordFormFields = {
  email: string;
};

const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormFields>();

  const onSubmit = async ({ email }: ForgotPasswordFormFields) => {
    const result = await AuthService.sendForgotPasswordOtp(email);
    toast.success(result.message);
    navigate("/verify-otp", { state: { email } });
  };

  return (
    <AuthFormLayout title="Forgot Password?" description="No worries, we’ll send you reset instructions">
      <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ gap: 1.5 }}>
        <FormField label="Email">
          <TextField
            placeholder="Enter email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </FormField>

        <Button type="submit" variant="contained" size="small" disabled={isSubmitting}>
          Send OTP
        </Button>
      </Stack>
    </AuthFormLayout>
  );
};

export default ForgotPasswordForm;
