import { Stack, Typography } from '@mui/material';

// components
import SizesPicker from '../SizesPicker';

// types
import { Sizes } from '@/types/enums.types';

type Props = {
  sizes: Sizes[];
  selectedSize?: Sizes;
  onSelectSize: (v: Sizes) => void;
};

const ProductSizes: React.FC<Props> = ({ sizes, selectedSize, onSelectSize }) => {
  return (
    <Stack gap={{ xs: 1.5, sm: 3 }}>
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
