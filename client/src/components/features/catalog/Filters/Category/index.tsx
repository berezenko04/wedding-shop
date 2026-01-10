// components
import Picker from "@/components/ui/Picker";
import FilterItem from "../FilterItem";

export type FilterByCategoryProps = {
  category: string | null;
  setCategory: (v: string | null) => void;
};

const FilterByCategory: React.FC<FilterByCategoryProps> = ({ category, setCategory }) => {
  return (
    <FilterItem title="By category">
      <Picker columns={2} value={category} onChange={setCategory} items={[]} />
    </FilterItem>
  );
};

export default FilterByCategory;
