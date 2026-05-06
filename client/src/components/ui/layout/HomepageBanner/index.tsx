import { Box, Stack, Typography } from '@mui/material';

// components
import CustomContainer from '../CustomContainer';
import OutlinedWhiteArrowButton from '@/components/ui/buttons/OutlinedWhiteArrow';

const HomepageBanner: React.FC = () => {
  return (
    <Box sx={{ width: '100%', height: { xs: 280, sm: 360, md: 480, lg: 650 }, position: 'relative' }}>
      <Box
        component="img"
        src="/banner.webp"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: { xs: 36, md: 72 },
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <CustomContainer>
          <Stack gap={{ xs: 4, md: 6, lg: 8 }} alignItems="center">
            <Typography
              variant="h1"
              sx={(theme) => ({
                color: `${theme.palette.grey[50]} !important`,
                textAlign: 'center',
                lineHeight: '130%',
                fontSize: { xs: 24, sm: 32, md: 40, lg: 76 },
              })}
            >
              Bridal shop with the possibility of individual tailoring
            </Typography>
            <OutlinedWhiteArrowButton href="/catalog">View All</OutlinedWhiteArrowButton>
          </Stack>
        </CustomContainer>
      </Box>
    </Box>
  );
};

export default HomepageBanner;
