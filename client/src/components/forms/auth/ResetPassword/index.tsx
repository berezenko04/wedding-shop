import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

// components
import AuthFormLayout from "@/components/forms/auth/FormLayout";
import FormField from "@/components/ui/layout/FormField";

// api
import AuthService from "@/api/auth/auth.service";

type ResetPasswordFormFields = {
  password: string;
  repeatPassword: string;
};

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const resetToken = params.get("resetToken");

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormFields>();

  const password = watch("password");

  const onSubmit = async (formData: ResetPasswordFormFields) => {
    if (!resetToken) return navigate("/login");

    await AuthService.resetPassword({ resetToken, password: formData.password });
    navigate("/reset-password-success");
  };

  return (
    <AuthFormLayout
      title="Set new password"
      description="Your new password must be different to previously used passwords."
    >
      <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ gap: 1.5 }}>
        <FormField label="Password">
          <TextField
            placeholder="****************"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password is too short (minimum 8 characters)" },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </FormField>

        <FormField label="Repeat password">
          <TextField
            placeholder="****************"
            type="password"
            {...register("repeatPassword", {
              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords do not match",
            })}
            error={!!errors.repeatPassword}
            helperText={errors.repeatPassword?.message}
          />
        </FormField>

        <Button type="submit" variant="contained" size="small" disabled={isSubmitting}>
          Reset password
        </Button>
      </Stack>
    </AuthFormLayout>
  );
};

export default ResetPasswordForm;
