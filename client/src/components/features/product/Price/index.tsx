import { Stack, Typography } from "@mui/material";

type ProductPriceProps = {
  price: number;
  discount: number | null;
};

const ProductPrice: React.FC<ProductPriceProps> = ({ price = 0, discount = 0 }) => {
  const finalPrice = discount ? price - price * discount : price;

  return (
    <Stack flexDirection="row" alignItems="center" gap={2}>
      <Typography variant="medium" color="primary.main">
        {finalPrice.toFixed(2)} USD
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
