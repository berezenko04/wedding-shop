import { Box, Collapse, IconButton, InputAdornment, Stack, SxProps, TextField } from '@mui/material';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

// components
import SearchbarBlock from './Block';

// api
import ProductsService from '@/api/products/products.service';

// utils
import { getHistoryLS, setHistoryLS } from '@/utils/searchLocaleStorage';

// types
import { SearchResult } from '@/api/products/products.types';

// icons
import { Close, SearchOutlined } from '@mui/icons-material';

type Props = {
  sx?: SxProps;
};

const Searchbar: React.FC<Props> = ({ sx }) => {
  const [isListOpened, setIsListOpened] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [options, setOptions] = useState<SearchResult[]>([]);
  const [history, setHistory] = useState<SearchResult[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        if (query.length > 1) {
          const data = await ProductsService.search(query);
          setOptions(data);
        } else {
          setOptions([]);
        }
      }, 500),
    [],
  );

  const handleSearchInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    debouncedSearch(val);
  };

  const handleFocus = () => {
    setIsListOpened(true);
    setHistory(getHistoryLS());
  };

  const handleBlur = (e: React.FocusEvent) => {
    const isInsidePopup = popupRef.current?.contains(e.relatedTarget as Node);
    if (!isInsidePopup) setIsListOpened(false);
  };

  const handleClear = () => {
    setSearchQuery('');
    setOptions([]);
  };

  const handleClose = () => {
    setIsListOpened(false);
    handleClear();
    inputRef.current?.blur();
  };

  const handleClearHistory = () => {
    setHistoryLS([]);
    setHistory([]);
  };

  const handleClearHistoryItem = (slug: string) => {
    const history = getHistoryLS();
    const updated = history.filter((h) => h.slug !== slug);
    setHistoryLS(updated);
    setHistory(updated);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <Box sx={{ position: 'relative', width: '100%', ...sx }}>
      <TextField
        inputRef={inputRef}
        fullWidth
        size="small"
        placeholder="Search something..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
            ...(searchQuery.length > 1 && {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClear}>
                    <Close fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }),
          },
        }}
      />
      <Collapse in={isListOpened} timeout="auto" unmountOnExit>
        <Stack
          ref={popupRef}
          onMouseDown={(e) => e.preventDefault()}
          sx={{
            py: 2,
            backgroundColor: 'common.white',
            position: 'absolute',
            width: '100%',
            gap: 2,
            maxHeight: 400,
            overflowY: 'auto',
            boxShadow: 1,
          }}
        >
          <SearchbarBlock title="Search Results" options={options} variant="result" afterClickOption={handleClose} />
          <SearchbarBlock
            title="Search History"
            options={history}
            variant="history"
            afterClickOption={handleClose}
            onClearHistory={handleClearHistory}
            onClearHistoryItem={handleClearHistoryItem}
          />
        </Stack>
      </Collapse>
    </Box>
  );
};

export default Searchbar;
