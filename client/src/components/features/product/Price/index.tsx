import { Stack, Typography } from "@mui/material";

type ProductPriceProps = {
  price: number;
  discount: number | null;
};

const ProductPrice: React.FC<ProductPriceProps> = ({ price, discount }) => {
  return (
    <Stack flexDirection="row" alignItems="center" gap={2}>
      <Typography variant="medium" color="primary.main">
        {discount ? (price - price * discount).toFixed(2) : price.toFixed(2)} USD
      </Typography>

      {discount && discount > 0 && (
        <Typography variant="medium" color="grey.400" sx={{ textDecoration: "line-through" }}>
          {price.toFixed(2)} USD
        </Typography>
      )}
    </Stack>
  );
};

export default ProductPrice;
