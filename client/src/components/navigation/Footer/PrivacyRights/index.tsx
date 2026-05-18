import { Box, Link, Stack, Typography } from '@mui/material';

// components
import CustomContainer from '@/components/ui/layout/CustomContainer';

// data
import { privacyMenu } from '@/data/menus';

const PrivacyRights: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: 'common.black' }} py={2}>
      <CustomContainer>
        <Stack
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          gap={{ xs: 1.5, md: 3 }}
        >
          <Typography color="grey.400">© {new Date().getFullYear()} Sandrela, All Rights Reserved</Typography>
          <Stack
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            gap={{ xs: 1.5, sm: 3 }}
          >
            {privacyMenu.map(({ title, href }) => (
              <Link key={href} href={href} color="grey">
                {title}
              </Link>
            ))}
          </Stack>
        </Stack>
      </CustomContainer>
    </Box>
  );
};

export default PrivacyRights;
