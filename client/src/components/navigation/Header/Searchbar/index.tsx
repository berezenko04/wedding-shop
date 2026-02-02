import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// api
import ProductsService from '@/api/products/products.service';

// types
import { SearchResult } from '@/api/products/products.types';

// icons
import { SearchOutlined } from '@mui/icons-material';

const Searchbar: React.FC = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<SearchResult[]>([]);

  const handleInputChange = async (_: any, value: string) => {
    setInputValue(value);

    if (!value.trim()) {
      setOptions([]);
      return;
    }

    const data = await ProductsService.search(value);
    setOptions(data || []);
  };

  const handleChange = async (_: React.SyntheticEvent, newValue: SearchResult | string | null) => {
    if (newValue && typeof newValue !== 'string') {
      navigate(`/catalog/${newValue.slug}`);
    }
  };

  return (
    <Autocomplete
      fullWidth
      freeSolo
      groupBy={(option) => (option.type === 'history' ? 'History' : 'Suggestions')}
      options={options}
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option;
        return option.title;
      }}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="Search something..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start" sx={{ pl: 1 }}>
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default Searchbar;
