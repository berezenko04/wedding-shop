import { Button, Divider, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  const cart = queryClient.getQueryData<CartItemType[]>(["cart"]) || [];

  const handleClickCheckout = () => {
    navigate("/checkout");
    handleClose();
  };

  return (
    <Drawer
      anchor="right"
      open={isOpened}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            width: 580,
            height: "100vh",
            maxHeight: "100vh",
          },
        },
      }}
    >
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={4} p={3}>
        <Typography variant="h3">
          Cart {cart.length > 0 ? `(${cart.reduce((acc, i) => acc + i.quantity, 0)})` : ""}
        </Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Stack>
      {cart.length > 0 ? (
        <>
          <Stack
            px={3}
            flex={1}
            sx={(theme) => ({
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: 32,
                height: 32,
              },

              "&::-webkit-scrollbar-thumb": {
                backgroundColor: theme.palette.primary.main,
                border: "12px solid transparent",
                backgroundClip: "content-box",
              },

              "&::-webkit-scrollbar-button": {
                display: "none",
                height: 0,
                width: 0,
              },
            })}
          >
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
            <Button variant="contained" color="primary" size="small" onClick={handleClickCheckout}>
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
