import { Button, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

// components
import ShippingAddress from '@/components/features/checkout/components/ShippingAddress';
import PaymentMethod from '@/components/features/checkout/components/PaymentMethod';

// service
import OrdersService from '@/api/orders/orders.service';

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
      shippingAddressId: primaryAddress?.id,
      shippingMethod: 'COURIER',
    },
  });

  const paymentMethodId = watch('paymentMethodId');
  const shippingAddressId = watch('shippingAddressId');

  const isDisabled = isSubmitting || !paymentMethodId || !shippingAddressId;

  const onSubmit = async (data: CheckoutFormFields) => {
    try {
      const { url } = await OrdersService.createOrder(data);
      window.location.href = url;
    } catch {
      toast.error('Failed to place order. Please try again.');
    } finally {
      reset();
    }
  };

  useEffect(() => {
    if (primaryAddress?.id) {
      reset((prev) => ({
        ...prev,
        shippingAddressId: primaryAddress.id,
      }));
    }
  }, [primaryAddress?.id, reset]);

  return (
    <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} gap={3}>
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
