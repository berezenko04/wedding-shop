// components
import Picker from "@/components/ui/Picker";
import FilterItem from "../FilterItem";

// data
import { sexOptionsFilter } from "@/data/main";

// types
import { Sex } from "@/types/enums.types";

export type FilterBySexProps = {
  sex: Sex | null;
  setSex: (v: Sex | null) => void;
};

const FilterBySex: React.FC<FilterBySexProps> = ({ sex, setSex }) => {
  return (
    <FilterItem title="By sex">
      <Picker columns={2} value={sex} onChange={setSex} items={sexOptionsFilter} />
    </FilterItem>
  );
};

export default FilterBySex;
