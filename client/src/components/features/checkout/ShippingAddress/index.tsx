import { Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

// components
import OutlinedBlock from '@/components/ui/layout/OutlinedBlock';
import EditButton from '@/components/ui/buttons/Edit';

// hooks
import { useUserShippingAddresses } from '@/hooks/useUserShippingAddresses';

//
import { User } from '@/api/user/user.types';

const ShippingAddress: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: addresses } = useUserShippingAddresses();
  const user = queryClient.getQueryData<User>(['user']);

  const primaryAddress = addresses?.find((address) => address.primary);

  return (
    <OutlinedBlock sx={{ gap: 2 }}>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={4}>
        <Typography variant="medium" textTransform="uppercase">
          Shipping Address
        </Typography>
        <EditButton href="/profile/shipping-address" />
      </Stack>
      <Stack gap={1}>
        <Typography>
          {user?.firstName} {user?.lastName}
        </Typography>
        <Typography>{primaryAddress?.address}</Typography>
        <Typography>{user?.email}</Typography>
      </Stack>
    </OutlinedBlock>
  );
};

export default ShippingAddress;
