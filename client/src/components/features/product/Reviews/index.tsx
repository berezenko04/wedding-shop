import { Stack, Typography } from "@mui/material";

// components
import ReviewForm from "@/components/forms/Review";

type ProductReviewsProps = {
  productId: string | undefined;
};

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  return (
    <Stack gap={4}>
      <Typography variant="h4">Comments (10)</Typography>
      <Typography>Review this product?</Typography>
      <ReviewForm />
    </Stack>
  );
};

export default ProductReviews;
