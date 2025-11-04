import { Box, Link, Stack, Typography } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";

// components
import DiscountLabel from "../DiscountLabel";
import AddToWishlistButton from "@/components/ui/buttons/AddToWishlist";
import ProductPrice from "../Price";

// types
import { Product } from "@/api/products/products.types";

interface CardProps extends Product {
  variant?: "catalog" | "default";
}

const Card: React.FC<CardProps> = ({ id, posterUrl, title, price, slug, discount, variant = "default" }) => {
  return (
    <Stack gap={2} component={Link} href={`/catalog/${slug}`}>
      <Box position="relative" overflow="hidden" sx={{ height: 535 }}>
        <LazyLoadImage
          src={posterUrl}
          effect="blur"
          width="100%"
          height="100%"
          style={{ objectPosition: "center", objectFit: "cover" }}
        />
        {discount > 0 && <DiscountLabel discount={discount} />}
        <AddToWishlistButton productId={id} />
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

        {variant === "catalog" && <ProductPrice price={price} discount={discount} />}
      </Stack>
    </Stack>
  );
};

export default Card;
