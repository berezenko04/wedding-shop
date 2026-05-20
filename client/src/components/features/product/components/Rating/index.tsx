import { Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

// components
import ProductRatingItem from './Item';

// api
import ReviewsService from '@/api/reviews/reviews.service';

// types
import { Rating } from '@/types/enums.types';

// icons
import { Star } from '@mui/icons-material';

type ProductRatingProps = {
  productId: string | undefined;
};

const ProductRating: React.FC<ProductRatingProps> = ({ productId }) => {
  const { data: ratings } = useQuery({
    queryKey: ['productRating', productId],
    queryFn: async () => {
      if (!productId) throw new Error('Product id is not provided');
      return ReviewsService.getProductRatings(productId);
    },
    enabled: !!productId,
  });

  if (!ratings) return null;

  return (
    <Stack gap={{ xs: 2, sm: 4, md: 6 }}>
      <Typography variant="h3">Rating & Reviews</Typography>
      <Stack
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        gap={{ xs: 2, sm: 4, md: 8 }}
      >
        <Stack>
          <Typography fontSize={64} lineHeight="100%" variant="medium">
            {ratings.averageRating.toFixed(1)}
          </Typography>
          <Stack gap={1}>
            <Stack flexDirection="row" alignItems="center">
              {[...Array(Math.round(ratings.averageRating))].map((_, idx) => (
                <Star key={`star-${idx}`} sx={{ color: 'yellow.500' }} />
              ))}
            </Stack>
            <Typography textTransform="uppercase">{ratings.totalVotes} Ratings</Typography>
          </Stack>
        </Stack>
        <Stack gap={1.5} sx={{ width: '100%' }}>
          {Object.entries(ratings.distribution || {}).map(([ratingMark, ratingCount]) => (
            <ProductRatingItem
              key={ratingMark}
              ratingMark={ratingMark as Rating}
              ratingCount={ratingCount}
              allRatingCount={ratings.totalVotes}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductRating;
