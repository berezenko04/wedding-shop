import { Divider, Pagination, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";

// components
import ReviewForm from "@/components/forms/Review";
import ReviewsItem from "./Item";

// redux
import { authSelector } from "@/redux/auth/auth.selectors";

// api
import ReviewsService from "@/api/reviews/reviews.service";

// constants
import { REVIEWS_LIMIT } from "@/constants";

type ProductReviewsProps = {
  productId: string;
};

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const { isAuth } = useSelector(authSelector);

  const [page, setPage] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ["productReviews", productId, page],
    queryFn: async () => {
      if (!productId) return null;
      return await ReviewsService.getByProduct(productId, { page, limit: REVIEWS_LIMIT });
    },
    placeholderData: (prev) => prev,
    enabled: !!productId,
  });

  const pages = data?.total ? Math.ceil(data.total / REVIEWS_LIMIT) : 0;

  return (
    <Stack gap={4}>
      <Typography variant="h4">Comments ({data?.total})</Typography>
      {isAuth && (
        <>
          <Typography>Review this product?</Typography>
          <ReviewForm productId={productId} />
        </>
      )}
      {data?.reviews.map((review, idx) => (
        <Fragment key={review.id}>
          <ReviewsItem {...review} />
          {idx !== data.reviews.length - 1 && <Divider />}
        </Fragment>
      ))}
      {pages > 1 && <Pagination page={page} onChange={(_, val) => setPage(val)} count={pages} />}
    </Stack>
  );
};

export default ProductReviews;
