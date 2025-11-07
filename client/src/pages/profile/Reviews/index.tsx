import { useState } from "react";
import { useSelector } from "react-redux";
import { Stack, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// components
import ReviewsItem from "@/components/features/product/Reviews/Item";

// api
import ReviewsService from "@/api/reviews/reviews.service";

// redux
import { authSelector } from "@/redux/auth/auth.selectors";

// constants
import { REVIEWS_LIMIT } from "@/constants";

const ReviewsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { isAuth } = useSelector(authSelector);
  const [page, setPage] = useState<number>(1);

  const { data: reviews = { reviews: [], total: 0 }, isLoading } = useQuery({
    queryKey: ["reviews", { page, limit: REVIEWS_LIMIT }],
    queryFn: () => ReviewsService.getMyReviews({ page, limit: REVIEWS_LIMIT }),
    enabled: isAuth,
  });

  return (
    <Stack gap={4} sx={{ width: "100%" }}>
      <Typography variant="h3">Reviews ({reviews.total})</Typography>
      {reviews.reviews.map((review) => (
        <ReviewsItem key={review.id} {...review} />
      ))}
    </Stack>
  );
};

export default ReviewsPage;
