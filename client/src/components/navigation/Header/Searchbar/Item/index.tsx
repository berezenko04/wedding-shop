import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

// api
import { SearchResult } from '@/api/products/products.types';

type SearchOptionProps = SearchResult & {
  afterClick: () => void;
  variant: 'result' | 'history';
};

const SearchOption: React.FC<SearchOptionProps> = ({ title, slug, variant, afterClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const updatedHistory = [{ title, slug }, ...history.filter((h: SearchResult) => h.slug !== slug)].slice(0, 5);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

    navigate(`/catalog/${slug}`);
    afterClick();
  };

  return (
    <Stack
      onClick={handleClick}
      sx={{
        px: 2,
        py: 0.5,
        cursor: 'pointer',
        transition: 'all 0.25s ease-in-out',
        '&:hover': { backgroundColor: 'grey.50' },
      }}
    >
      <Typography>{title}</Typography>
    </Stack>
  );
};

export default SearchOption;
