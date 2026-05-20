import { Button, Stack } from '@mui/material';
import { useState } from 'react';

// components
import PaymentMethod from './Item';
import EmptyState from '../EmptyState';
import CustomModal from '@/components/ui/layout/CustomModal';
import PaymentMethodForm from '@/components/features/profile/forms/PaymentMethod';
import PaymentMethodSkeleton from '@/components/ui/loaders/skeletons/PaymentMethod';

// hooks
import { useUserPaymentMethods } from '@/hooks/useUserPaymentMethods';

// icons
import { Add } from '@mui/icons-material';

const PaymentMethods: React.FC = () => {
  const [isAddModalOpened, setIsAddModalOpened] = useState<boolean>(false);

  const { data: payment = [], isLoading } = useUserPaymentMethods();

  const handleClose = () => {
    setIsAddModalOpened(false);
  };

  const handleOpen = () => {
    setIsAddModalOpened(true);
  };

  return (
    <Stack gap={2}>
      {isLoading ? (
        [...Array(3)].map((_, idx) => <PaymentMethodSkeleton key={`payment-skeleton-${idx}`} />)
      ) : payment.length > 0 ? (
        payment.map((method) => <PaymentMethod key={method.id} {...method} />)
      ) : (
        <EmptyState
          title="No payment method saved"
          description="Checkout faster by saving a payment method"
          buttonText="Add Payment"
          onClick={handleOpen}
        />
      )}
      {payment.length < 3 && payment.length > 0 && (
        <Button
          startIcon={<Add />}
          variant="outlined"
          color="grey"
          size="small"
          sx={{ width: 'max-content' }}
          onClick={handleOpen}
        >
          Add Payment Method
        </Button>
      )}
      <CustomModal maxWidth={600} title="Add Payment Method" open={isAddModalOpened} onClose={handleClose}>
        <PaymentMethodForm mode="create" afterSubmit={handleClose} />
      </CustomModal>
    </Stack>
  );
};

export default PaymentMethods;
