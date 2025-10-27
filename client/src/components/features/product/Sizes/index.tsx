import { Stack, Typography } from "@mui/material";

// components
import Picker from "@/components/ui/Picker";

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
      <Picker items={sizes} value={selectedSize} onChange={(v) => onSelectSize(v as Sizes)} allowDeselect={false} />
    </Stack>
  );
};

export default ProductSizes;
