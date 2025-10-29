import { Button, Divider, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";

// components
import CartItem from "../Item";

// api
import CartService from "@/api/cart/cart.service";

// icons
import { Close } from "@mui/icons-material";
import CartTotal from "../Total";

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
        <Typography variant="h3">Cart ({data?.length || 0})</Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Stack>
      {data && (
        <>
          <Stack px={3} flex={1}>
            {data.map((item, idx) => (
              <Fragment key={item.id}>
                <CartItem {...item} />
                {idx !== data.length - 1 && <Divider />}
              </Fragment>
            ))}
          </Stack>
          <Stack p={3} gap={3}>
            <CartTotal
              items={data.map((item) => ({
                quantity: item.quantity,
                price: item.product.price,
                discount: item.product.discount,
              }))}
            />
            <Button variant="contained" color="primary" size="small">
              Checkout
            </Button>
          </Stack>
        </>
      )}
    </Drawer>
  );
};

export default Cart;
