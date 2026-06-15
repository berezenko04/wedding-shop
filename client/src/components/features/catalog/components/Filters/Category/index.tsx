import { useQuery } from '@tanstack/react-query';

// components
import Picker from '@/components/ui/Picker';
import FilterItem from '../FilterItem';

// api
import CategoriesService from '@/api/categories/categories.service';

type Props = {
  category: string | null;
  setCategory: (v: string | null) => void;
};

const FilterByCategory: React.FC<Props> = ({ category, setCategory }) => {
  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: CategoriesService.getAll });
  return (
    <FilterItem title="By category">
      <Picker
        columns={2}
        value={category}
        onChange={setCategory}
        items={categories?.map((c) => ({ label: c.name, value: c.slug })) || []}
        isFullLengthLast
      />
    </FilterItem>
  );
};

export default FilterByCategory;
