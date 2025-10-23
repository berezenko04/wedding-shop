import { Stack } from "@mui/material";

// components
import FilterPrice from "./Price";

const Filters: React.FC = () => {
  return (
    <Stack gap={3}>
      <FilterPrice />
    </Stack>
  );
};

export default Filters;
