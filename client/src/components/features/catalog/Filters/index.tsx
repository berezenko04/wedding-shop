import { Stack } from "@mui/material";

// components
import FilterPrice, { FilterPriceProps } from "./Price";
import FilterSize, { FilterSizeProps } from "./Size";
import FilterBySex, { FilterBySexProps } from "./Sex";

type FiltersProps = FilterPriceProps & FilterSizeProps & FilterBySexProps;

const Filters: React.FC<FiltersProps> = ({ priceRange, setPriceRange, size, setSize, sex, setSex }) => {
  return (
    <Stack gap={3}>
      <FilterPrice priceRange={priceRange} setPriceRange={setPriceRange} />
      <FilterSize size={size} setSize={setSize} />
      <FilterBySex sex={sex} setSex={setSex} />
    </Stack>
  );
};

export default Filters;
