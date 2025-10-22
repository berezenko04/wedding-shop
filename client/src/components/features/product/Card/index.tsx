import { Box, Link, Stack, Typography } from "@mui/material";

// types
import { Product } from "@/api/products/products.types";

const Card: React.FC<Product> = ({ posterUrl, title, price, slug, discount }) => {
  return (
    <Stack gap={2} component={Link} href={`/catalog/${slug}`}>
      <Box position="relative" overflow="hidden" sx={{ height: 535 }}>
        <Box
          component="img"
          src={posterUrl}
          sx={{ height: "100%", width: "100%", objectFit: "cover", objectPosition: "center" }}
        />
        {discount > 0 && (
          <Box
            sx={{
              position: "absolute",
              bottom: 40,
              right: -40,
              width: 200,
              display: "flex",
              justifyContent: "center",
              transform: "rotate(-45deg)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            <Box
              sx={{
                backgroundColor: "success.main",
                px: 12,
                py: 1.5,
                boxShadow: 2,
              }}
            >
              <Typography variant="medium" color="common.white" fontWeight={600} whiteSpace="nowrap">
                {Math.round(discount * 100)}% OFF
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      <Stack gap={1}>
        <Typography variant="medium">{title}</Typography>
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
      </Stack>
    </Stack>
  );
};

export default Card;
