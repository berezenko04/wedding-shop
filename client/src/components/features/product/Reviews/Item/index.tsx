import { Avatar, Rating, Stack, Typography } from "@mui/material";

// types
import { Review } from "@/api/reviews/reviews.types";

// mapping
import { ratingToNumber } from "@/data/mapping";

type ReviewsItemProps = Review & {};

const ReviewsItem: React.FC<ReviewsItemProps> = ({ rating, comment }) => {
  return (
    <Stack>
      <Stack flexDirection="row" gap={2}>
        <Avatar></Avatar>
        <Stack>
          <Rating readOnly value={ratingToNumber[rating]} />
        </Stack>
      </Stack>
      <Stack>
        <Typography>{comment}</Typography>
      </Stack>
    </Stack>
  );
};

export default ReviewsItem;
