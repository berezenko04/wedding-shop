import { Button, Stack } from '@mui/material';
import { useState } from 'react';

// components
import Address from './Item';
import EmptyState from '../EmptyState';
import CustomModal from '@/components/ui/layout/CustomModal';
import ShippingAddressForm from '@/components/forms/profile/ShippingAddress';

// hooks
import { useUserShippingAddresses } from '@/hooks/useUserShippingAddresses';

// icons
import { Add } from '@mui/icons-material';

const Addresses: React.FC = () => {
  const [isCreateModalOpened, setIsCreateModalOpened] = useState<boolean>(false);

  const { data: addresses = [] } = useUserShippingAddresses();

  const handleClose = () => {
    setIsCreateModalOpened(false);
  };

  const handleOpen = () => {
    setIsCreateModalOpened(true);
  };

  return (
    <Stack gap={2}>
      {addresses.length > 0 ? (
        addresses.map((address) => <Address {...address} />)
      ) : (
        <EmptyState
          title="No shipping address saved"
          description="Checkout faster by saving a shipping address"
          buttonText="Add Shipping Address"
          onClick={handleOpen}
        />
      )}
      {addresses.length < 3 && addresses.length > 0 && (
        <Button
          startIcon={<Add />}
          variant="outlined"
          color="grey"
          size="small"
          sx={{ width: 'max-content' }}
          onClick={handleOpen}
        >
          Add Shipping Address
        </Button>
      )}
      <CustomModal maxWidth={580} title="Add Shipping Address" open={isCreateModalOpened} onClose={handleClose}>
        <ShippingAddressForm mode="create" afterSubmit={handleClose} />
      </CustomModal>
    </Stack>
  );
};

export default Addresses;
