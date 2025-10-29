import { Drawer, IconButton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

// components
import CartItem from "../Item";

// api
import CartService from "@/api/cart/cart.service";

// icons
import { Close } from "@mui/icons-material";

type CartProps = {
  isOpened: boolean;
  handleClose: () => void;
};

const Cart: React.FC<CartProps> = ({ isOpened, handleClose }) => {
  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => await CartService.getAll(),
  });

  return (
    <Drawer
      anchor="right"
      open={isOpened}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            width: 580,
          },
        },
      }}
    >
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={4} p={3}>
        <Typography variant="h3">Cart</Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Stack>
      <Stack px={3} pb={3}>
        {data?.map((item) => (
          <CartItem {...item} />
        ))}
      </Stack>
    </Drawer>
  );
};

export default Cart;
