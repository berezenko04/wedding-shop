// components
import FilterItem from "../FilterItem";
import SizePicker from "@/components/features/product/SizePicker";

// types
import { Sizes } from "@/types/enums.types";

export type FilterSizeProps = {
  size: Sizes | null;
  setSize: (v: Sizes | null) => void;
};

const SizeFilter: React.FC<FilterSizeProps> = ({ size, setSize }) => {
  return (
    <FilterItem title="By Size">
      <SizePicker value={size} onChange={setSize} />
    </FilterItem>
  );
};

export default SizeFilter;
