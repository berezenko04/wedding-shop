import { Button, Link, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

// components
import AuthFormLayout from "@/components/forms/auth/FormLayout";
import FormField from "@/components/ui/layout/FormField";

// api
import AuthService from "@/api/auth/auth.service";

type LoginFormFields = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>();

  const onSubmit = async (formData: LoginFormFields) => {
    // await AuthService.register(data);
    // toast.success("Registration successful");
    // navigate("/login");
  };

  return (
    <AuthFormLayout
      title="Login an account"
      description="Start your experience with us."
      footerText="Don`t have an account?"
      footerLinkText="Register"
      footerLinkHref="/register"
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

        <Link href="/forgot-password" variant="underlined" sx={{ alignSelf: "flex-end" }}>
          Forgot Password?
        </Link>

        <Button type="submit" variant="contained" size="small" disabled={isSubmitting}>
          Login
        </Button>
      </Stack>
    </AuthFormLayout>
  );
};

export default LoginForm;
