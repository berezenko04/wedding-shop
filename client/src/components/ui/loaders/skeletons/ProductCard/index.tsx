import { Skeleton, Stack } from "@mui/material";

const ProductCardSkeleton: React.FC = () => {
  return (
    <Stack gap={2}>
      <Skeleton variant="rectangular" animation="wave" sx={{ minHeight: 400, height: "100%", width: "100%" }} />
      <Stack gap={1}>
        <Skeleton variant="rectangular" animation="wave" height={30} />
        <Skeleton variant="rectangular" animation="wave" height={30} width="60%" />
      </Stack>
    </Stack>
  );
};

export default ProductCardSkeleton;
