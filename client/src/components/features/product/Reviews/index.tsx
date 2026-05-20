import { Divider, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react/jsx-runtime';
import { useState } from 'react';

// components
import ReviewForm from '@/components/forms/Review';
import CustomPagination from '@/components/ui/layout/CustomPagination';
import EmptyState from '@/components/ui/EmptyState';
import ReviewsItem from './Item';

// redux
import { authSelector } from '@/redux/auth/auth.selectors';

// api
import ReviewsService from '@/api/reviews/reviews.service';

// data
import { REVIEWS_LIMIT } from '@/data/main';

// icons
import { ChatBubbleOutline } from '@mui/icons-material';

type ProductReviewsProps = {
  productId: string;
};

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const { isAuth } = useSelector(authSelector);

  const [page, setPage] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ['productReviews', productId, page],
    queryFn: async () => {
      if (!productId) return null;
      return await ReviewsService.getByProduct(productId, { page, limit: REVIEWS_LIMIT });
    },
    placeholderData: (prev) => prev,
    enabled: !!productId,
  });

  const reviews = data?.reviews ?? [];
  const total = data?.total ?? 0;

  const pages = Math.ceil(total / REVIEWS_LIMIT);

  return (
    <Stack gap={4}>
      <Typography variant="h4">Comments ({total})</Typography>
      {isAuth && (
        <>
          <Typography>Review this product?</Typography>
          <ReviewForm productId={productId} />
        </>
      )}
      {reviews.length > 0
        ? reviews.map((review, idx) => (
            <Fragment key={review.id}>
              <ReviewsItem {...review} />
              {idx !== reviews.length - 1 && <Divider />}
            </Fragment>
          ))
        : !isAuth && (
            <EmptyState
              title="No comments yet"
              description="Be the first to share your thoughts. Please log in to leave a review."
              icon={ChatBubbleOutline}
              withoutMarginTop
            />
          )}
      {pages > 1 && <CustomPagination page={page} onChange={(_, val) => setPage(val)} count={pages} />}
    </Stack>
  );
};

export default ProductReviews;
