import { Button, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

// components
import ShippingAddress from '@/components/features/checkout/ShippingAddress';
import PaymentMethod from '@/components/features/checkout/PaymentMethod';

// hooks
import { useUserShippingAddresses } from '@/hooks/useUserShippingAddresses';

type CheckoutFormFields = {
  paymentMethodId: string;
  shippingAddressId: string;
  shippingMethod: string;
};

const CheckoutForm: React.FC = () => {
  const { data: addresses } = useUserShippingAddresses();

  const primaryAddress = addresses?.find((address) => address.primary);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<CheckoutFormFields>({
    mode: 'onChange',
    defaultValues: {
      paymentMethodId: '',
      shippingAddressId: '',
      shippingMethod: 'COURIER',
    },
  });

  const paymentMethodId = watch('paymentMethodId');
  const shippingAddressId = watch('shippingAddressId');

  const isDisabled = isSubmitting || !paymentMethodId || !shippingAddressId;

  const onSubmit = async (data: CheckoutFormFields) => {
    // try {
    // } finally {
    //   reset();
    // }
  };

  return (
    <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} p={2} gap={3}>
      <ShippingAddress address={primaryAddress?.address} />
      <Controller
        name="paymentMethodId"
        rules={{ required: true }}
        control={control}
        render={({ field }) => <PaymentMethod paymentMethod={field.value} onChange={field.onChange} />}
      />
      <Button color="primary" variant="contained" size="small" type="submit" disabled={isDisabled}>
        Place Order
      </Button>
    </Stack>
  );
};

export default CheckoutForm;
