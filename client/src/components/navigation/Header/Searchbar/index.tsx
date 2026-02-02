import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// icons
import { SearchOutlined } from '@mui/icons-material';

type SearchOption = {
  label: string;
  path: string;
  type: 'suggestion' | 'history';
};

const Searchbar: React.FC = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const handleChange = (_: React.SyntheticEvent, newValue: string | SearchOption | null) => {
    if (newValue && typeof newValue !== 'string') {
      navigate(newValue.path);
    }
  };

  return (
    <Autocomplete
      fullWidth
      freeSolo
      groupBy={(option) => (option.type === 'history' ? 'History' : 'Suggestions')}
      options={[]}
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option;
        return option.label;
      }}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="Search something..."
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start" sx={{ pl: 1 }}>
                  <SearchOutlined />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
};

export default Searchbar;
