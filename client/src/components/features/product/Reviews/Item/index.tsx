import { Avatar, Rating, Stack, Typography } from "@mui/material";

// types
import { Review } from "@/api/reviews/reviews.types";

// mapping
import { ratingToNumber } from "@/data/mapping";

type ReviewsItemProps = Review & {};

const ReviewsItem: React.FC<ReviewsItemProps> = ({ rating, user, createdAt, comment }) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Stack gap={2}>
      <Stack flexDirection="row" gap={2}>
        <Avatar sx={{ width: 48, height: 48 }}>{user.email.slice(0, 2).toUpperCase()}</Avatar>
        <Stack>
          <Rating readOnly value={ratingToNumber[rating]} />
          <Typography>{user.email}</Typography>
        </Stack>
      </Stack>
      <Typography>{comment}</Typography>
      <Typography color="grey.300" fontStyle="italic">
        Published at: {formattedDate}
      </Typography>
    </Stack>
  );
};

export default ReviewsItem;
