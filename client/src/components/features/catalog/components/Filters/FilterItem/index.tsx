import { Stack, Typography } from "@mui/material";

type Props = {
  title: string;
  children: React.ReactNode;
};

const FilterItem: React.FC<Props> = ({ title, children }) => {
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
