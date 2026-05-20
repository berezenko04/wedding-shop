import { IconButton, Stack, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

// components
import PrimaryMark from '@/components/features/profile/components/PrimaryMark';
import OutlinedBlock from '@/components/ui/Layout/OutlinedBlock';
import ShippingAddressForm from '@/components/features/profile/forms/ShippingAddress';
import CustomModal from '@/components/ui/Layout/CustomModal';

// api
import ShippingService from '@/api/shipping/shipping.service';

// hooks
import { useUser } from '@/hooks/useUser';

// types
import { ShippingAddress } from '@/api/shipping/shipping.types';
import { BaseResponseData } from '@/types/base.types';

// icons
import { DeleteOutline, EditOutlined } from '@mui/icons-material';

const Address: React.FC<ShippingAddress> = ({ id, address: rawAddress, primary }) => {
  const [isUpdateModalOpened, setIsUpdateModalOpened] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data: user } = useUser();
  const [country, city, address] = rawAddress.split(', ');

  const deleteMutation = useMutation({
    mutationFn: (id: string) => ShippingService.delete(id),
    onSuccess: (result: BaseResponseData, id: string) => {
      toast.success(result.message);
      queryClient.setQueryData(['shipping'], (old: ShippingAddress[] = []) => old.filter((s) => s.id !== id));
    },
  });

  const handleClose = () => {
    setIsUpdateModalOpened(false);
  };

  return (
    <OutlinedBlock>
      <Stack flexDirection="row" justifyContent="space-between" gap={4} alignItems="flex-start">
        <Stack gap={1}>
          <Typography variant="medium" fontSize={20} textTransform="uppercase">
            Shipping Address
          </Typography>
          <Typography>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography>{rawAddress}</Typography>
          <Typography>{user?.email}</Typography>
        </Stack>
        <Stack flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" gap={2}>
          {primary && <PrimaryMark />}
          <Stack flexDirection="row" alignItems="center" gap={0.5}>
            <IconButton onClick={() => setIsUpdateModalOpened(true)}>
              <EditOutlined />
            </IconButton>
            <IconButton color="error" onClick={() => deleteMutation.mutate(id)}>
              <DeleteOutline />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
      <CustomModal title="Edit Shipping Address" maxWidth={580} open={isUpdateModalOpened} onClose={handleClose}>
        <ShippingAddressForm
          mode="update"
          defaultValues={{ country, city, address, primary }}
          addressId={id}
          afterSubmit={handleClose}
        />
      </CustomModal>
    </OutlinedBlock>
  );
};

export default Address;
