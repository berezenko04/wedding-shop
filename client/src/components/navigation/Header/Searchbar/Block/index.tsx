import { Stack, Typography } from '@mui/material';

// components
import SearchOption from './Item';

// types
import { SearchResult } from '@/api/products/products.types';

type SearchbarBlockProps = {
  title: string;
  variant: 'result' | 'history';
  options: SearchResult[];
  onClearHistory?: () => void;
  onClearHistoryItem?: (s: string) => void;
  afterClickOption: () => void;
};

const SearchbarBlock: React.FC<SearchbarBlockProps> = ({
  title,
  variant,
  options,
  onClearHistory,
  onClearHistoryItem,
  afterClickOption,
}) => {
  return (
    <Stack gap={0.5}>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={1} sx={{ px: 2 }}>
        <Typography variant="medium" textTransform="uppercase" fontSize={16}>
          {title}
        </Typography>
        {options.length > 0 && (
          <Typography
            onClick={onClearHistory}
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
        {options.length > 0 ? (
          options.map((o) => (
            <SearchOption
              key={o.slug}
              afterClick={afterClickOption}
              handleClear={onClearHistoryItem}
              variant={variant}
              {...o}
            />
          ))
        ) : (
          <Typography sx={{ px: 2 }}>History is empty</Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default SearchbarBlock;
