import { Button, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

// components
import AuthFormLayout from '@/components/features/auth/forms/FormLayout';
import FormField from '@/components/ui/Layout/FormField';

// api
import AuthService from '@/api/auth/auth.service';

type RegisterFormFields = {
  email: string;
  fullName: string;
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

  const password = watch('password');

  const onSubmit = async (formData: RegisterFormFields) => {
    const { repeatPassword, fullName, ...data } = formData;
    void repeatPassword;

    const [firstName, ...rest] = fullName.trim().split(/\s+/);
    const lastName = rest.join(' ');

    if (!firstName) {
      return toast.error('First name is required');
    }
    if (!lastName) {
      return toast.error('Last name is required');
    }

    await AuthService.register({ ...data, firstName, lastName });
    toast.success('Registration successful');
    navigate('/login');
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
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </FormField>

        <FormField label="Full Name">
          <TextField
            placeholder="Enter full name"
            {...register('fullName', {
              required: 'Full name is required',
              validate: (value) => {
                const parts = value.trim().split(/\s+/);
                if (parts.length < 2) return 'Please enter both first and last name';
                if (parts.some((p) => p.length < 2)) return 'Each name must be at least 2 characters';
                if (parts.some((p) => p.length > 32)) return 'Each name must be no more than 32 characters';
                return true;
              },
              pattern: {
                value: /^[A-Za-zА-Яа-яЁёІіЇїЄє\s'-]+$/,
                message: 'Full name can only contain letters, spaces, hyphens, and apostrophes',
              },
            })}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
        </FormField>

        <FormField label="Password">
          <TextField
            placeholder="****************"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password is too short (minimum 8 characters)' },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </FormField>

        <FormField label="Repeat password">
          <TextField
            placeholder="****************"
            type="password"
            {...register('repeatPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords do not match',
            })}
            error={!!errors.repeatPassword}
            helperText={errors.repeatPassword?.message}
          />
        </FormField>

        <Button type="submit" variant="contained" size="small" disabled={isSubmitting}>
          Create Account
        </Button>
      </Stack>
    </AuthFormLayout>
  );
};

export default RegisterForm;
