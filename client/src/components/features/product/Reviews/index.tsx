import { Stack, Typography } from "@mui/material";

const ProductReviews: React.FC = () => {
  return (
    <Stack gap={6}>
      <Typography variant="h3">Rating & Reviews</Typography>
      <Stack flexDirection="row" alignItems="center" gap={8}>
        <Stack>
          <Typography fontSize={64} variant="medium">
            4.5
          </Typography>
          <Typography textTransform="uppercase">60 Ratings</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductReviews;
