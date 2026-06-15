import { LinearProgress, Stack, Typography } from '@mui/material';

// types
import { Rating } from '@/types/enums.types';

// icons
import { Star } from '@mui/icons-material';

// data
import { ratingToNumber } from '@/data/mapping';

type Props = {
  ratingMark: Rating;
  ratingCount: number;
  allRatingCount: number;
};

const ProductRatingItem: React.FC<Props> = ({ ratingMark, ratingCount, allRatingCount }) => {
  const progressValue = allRatingCount ? (ratingCount / allRatingCount) * 100 : 0;

  return (
    <Stack flexDirection="row" alignItems="center" gap={2}>
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <Star sx={{ color: 'yellow.500' }} />
        <Typography fontWeight={500} width={16} textAlign="center">
          {ratingToNumber[ratingMark]}
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={progressValue}
        sx={{ flexGrow: 1, height: 8, width: '100%', maxWidth: 480 }}
      />
      <Typography fontWeight={500} color="grey.300" width={24}>
        {ratingCount}
      </Typography>
    </Stack>
  );
};

export default ProductRatingItem;
