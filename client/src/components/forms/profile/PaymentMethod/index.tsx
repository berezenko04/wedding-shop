import { Button, Checkbox, FormControlLabel, Grid, RadioGroup, Stack, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

// components
import FormField from "@/components/ui/layout/FormField";
import PaymentMethodItem from "@/components/features/profile/PaymentMethodItem";

// api
import ShippingService from "@/api/shipping/shipping.service";

// types
import { PaymentMethods } from "@/types/enums.types";

// data
import { paymentMethodsList } from "@/data/main";

type PaymentMethodFormFields = {
  paymentMethod: PaymentMethods;
  email: string;
  cardNumber: string;
  cardExp: string;
  cardCvv: string;
  cardHolder: string;
};

type PaymentMethodFormProps = {
  mode: "create" | "update";
  defaultValues?: Partial<PaymentMethodFormFields>;
  addressId?: string;
  afterSubmit: () => void;
};

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ mode, defaultValues, afterSubmit, addressId }) => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PaymentMethodFormFields>({
    defaultValues: { paymentMethod: PaymentMethods.PAYPAL, ...defaultValues },
  });

  const onSubmit = async ({ city, country, address, primary }: PaymentMethodFormFields) => {
    const formattedAddress = `${country}, ${city}, ${address}`;
    let result;

    if (mode === "create") {
      result = await ShippingService.create({
        address: formattedAddress,
        primary,
      });
    } else if (mode === "update" && addressId) {
      result = await ShippingService.update({
        addressId,
        address: formattedAddress,
        primary,
      });
    }

    reset();
    queryClient.setQueryData(["shipping"], result);
    afterSubmit();
  };

  return (
    <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ gap: 2, width: "100%" }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 4 }}>
          <Controller
            control={control}
            name="paymentMethod"
            rules={{ required: "Please select payment method" }}
            render={({ field }) => (
              <RadioGroup value={field.value} onChange={(e) => field.onChange(e.target.value)} sx={{ gap: 1 }}>
                {paymentMethodsList.map((i) => (
                  <PaymentMethodItem key={i.value} {...i} />
                ))}
              </RadioGroup>
            )}
          />
        </Grid>
        <Grid size={{ xs: 8 }}>
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
                  message: "Address can only contain letters, numbers, spaces, commas, dots, hyphens, and slashes",
                },
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </FormField>

          <Controller
            control={control}
            name="primary"
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Is primary payment method"
              />
            )}
          />

          <Button type="submit" variant="contained" size="small" disabled={isSubmitting}>
            {mode === "create" ? "Add" : "Edit"} Shipping Address
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default PaymentMethodForm;
