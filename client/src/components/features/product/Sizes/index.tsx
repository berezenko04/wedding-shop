import { Stack, Typography } from "@mui/material";

// components
import SizesPicker from "../SizesPicker";

// types
import { Sizes } from "@/types/enums.types";

type ProductSizesProps = {
  sizes: Sizes[];
  selectedSize: Sizes;
  onSelectSize: (v: Sizes) => void;
};

const ProductSizes: React.FC<ProductSizesProps> = ({ sizes, selectedSize, onSelectSize }) => {
  return (
    <Stack gap={3}>
      <Typography variant="medium" fontSize={16} textTransform="uppercase">
        Sizes
      </Typography>
      <SizesPicker
        initialItems={Object.values(Sizes)}
        items={sizes}
        selectedSize={selectedSize}
        onSelectSize={onSelectSize}
      />
    </Stack>
  );
};

export default ProductSizes;
