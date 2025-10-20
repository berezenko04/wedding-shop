import { SearchOutlined } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

const Searchbar: React.FC = () => {
  return (
    <TextField
      fullWidth
      size="small"
      placeholder="Search something..."
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default Searchbar;
