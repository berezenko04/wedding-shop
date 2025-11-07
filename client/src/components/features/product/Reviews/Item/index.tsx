import { Avatar, Link, Rating, Stack, Typography } from "@mui/material";

// types
import { Review } from "@/api/reviews/reviews.types";

// mapping
import { ratingToNumber } from "@/data/mapping";

type ReviewsItemProps = Review & {
  variant?: "product" | "profile";
};

const ReviewsItem: React.FC<ReviewsItemProps> = ({
  rating,
  user,
  createdAt,
  product,
  variant = "product",
  comment,
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Stack gap={2}>
      <Stack flexDirection="row" gap={2}>
        <Avatar sx={{ width: 48, height: 48 }}>{user?.firstName?.slice(0, 2).toUpperCase()}</Avatar>
        <Stack>
          <Rating readOnly value={ratingToNumber[rating]} />
          <Typography>
            {user.firstName} {user.lastName}
          </Typography>
        </Stack>
      </Stack>
      {variant === "profile" && (
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
