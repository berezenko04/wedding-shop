import { Product } from "@/api/products/products.types";
import { Box, Stack, Typography } from "@mui/material";

const Card: React.FC<Product> = ({ posterUrl, title, price, discount }) => {
  return (
    <Stack gap={2}>
      <Box
        component="img"
        src={posterUrl}
        sx={{ height: 364, width: "100%", objectFit: "cover", objectPosition: "center" }}
      />
      <Stack gap={1}>
        <Typography fontSize={20} color="grey.700" fontWeight={500}>
          {title}
        </Typography>
      </Stack>
      <Stack flexDirection="row" alignItems="center" gap={2}>
        <Typography>{price} $</Typography>
      </Stack>
    </Stack>
  );
};

export default Card;
