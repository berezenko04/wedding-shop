import { Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

// components
import PrimaryMark from "@/components/features/profile/PrimaryMark";
import OutlinedBlock from "@/components/ui/layout/OutlinedBlock";

// types
import { ShippingAddress } from "@/api/shipping/shipping.types";
import { User } from "@/api/user/user.types";

const Address: React.FC<ShippingAddress> = ({ id, address, primary }) => {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData<User>(["user"]);

  return (
    <OutlinedBlock>
      <Stack>
        <Stack gap={1}>
          <Typography variant="medium" fontSize={20} textTransform="uppercase">
            Shipping Address
          </Typography>
          <Typography>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography>{address}</Typography>
          <Typography>{user?.email}</Typography>
        </Stack>
        <Stack>{primary && <PrimaryMark />}</Stack>
      </Stack>
    </OutlinedBlock>
  );
};

export default Address;
