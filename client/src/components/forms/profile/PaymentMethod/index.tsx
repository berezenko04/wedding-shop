import { Button, Checkbox, FormControlLabel, Grid, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

// components
import FormField from "@/components/ui/layout/FormField";
import PaymentMethodItem from "@/components/features/profile/PaymentMethodItem";

// api
import PaymentService from "@/api/payment/payment.service";

// types
import { PaymentMethods } from "@/types/enums.types";

// data
import { paymentMethodsList } from "@/data/main";

type PaymentMethodFormFields = {
  method: PaymentMethods;
  primary: boolean;
  email?: string;
  cardNumber?: string;
  cardExp?: string;
  cardCvv?: string;
  cardHolder?: string;
};

type PaymentMethodFormProps = {
  mode: "create" | "update";
  defaultValues?: Partial<PaymentMethodFormFields>;
  paymentId?: string;
  afterSubmit: () => void;
};

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ mode, defaultValues, afterSubmit, paymentId }) => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PaymentMethodFormFields>({
    defaultValues: { method: PaymentMethods.PAYPAL, ...defaultValues },
  });

  const method = watch("method");

  const onSubmit = async (data: PaymentMethodFormFields) => {
    const result = await PaymentService.create(data);

    reset();
    queryClient.setQueryData(["payment"], result);
    afterSubmit();
  };

  return (
    <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ gap: 2, width: "100%" }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 4 }}>
          <Stack gap={2}>
            <Typography variant="medium" textTransform="uppercase">
              Payment Methods
            </Typography>
            <Controller
              control={control}
              name="method"
              rules={{ required: "Please select payment method" }}
              render={({ field }) => (
                <RadioGroup value={field.value} onChange={(e) => field.onChange(e.target.value)} sx={{ gap: 1 }}>
                  {paymentMethodsList.map((i) => (
                    <PaymentMethodItem key={i.value} {...i} />
                  ))}
                </RadioGroup>
              )}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 8 }} sx={{ maxWidth: 560, width: "100%", mx: "auto" }}>
          <Stack gap={2}>
            {method === PaymentMethods.CARD ? (
              <>
                <FormField label="Card Number">
                  <TextField
                    placeholder="**** **** **** ****"
                    {...register("cardNumber", {
                      required: "Card number is required",
                      pattern: {
                        value: /^\d{13,19}$/,
                        message: "Invalid card number",
                      },
                    })}
                    error={!!errors.cardNumber}
                    helperText={errors.cardNumber?.message}
                  />
                </FormField>

                <Stack flexDirection="row" alignItems="center" gap={2}>
                  <FormField label="Card Expiry">
                    <TextField
                      placeholder="12/28"
                      {...register("cardExp", {
                        required: "Expiration date is required",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                          message: "Card expiration must be in MM/YY format",
                        },
                      })}
                      error={!!errors.cardExp}
                      helperText={errors.cardExp?.message}
                    />
                  </FormField>

                  <FormField label="CVV">
                    <TextField
                      placeholder="***"
                      {...register("cardCvv", {
                        required: "CVV is required",
                        pattern: {
                          value: /^\d{3,4}$/,
                          message: "CVV must be 3 or 4 digits",
                        },
                      })}
                      error={!!errors.cardCvv}
                      helperText={errors.cardCvv?.message}
                    />
                  </FormField>
                </Stack>

                <FormField label="Card Holder">
                  <TextField
                    placeholder="John Johnson"
                    {...register("cardHolder", {
                      required: "Card holder name is required",
                      pattern: {
                        value: /^[A-Za-z]+ [A-Za-z]+$/,
                        message: "Name must contain first and last name (letters only)",
                      },
                    })}
                    error={!!errors.cardHolder}
                    helperText={errors.cardHolder?.message}
                  />
                </FormField>
              </>
            ) : (
              <FormField label="Email" labelFontSize={16}>
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
            )}

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
              {mode === "create" ? "Add" : "Edit"} Payment Method
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default PaymentMethodForm;
