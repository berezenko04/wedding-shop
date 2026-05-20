import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

// utils
import { getHistoryLS, setHistoryLS } from '@/utils/searchLocaleStorage';

// types
import { SearchResult } from '@/api/products/products.types';

type SearchOptionProps = SearchResult & {
  afterClick: () => void;
  handleClear?: (s: string) => void;
  variant: 'result' | 'history';
};

const SearchOption: React.FC<SearchOptionProps> = ({ title, slug, variant, afterClick, handleClear }) => {
  const navigate = useNavigate();

  const handleSelectSearchOption = () => {
    const history = getHistoryLS();

    const updatedHistory = [{ title, slug }, ...history.filter((h) => h.slug !== slug)].slice(0, 5);

    setHistoryLS(updatedHistory);

    navigate(`/catalog/${slug}`);
    afterClick();
  };

  const handleDeleteHistoryItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClear && handleClear(slug);
  };

  return (
    <Stack
      onClick={handleSelectSearchOption}
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        px: 2,
        py: 0.5,
        cursor: 'pointer',
        transition: 'all 0.25s ease-in-out',
        '&:hover': { backgroundColor: 'grey.50' },
      }}
    >
      <Typography>{title}</Typography>
      {variant === 'history' && (
        <Typography
          onClick={handleDeleteHistoryItem}
          sx={{
            color: 'grey.300',
            cursor: 'pointer',
            transition: 'all 0.25s ease-in-out',
            '&:hover': { color: 'grey.800' },
          }}
        >
          Delete
        </Typography>
      )}
    </Stack>
  );
};

export default SearchOption;
