import { Box, Link, Stack, Typography } from "@mui/material";

// components
import DiscountLabel from "../DiscountLabel";
import AddToWishlistButton from "@/components/ui/buttons/AddToWishlist";

// types
import { Product } from "@/api/products/products.types";

interface CardProps extends Product {
  variant?: "catalog" | "default";
}

const Card: React.FC<CardProps> = ({ posterUrl, title, price, slug, discount, variant = "default" }) => {
  return (
    <Stack gap={2} component={Link} href={`/catalog/${slug}`}>
      <Box position="relative" overflow="hidden" sx={{ height: 535 }}>
        <Box
          component="img"
          src={posterUrl}
          sx={{ height: "100%", width: "100%", objectFit: "cover", objectPosition: "center" }}
        />
        {discount > 0 && <DiscountLabel discount={discount} />}
        <AddToWishlistButton />
      </Box>

      <Stack gap={1}>
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={2}>
          <Typography variant="medium">{title}</Typography>
          {variant === "default" && (
            <Typography variant="medium" color="common.black">
              {(price - price * discount).toFixed(2)} USD
            </Typography>
          )}
        </Stack>

        {variant === "catalog" && (
          <Stack flexDirection="row" alignItems="center" gap={2}>
            <Typography variant="medium" color="primary.main">
              {discount ? (price - price * discount).toFixed(2) : price.toFixed(2)} USD
            </Typography>

            {discount > 0 && (
              <Typography variant="medium" color="grey.400" sx={{ textDecoration: "line-through" }}>
                {price.toFixed(2)} USD
              </Typography>
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Card;
