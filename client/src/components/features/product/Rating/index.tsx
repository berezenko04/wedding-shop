import { Stack, Typography } from "@mui/material";

// components
import ProductRatingItem from "./Item";

// types
import { Rating } from "@/types/enums.types";

const ProductRating: React.FC = () => {
  return (
    <Stack gap={6}>
      <Typography variant="h3">Rating & Reviews</Typography>
      <Stack flexDirection="row" alignItems="center" gap={8}>
        <Stack>
          <Typography fontSize={64} variant="medium">
            4.5
          </Typography>
          <Typography textTransform="uppercase">60 Ratings</Typography>
        </Stack>
        <Stack gap={1.5}>
          {Object.values(Rating)
            .reverse()
            .map((rating) => (
              <ProductRatingItem ratingMark={rating} ratingCount={60} allRatingCount={80} />
            ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProductRating;
