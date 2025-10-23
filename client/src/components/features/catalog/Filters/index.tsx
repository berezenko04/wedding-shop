import { Stack } from "@mui/material";

// components
import FilterPrice, { FilterPriceProps } from "./Price";
import SizeFilter, { FilterSizeProps } from "./Size";

type FiltersProps = FilterPriceProps & FilterSizeProps & {};

const Filters: React.FC<FiltersProps> = ({ priceRange, setPriceRange, size, setSize }) => {
  return (
    <Stack gap={3}>
      <FilterPrice priceRange={priceRange} setPriceRange={setPriceRange} />
      <SizeFilter size={size} setSize={setSize} />
    </Stack>
  );
};

export default Filters;
