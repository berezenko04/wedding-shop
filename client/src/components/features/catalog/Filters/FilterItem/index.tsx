import { Stack, Typography } from "@mui/material";

type FilterItemProps = {
  title: string;
  children: React.ReactNode;
};

const FilterItem: React.FC<FilterItemProps> = ({ title, children }) => {
  return (
    <Stack gap={2}>
      <Typography variant="medium" fontSize={16} textTransform="uppercase">
        {title}
      </Typography>
      {children}
    </Stack>
  );
};

export default FilterItem;
