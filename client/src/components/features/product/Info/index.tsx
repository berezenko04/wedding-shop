import { Stack, Typography } from "@mui/material";

// components
import ProductPrice from "../Price";

const ProductInfo: React.FC = ({ title, price, discount, description }) => {
  return (
    <Stack gap={4} px={8}>
      <Stack gap={1}>
        <Typography variant="medium" fontSize={24}>
          {title}
        </Typography>
        <ProductPrice price={price} discount={discount} />
        {discount && (
          <Typography variant="medium" color="success.main">
            {discount * 100}% off
          </Typography>
        )}
      </Stack>
      <Typography>{description}</Typography>
    </Stack>
  );
};

export default ProductInfo;
