import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

// icons
import { AddShoppingCart } from '@mui/icons-material';

type EmptyCartProps = {
  handleClose: () => void;
};

const EmptyCart: React.FC<EmptyCartProps> = ({ handleClose }) => {
  const navigate = useNavigate();

  const handleClickCatalogButton = () => {
    navigate('/catalog');
    handleClose();
  };

  return (
    <Stack alignItems="center" justifyContent="center" gap={3} p={{ xs: 2, sm: 4 }} flex={1}>
      <AddShoppingCart sx={{ width: 64, height: 64, color: 'primary.main' }} />
      <Stack alignItems="center" gap={1}>
        <Typography variant="medium" textAlign="center">
          You haven't added anything to your cart yet
        </Typography>
        <Typography textAlign="center">Add an item to your shopping cart and it will appear in this list.</Typography>
      </Stack>
      <Button onClick={handleClickCatalogButton} variant="contained" color="primary" size="small">
        Go Shopping
      </Button>
    </Stack>
  );
};

export default EmptyCart;
