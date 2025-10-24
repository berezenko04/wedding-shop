import { MenuItem, Select, Stack, Typography } from "@mui/material";

// data
import { sortByCatalog } from "@/data/main";

// types
import { SortBy } from "@/types/enums.types";

type SortProps = {
  value: SortBy | "none";
  onChange: (value: SortBy) => void;
};

const Sort: React.FC<SortProps> = ({ value, onChange }) => {
  return (
    <Stack flexDirection="row" alignItems="center" gap={0.5}>
      <Typography sx={{ fontWeight: 500, color: "grey.700", textTransform: "uppercase" }}>Sort by</Typography>
      <Select
        variant="standard"
        disableUnderline
        defaultValue={sortByCatalog[0].value}
        value={value}
        onChange={(e) => onChange(e.target.value as SortBy)}
      >
        {sortByCatalog.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default Sort;
