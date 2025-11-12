import { IconButton, Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

// components
import PrimaryMark from "@/components/features/profile/PrimaryMark";
import OutlinedBlock from "@/components/ui/layout/OutlinedBlock";

// types
import { ShippingAddress } from "@/api/shipping/shipping.types";
import { User } from "@/api/user/user.types";

// icons
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

const Address: React.FC<ShippingAddress> = ({ id, address, primary }) => {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData<User>(["user"]);

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
          <Typography>{address}</Typography>
          <Typography>{user?.email}</Typography>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap={2}>
          {primary && <PrimaryMark />}
          <Stack flexDirection="row" alignItems="center" gap={0.5}>
            <IconButton>
              <EditOutlined />
            </IconButton>
            <IconButton color="error">
              <DeleteOutline />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </OutlinedBlock>
  );
};

export default Address;
