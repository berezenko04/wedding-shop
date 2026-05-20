import { Button, Stack, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

// components
import FormField from '@/components/ui/Layout/FormField';

// api
import UserService from '@/api/user/user.service';

// hooks
import { useUser } from '@/hooks/useUser';

// types
import { User } from '@/api/user/user.types';

type UpdateUserFormFields = {
  firstName: string;
  lastName: string;
};

const UpdateUserForm: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: user } = useUser();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserFormFields>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    },
  });

  const onSubmit = async (data: UpdateUserFormFields) => {
    try {
      const updatedUser = await UserService.updateUser(data);
      queryClient.setQueryData<User>(['user'], updatedUser);
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Failed to update profile');
    }
  };

  return (
    <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ gap: 2, maxWidth: 600, width: '100%' }}>
      <FormField label="Email" labelFontSize={16}>
        <TextField placeholder="Enter email" slotProps={{ input: { readOnly: true } }} value={user?.email} />
      </FormField>
      <FormField label="First Name" labelFontSize={16}>
        <TextField
          placeholder="Enter your first name"
          {...register('firstName', {
            required: 'First name is required',
            minLength: { value: 2, message: 'First name is too short (minimum 2 characters)' },
            maxLength: { value: 50, message: 'First name is too long (maximum 50 characters)' },
            pattern: {
              value: /^[A-Za-zА-Яа-я\s'-]+$/,
              message: 'First name can only contain letters, spaces, hyphens, and apostrophes',
            },
          })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
      </FormField>
      <FormField label="Last Name" labelFontSize={16}>
        <TextField
          placeholder="Enter your last name"
          {...register('lastName', {
            required: 'Last name is required',
            minLength: { value: 2, message: 'Last name is too short (minimum 2 characters)' },
            maxLength: { value: 50, message: 'Last name is too long (maximum 50 characters)' },
            pattern: {
              value: /^[A-Za-zА-Яа-я\s'-]+$/,
              message: 'Last name can only contain letters, spaces, hyphens, and apostrophes',
            },
          })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
      </FormField>

      <Button type="submit" variant="contained" size="small" disabled={isSubmitting} sx={{ maxWidth: 'max-content' }}>
        Save Profile
      </Button>
    </Stack>
  );
};

export default UpdateUserForm;
