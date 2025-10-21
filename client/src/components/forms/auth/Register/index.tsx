import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import {  useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

// components
import AuthFormLayout from "@/components/forms/auth/FormLayout";

// // api
// import AuthService from "@/api/auth/auth.service";

// icons
import { BadgeOutlined, PersonOutlineOutlined } from "@mui/icons-material";

type RegisterFormFields = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string;
};

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormFields>();

  const password = watch("password");

  const onSubmit = async (formData: RegisterFormFields) => {
    const { repeatPassword, ...data } = formData;
    void repeatPassword;

    // await AuthService.register(data);
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
        <TextField
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineOutlined />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          {...register("firstName", {
            required: "First name is required",
            minLength: {
              value: 2,
              message: "First name is too short (minimum 2 characters)",
            },
            maxLength: {
              value: 32,
              message: "First name is too long (maximum 32 characters)",
            },
          })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          placeholder="First Name"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeOutlined />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          {...register("lastName", {
            required: "Last name is required",
            minLength: {
              value: 2,
              message: "Last name is too short (minimum 2 characters)",
            },
            maxLength: {
              value: 32,
              message: "Last name is too long (maximum 32 characters)",
            },
          })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          placeholder="Last Name"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeOutlined />
                </InputAdornment>
              ),
            },
          }}
        />
        {/* <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: { value: 8, message: "Password is too short (minimum 8 characters)" },
          }}
          render={({ field }) => (
            <PasswordInput
              placeholder="Password"
              value={field.value || ""}
              setValue={field.onChange}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Controller
          name="repeatPassword"
          control={control}
          rules={{
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          }}
          render={({ field }) => (
            <PasswordInput
              placeholder="Repeat Password"
              value={field.value || ""}
              setValue={field.onChange}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        /> */}
        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
          Register
        </Button>
      </Stack>
    </AuthFormLayout>
  );
};

export default RegisterForm;
