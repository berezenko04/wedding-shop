import { Typography } from '@mui/material';

type Props = {
  discount: number | null;
};

const ProductDiscount: React.FC<Props> = ({ discount }) => {
  if (!discount) return null;

  return (
    <Typography variant="medium" color="success.main">
      {discount * 100}% off
    </Typography>
  );
};

export default ProductDiscount;
