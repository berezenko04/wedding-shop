import { Stack, Typography } from '@mui/material';

// components
import OutlinedBlock from '@/components/ui/Layout/OutlinedBlock';
import EditButton from '@/components/ui/Buttons/Edit';

// hooks
import { useUser } from '@/hooks/useUser';

type ShippingAddressProps = {
  address?: string;
};

const ShippingAddress: React.FC<ShippingAddressProps> = ({ address }) => {
  const { data: user } = useUser();

  return (
    <OutlinedBlock sx={{ gap: 2 }}>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={4}>
        <Typography variant="medium" textTransform="uppercase">
          Shipping Address
        </Typography>
        <EditButton
          href="/profile/shipping-address"
          title={!address ? 'Add' : 'Edit'}
          color={!address ? 'primary' : 'grey'}
        />
      </Stack>
      {address && (
        <Stack gap={1}>
          <Typography>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography>{address}</Typography>
        </Stack>
      )}
    </OutlinedBlock>
  );
};

export default ShippingAddress;
