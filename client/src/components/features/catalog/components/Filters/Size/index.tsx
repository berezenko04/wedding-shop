// components
import FilterItem from '../FilterItem';
import Picker from '@/components/ui/Picker';

// types
import { Sizes } from '@/types/enums.types';

type Props = {
  size: Sizes | null;
  setSize: (v: Sizes | null) => void;
};

const SizeFilter: React.FC<Props> = ({ size, setSize }) => {
  return (
    <FilterItem title="By Size">
      <Picker items={Object.values(Sizes)} value={size} onChange={setSize} />
    </FilterItem>
  );
};

export default SizeFilter;
