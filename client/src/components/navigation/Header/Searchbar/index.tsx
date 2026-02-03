import { Box, Collapse, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

// components
import SearchOption from './Block/Item';

// api
import ProductsService from '@/api/products/products.service';

// types
import { SearchResult } from '@/api/products/products.types';

// icons
import { Close, SearchOutlined } from '@mui/icons-material';

const Searchbar: React.FC = () => {
  const [isListOpened, setIsListOpened] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [options, setOptions] = useState<SearchResult[]>([]);
  const [history, setHistory] = useState<SearchResult[]>([]);

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

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    debouncedSearch(val);
  };

  const handleClose = () => {
    setIsListOpened(false);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (popupRef.current && popupRef.current.contains(e.relatedTarget as Node)) {
      return;
    }
    handleClose();
  };

  const handleClear = () => {
    setSearchQuery('');
    setOptions([]);
  };

  const handleClearHistory = () => {
    localStorage.setItem('searchHistory', '[]');
    setHistory([]);
  };

  const handleClearHistoryItem = (slug: string) => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');

    localStorage.setItem('searchHistory', JSON.stringify(history.filter((h: SearchResult) => h.slug !== slug)));
    setHistory((prev) => prev.filter((h) => h.slug !== slug));
  };

  const updateHistory = () => {
    const updated = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setHistory(updated);
  };

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem('searchHistory') || '[]'));
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Search something..."
        value={searchQuery}
        onChange={handleChange}
        onFocus={() => setIsListOpened(true)}
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
          <Stack gap={0.5}>
            <Typography variant="medium" textTransform="uppercase" fontSize={16} sx={{ px: 2 }}>
              Search Results
            </Typography>
            <Stack>
              {options.length > 0 ? (
                options.map((o) => (
                  <SearchOption afterClick={handleClose} updateHistory={updateHistory} variant="result" {...o} />
                ))
              ) : (
                <Typography sx={{ px: 2 }}>No search results</Typography>
              )}
            </Stack>
          </Stack>
          <Stack gap={0.5}>
            <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={1} sx={{ px: 2 }}>
              <Typography variant="medium" textTransform="uppercase" fontSize={16}>
                Search History
              </Typography>
              {history.length > 0 && (
                <Typography
                  onClick={handleClearHistory}
                  sx={{
                    color: 'grey.300',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease-in-out',
                    '&:hover': { color: 'grey.800' },
                  }}
                >
                  Clear History
                </Typography>
              )}
            </Stack>
            <Stack>
              {history.length > 0 ? (
                history.map((o) => (
                  <SearchOption
                    afterClick={handleClose}
                    handleClear={handleClearHistoryItem}
                    updateHistory={updateHistory}
                    variant="history"
                    {...o}
                  />
                ))
              ) : (
                <Typography sx={{ px: 2 }}>History is empty</Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Collapse>
    </Box>
  );
};

export default Searchbar;
