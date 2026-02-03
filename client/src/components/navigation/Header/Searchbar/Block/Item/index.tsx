import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

// api
import { SearchResult } from '@/api/products/products.types';

type SearchOptionProps = SearchResult & {
  afterClick: () => void;
  handleClear?: (s: string) => void;
  updateHistory: () => void;
  variant: 'result' | 'history';
};

const SearchOption: React.FC<SearchOptionProps> = ({
  title,
  slug,
  variant,
  afterClick,
  handleClear,
  updateHistory,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const updatedHistory = [{ title, slug }, ...history.filter((h: SearchResult) => h.slug !== slug)].slice(0, 5);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    updateHistory();

    navigate(`/catalog/${slug}`);
    afterClick();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClear && handleClear(slug);
  };

  return (
    <Stack
      onClick={handleClick}
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
          onClick={handleDelete}
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
