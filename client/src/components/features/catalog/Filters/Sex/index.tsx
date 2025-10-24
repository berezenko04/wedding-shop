// components
import Picker from "@/components/ui/Picker";
import FilterItem from "../FilterItem";

// data
import { sexOptionsFilter } from "@/data/main";

const FilterBySex: React.FC = () => {
  return (
    <FilterItem title="By sex">
      <Picker items={sexOptionsFilter} />
    </FilterItem>
  );
};

export default FilterBySex;
