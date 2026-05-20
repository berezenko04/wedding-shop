import { Box, Stack } from '@mui/material';

// components
import CustomContainer from '../../../ui/layout/CustomContainer';

// data
import { companies } from '@/data/main';

const HomepageCompanies: React.FC = () => {
  return (
    <Stack py={8} sx={{ display: { xs: 'none', lg: 'flex' }, backgroundColor: 'grey.50' }}>
      <CustomContainer>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            justifyContent: 'space-between',
          }}
        >
          {companies.map(({ src, alt }) => (
            <Box key={src} component="img" src={src} alt={alt} />
          ))}
        </Stack>
      </CustomContainer>
    </Stack>
  );
};

export default HomepageCompanies;
