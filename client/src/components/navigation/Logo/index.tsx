import { Link } from '@mui/material';

type LogoProps = {
  color?: 'light' | 'dark';
};

const Logo: React.FC<LogoProps> = ({ color = 'dark' }) => {
  return (
    <Link
      href="/"
      variant="plain"
      sx={{
        color: color === 'dark' ? 'grey.500' : 'common.white',
        '&:hover': {
          color: color === 'dark' ? 'grey.500' : 'common.white',
        },
      }}
      textTransform="uppercase"
      fontSize={{ xs: 22, sm: 24 }}
      fontFamily="Placid Armor"
    >
      Sandrela
    </Link>
  );
};

export default Logo;
