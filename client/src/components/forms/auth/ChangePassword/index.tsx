import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// components
import FormField from "@/components/ui/layout/FormField";

// api
import AuthService from "@/api/auth/auth.service";

type ChangePasswordFormFields = {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

const ChangePasswordForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormFields>();

  const password = watch("newPassword");

  const onSubmit = async (data: ChangePasswordFormFields) => {
    const result = await AuthService.changePassword(data);
    reset();
    toast.success(result.message);
  };

  return (
    <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ gap: 2 }}>
      <FormField label="Old Password" labelFontSize={16}>
        <TextField
          placeholder="****************"
          type="password"
          {...register("oldPassword", {
            required: "Password is required",
          })}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword?.message}
        />
      </FormField>

      <FormField label="New Password" labelFontSize={16}>
        <TextField
          placeholder="****************"
          type="password"
          {...register("newPassword", {
            required: "New password is required",
            minLength: { value: 8, message: "Password is too short (minimum 8 characters)" },
          })}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
        />
      </FormField>

      <FormField label="Repeat New Password" labelFontSize={16}>
        <TextField
          placeholder="****************"
          type="password"
          {...register("repeatNewPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          error={!!errors.repeatNewPassword}
          helperText={errors.repeatNewPassword?.message}
        />
      </FormField>

      <Stack flexDirection="row" alignItems="center" gap={2}>
        <Button type="submit" variant="contained" size="small" disabled={isSubmitting}>
          Change Password
        </Button>
        <Button href="/forgot-password" type="button" variant="outlined" color="grey" size="small">
          Forgot Password
        </Button>
      </Stack>
    </Stack>
  );
};

export default ChangePasswordForm;
