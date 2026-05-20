import { Typography } from "@mui/material";

type ProductDiscountProps = {
  discount: number | null;
};

const ProductDiscount: React.FC<ProductDiscountProps> = ({ discount }) => {
  if (!discount) return null;

  return (
    <Typography variant="medium" color="success.main">
      {discount * 100}% off
    </Typography>
  );
};

export default ProductDiscount;
