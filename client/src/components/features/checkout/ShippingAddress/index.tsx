import { Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

// components
import OutlinedBlock from '@/components/ui/layout/OutlinedBlock';
import EditButton from '@/components/ui/buttons/Edit';

// types
import { User } from '@/api/user/user.types';

type ShippingAddressProps = {
  address?: string;
};

const ShippingAddress: React.FC<ShippingAddressProps> = ({ address }) => {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData<User>(['user']);

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
        <Typography>{address}</Typography>
      </Stack>
    </OutlinedBlock>
  );
};

export default ShippingAddress;
