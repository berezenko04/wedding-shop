// components
import FilterItem from "../FilterItem";
import Picker from "@/components/ui/Picker";

// types
import { Sizes } from "@/types/enums.types";

type FilterSizeProps = {
  size: Sizes | null;
  setSize: (v: Sizes | null) => void;
};

const SizeFilter: React.FC<FilterSizeProps> = ({ size, setSize }) => {
  return (
    <FilterItem title="By Size">
      <Picker items={Object.values(Sizes)} value={size} onChange={setSize}/>
    </FilterItem>
  );
};

export default SizeFilter;
