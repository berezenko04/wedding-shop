import { Stack } from "@mui/material";

// components
import FilterPrice, { FilterPriceProps } from "./Price";
import FilterSize, { FilterSizeProps } from "./Size";
import FilterBySex from "./Sex";

type FiltersProps = FilterPriceProps & FilterSizeProps & {};

const Filters: React.FC<FiltersProps> = ({ priceRange, setPriceRange, size, setSize }) => {
  return (
    <Stack gap={3}>
      <FilterPrice priceRange={priceRange} setPriceRange={setPriceRange} />
      <FilterSize size={size} setSize={setSize} />
      <FilterBySex />
    </Stack>
  );
};

export default Filters;
