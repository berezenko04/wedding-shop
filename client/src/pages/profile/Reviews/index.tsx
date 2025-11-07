import { useState } from "react";
import { useSelector } from "react-redux";
import { Stack, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// components
import ReviewsItem from "@/components/features/product/Reviews/Item";
import EmptyState from "@/components/ui/EmptyState";

// api
import ReviewsService from "@/api/reviews/reviews.service";

// redux
import { authSelector } from "@/redux/auth/auth.selectors";

// icons
import { StarHalf } from "@mui/icons-material";

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
      {isLoading ? (
        <></>
      ) : reviews.total > 0 ? (
        reviews.reviews.map((review) => <ReviewsItem key={review.id} {...review} />)
      ) : (
        <EmptyState
          icon={StarHalf}
          title="You haven't left any reviews yet"
          description="Reviews you write will appear here. Share your experience with other shoppers once you've tried our products."
        />
      )}
    </Stack>
  );
};

export default ReviewsPage;
