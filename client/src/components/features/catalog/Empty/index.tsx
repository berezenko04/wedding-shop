import { Button, Stack, Typography } from "@mui/material";

// icons
import { SearchOff } from "@mui/icons-material";

type EmptyCatalogProps = {
  onClearFilters: () => void;
};

const EmptyCatalog: React.FC<EmptyCatalogProps> = ({ onClearFilters }) => {
  return (
    <Stack alignItems="center" gap={3} mt={8}>
      <SearchOff sx={{ width: 64, height: 64, color: "primary.main" }} />
      <Stack alignItems="center" gap={1}>
        <Typography variant="medium">Nothing found for your request</Typography>
        <Typography>Your search did not match any results. Try clearing the filters</Typography>
      </Stack>
      <Button variant="outlined" color="grey" size="small" onClick={onClearFilters}>
        Clear Filters
      </Button>
    </Stack>
  );
};

export default EmptyCatalog;
