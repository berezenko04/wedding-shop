import { Button, Divider, Stack } from '@mui/material';
import { Fragment } from 'react/jsx-runtime';
import { useNavigate } from 'react-router';

// components
import CartItem from '../Item';
import CartTotal from '../Total';
import EmptyCart from '../Empty';
import CustomScrollContainer from '@/components/ui/layout/CustomScrollContainer';
import CustomDrawer from '@/components/ui/layout/CustomDrawer';

// hooks
import { useCart } from '@/hooks/useCart';

type CartProps = {
  isOpened: boolean;
  handleClose: () => void;
};

const Cart: React.FC<CartProps> = ({ isOpened, handleClose }) => {
  const navigate = useNavigate();

  const { data: cart = [] } = useCart();

  const handleClickCheckout = () => {
    navigate('/checkout');
    handleClose();
  };

  return (
    <CustomDrawer
      anchor="right"
      open={isOpened}
      onClose={handleClose}
      title={`Cart${cart.length > 0 ? ` (${cart.reduce((acc, i) => acc + i.quantity, 0)})` : ''}`}
    >
      {cart.length > 0 ? (
        <>
          <CustomScrollContainer sx={{ px: 3, flex: 1 }}>
            {cart.map((item, idx) => (
              <Fragment key={item.id}>
                <CartItem {...item} />
                {idx !== cart.length - 1 && <Divider />}
              </Fragment>
            ))}
          </CustomScrollContainer>
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
    </CustomDrawer>
  );
};

export default Cart;
