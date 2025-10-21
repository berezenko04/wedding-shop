import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

// components
import AuthFormLayout from "@/components/forms/auth/FormLayout";
import FormField from "@/components/ui/layout/FormField";

// api
import AuthService from "@/api/auth/auth.service";

type RegisterFormFields = {
  email: string;
  password: string;
  repeatPassword: string;
};

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormFields>();

  const password = watch("password");

  const onSubmit = async (formData: RegisterFormFields) => {
    const { repeatPassword, ...data } = formData;
    void repeatPassword;

    await AuthService.register(data);
    toast.success("Registration successful");
    navigate("/login");
  };

  return (
    <AuthFormLayout
      title="Create an account"
      description="Start your experience with us."
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerLinkHref="/login"
      isBackToLogin={false}
    >
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
          Register
        </Button>
      </Stack>
    </AuthFormLayout>
  );
};

export default RegisterForm;
