import { Button, Divider, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";

// components
import CartItem from "../Item";
import CartTotal from "../Total";
import EmptyCart from "../Empty";

// types
import { CartItem as CartItemType } from "@/api/cart/cart.types";

// icons
import { Close } from "@mui/icons-material";

type CartProps = {
  isOpened: boolean;
  handleClose: () => void;
};

const Cart: React.FC<CartProps> = ({ isOpened, handleClose }) => {
  const queryClient = useQueryClient();

  const cart = queryClient.getQueryData<CartItemType[]>(["cart"]) || [];

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
        <Typography variant="h3">Cart {cart.length > 0 ? `(${cart.length})` : ""}</Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Stack>
      {cart.length > 0 ? (
        <>
          <Stack px={3} flex={1}>
            {cart.map((item, idx) => (
              <Fragment key={item.id}>
                <CartItem {...item} />
                {idx !== cart.length - 1 && <Divider />}
              </Fragment>
            ))}
          </Stack>
          <Stack p={3} gap={3}>
            <CartTotal
              items={cart.map((item) => ({
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
      ) : (
        <EmptyCart handleClose={handleClose} />
      )}
    </Drawer>
  );
};

export default Cart;
