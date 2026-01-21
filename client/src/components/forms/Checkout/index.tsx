import { Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

// components
import ShippingAddress from '@/components/features/checkout/ShippingAddress';
import PaymentMethod from '@/components/features/checkout/PaymentMethod';

type CheckoutFormFields = {
  paymentMethodId: string;
  shippingAddressId: string;
  shippingMethod: string;
};

const CheckoutForm: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CheckoutFormFields>({
    defaultValues: {
      rating: null,
      comment: '',
    },
  });

  const isDisabled = isSubmitting;

  const onSubmit = async (data: CheckoutFormFields) => {
    // try {
    // } finally {
    //   reset();
    // }
  };

  return (
    <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} p={2} gap={3}>
      <ShippingAddress />
      <PaymentMethod />
      <Button
        color="primary"
        variant="contained"
        size="small"
        type="submit"
        disabled={isDisabled}
        sx={{ alignSelf: 'flex-end' }}
      >
        Send
      </Button>
    </Stack>
  );
};

export default CheckoutForm;
