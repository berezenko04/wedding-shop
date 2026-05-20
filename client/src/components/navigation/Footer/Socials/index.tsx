import { Link, Stack } from '@mui/material';

// data
import { socials } from '@/data/socials';

const Socials: React.FC = () => {
  return (
    <Stack sx={{ flexDirection: 'row', gap: 1.5 }}>
      {socials.map(({ icon: Icon, href, name }) => (
        <Link key={href} href={href} sx={{ width: 24, height: 24 }} aria-label={name}>
          <Icon
            sx={{
              color: 'grey.400',
              transition: 'all .25s ease-in-out',
              '&:hover': { color: 'common.white' },
            }}
          />
        </Link>
      ))}
    </Stack>
  );
};

export default Socials;
