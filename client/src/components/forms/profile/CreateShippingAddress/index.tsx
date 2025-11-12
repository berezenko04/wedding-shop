import { Button, Stack, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

// components
import FormField from "@/components/ui/layout/FormField";

// api
import ShippingService from "@/api/shipping/shipping.service";

type CreateShippingAddressFormFields = {
  country: string;
  city: string;
  address: string;
  primary: boolean;
};

const CreateShippingAddressForm: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateShippingAddressFormFields>();

  const onSubmit = async ({ city, country, address, primary }: CreateShippingAddressFormFields) => {
    const result = await ShippingService.create({
      address: `${country}, ${city}, ${address}`,
      primary,
    });
    reset();
    queryClient.setQueryData(["shipping"], result);
  };

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ gap: 2, width: "100%" }}
    >
      <FormField label="Country" labelFontSize={16}>
        <TextField
          placeholder="Enter your country"
          {...register("country", {
            required: "Country is required",
            minLength: { value: 3, message: "Country name must be at least 3 characters" },
            maxLength: { value: 40, message: "Country name must be at most 40 characters" },
            pattern: {
              value: /^[A-Za-zА-Яа-яёЁ\s'-]+$/,
              message: "Country name can only contain letters, spaces, hyphens, and apostrophes",
            },
          })}
          error={!!errors.country}
          helperText={errors.country?.message}
        />
      </FormField>

      <FormField label="City" labelFontSize={16}>
        <TextField
          placeholder="Enter your city"
          {...register("city", {
            required: "City is required",
            minLength: { value: 2, message: "City name must be at least 2 characters" },
            maxLength: { value: 40, message: "City name must be at most 40 characters" },
            pattern: {
              value: /^[A-Za-zА-Яа-яёЁ\s'-]+$/,
              message: "City name can only contain letters, spaces, hyphens, and apostrophes",
            },
          })}
          error={!!errors.city}
          helperText={errors.city?.message}
        />
      </FormField>

      <FormField label="Address" labelFontSize={16}>
        <TextField
          placeholder="Enter your address"
          {...register("address", {
            required: "Address is required",
            minLength: { value: 5, message: "Address must be at least 5 characters" },
            maxLength: { value: 100, message: "Address must be at most 100 characters" },
            pattern: {
              value: /^[A-Za-zА-Яа-яёЁ0-9\s.,'/-]+$/,
              message:
                "Address can only contain letters, numbers, spaces, commas, dots, hyphens, and slashes",
            },
          })}
          error={!!errors.address}
          helperText={errors.address?.message}
        />
      </FormField>

      <Button type="submit" variant="contained" size="small" disabled={isSubmitting}>
        Add Shipping address
      </Button>
    </Stack>
  );
};

export default CreateShippingAddressForm;
