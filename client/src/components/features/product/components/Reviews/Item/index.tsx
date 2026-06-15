import { Avatar, Link, Rating, Stack, Typography, IconButton } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// api
import ReviewsService from '@/api/reviews/reviews.service';

// types
import { GetAllReviews, Review } from '@/api/reviews/reviews.types';

// mapping
import { ratingToNumber } from '@/data/mapping';

// icons
import { DeleteOutline } from '@mui/icons-material';

type Props = Review & {
  variant?: 'product' | 'profile';
};

const ReviewsItem: React.FC<Props> = ({ id, rating, user, createdAt, product, variant = 'product', comment }) => {
  const queryClient = useQueryClient();

  const formattedDate = new Date(createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId: string) => ReviewsService.deleteReview(reviewId),
    onSuccess: (_, reviewId: string) => {
      queryClient.setQueriesData<GetAllReviews>({ queryKey: ['reviews'] }, (reviewsData) => {
        if (!reviewsData) return reviewsData;

        return {
          ...reviewsData,
          reviews: reviewsData.reviews.filter((r) => r.id !== reviewId),
          total: Math.max(0, reviewsData.total - 1),
        };
      });
    },
  });

  return (
    <Stack gap={2}>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center" gap={4}>
        <Stack flexDirection="row" gap={2}>
          <Avatar sx={{ width: 48, height: 48 }}>{user?.firstName?.slice(0, 2).toUpperCase()}</Avatar>
          <Stack>
            <Rating readOnly value={ratingToNumber[rating]} />
            <Typography>
              {user.firstName} {user.lastName}
            </Typography>
          </Stack>
        </Stack>
        {variant === 'profile' && (
          <IconButton color="error" onClick={() => deleteReviewMutation.mutate(id)}>
            <DeleteOutline />
          </IconButton>
        )}
      </Stack>
      {variant === 'profile' && (
        <Typography>
          Good:&nbsp;
          <Link href={`/catalog/${product.slug}`} variant="underlined" color="grey.500">
            {product.title}
          </Link>
        </Typography>
      )}
      <Typography>{comment}</Typography>
      <Typography color="grey.300" fontStyle="italic">
        Published at: {formattedDate}
      </Typography>
    </Stack>
  );
};

export default ReviewsItem;
