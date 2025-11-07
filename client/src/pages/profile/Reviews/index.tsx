import { useState } from "react";
import { useSelector } from "react-redux";
import { Divider, Pagination, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

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
  const { isAuth } = useSelector(authSelector);
  const [page, setPage] = useState<number>(1);

  const { data: reviews = { reviews: [], total: 0 }, isLoading } = useQuery({
    queryKey: ["reviews", { page, limit: REVIEWS_LIMIT }],
    queryFn: () => ReviewsService.getMyReviews({ page, limit: REVIEWS_LIMIT }),
    enabled: isAuth,
  });

  const pages = Math.ceil(reviews.total / REVIEWS_LIMIT);

  return (
    <Stack gap={4} sx={{ width: "100%" }}>
      <Typography variant="h3">Reviews ({reviews.total})</Typography>
      {isLoading ? (
        <></>
      ) : reviews.total > 0 ? (
        reviews.reviews.map((review, idx) => (
          <>
            <ReviewsItem key={review.id} variant="profile" {...review} />
            {idx + 1 !== reviews.reviews.length && <Divider />}
          </>
        ))
      ) : (
        <EmptyState
          icon={StarHalf}
          title="You haven't left any reviews yet"
          description="Reviews you write will appear here. Share your experience with other shoppers once you've tried our products."
        />
      )}

      {pages > 1 && (
        <>
          <Divider />
          <Pagination page={page} count={pages} onChange={(_, p) => setPage(p)} />
        </>
      )}
    </Stack>
  );
};

export default ReviewsPage;
