import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

// components
import ReviewForm from "@/components/forms/Review";
import ReviewsItem from "./Item";

// redux
import { authSelector } from "@/redux/auth/auth.selectors";

// api
import ReviewsService from "@/api/reviews/reviews.service";

type ProductReviewsProps = {
  productId: string | undefined;
};

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const { isAuth } = useSelector(authSelector);

  const { data } = useQuery({
    queryKey: ["productReviews", productId],
    queryFn: async () => {
      if (!productId) return null;
      return await ReviewsService.getByProduct(productId, { page: 1, limit: 10 });
    },
    enabled: !!productId,
  });

  return (
    <Stack gap={4}>
      <Typography variant="h4">Comments ({data?.total})</Typography>
      {isAuth && (
        <>
          <Typography>Review this product?</Typography>
          <ReviewForm productId={productId} />
        </>
      )}
      {data?.reviews.map((review) => (
        <ReviewsItem key={review.id} {...review} />
      ))}
    </Stack>
  );
};

export default ProductReviews;
