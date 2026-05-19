import { MenuItem, Select, Stack, SxProps, Typography } from '@mui/material';

// data
import { sortByCatalog } from '@/data/main';

// types
import { SortBy } from '@/types/enums.types';

type SortProps = {
  sx?: SxProps;
  value: SortBy | 'none';
  onChange: (value: SortBy) => void;
};

const Sort: React.FC<SortProps> = ({ value, onChange, sx }) => {
  return (
    <Stack flexDirection="row" alignItems="center" gap={0.5} sx={sx}>
      <Typography sx={{ fontWeight: 500, color: 'grey.700', textTransform: 'uppercase' }}>Sort by</Typography>
      <Select
        variant="standard"
        disableUnderline
        defaultValue={sortByCatalog[0].value}
        value={value}
        onChange={(e) => onChange(e.target.value as SortBy)}
        sx={{ '.MuiSelect-select': { padding: '4px 24px 4px 0 !important' } }}
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
