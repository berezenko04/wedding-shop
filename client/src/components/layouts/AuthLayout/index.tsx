import { Box, Grid, Stack, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <Grid container sx={{ height: '100vh', minHeight: '100vh' }}>
      <Grid size={6} sx={{ display: { xs: 'none', md: 'grid' }, height: '100%' }}>
        <Box sx={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
          <Box
            component="img"
            src="/auth.webp"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
          <Stack
            gap={{ xs: 1.5, lg: 3 }}
            alignItems="center"
            sx={{
              position: 'absolute',
              width: '100%',
              bottom: { xs: 24, lg: 48 },
              p: 2,
              transform: 'translateX(-50%)',
              left: '50%',
            }}
          >
            <Typography fontSize={{ xs: 28, lg: 40 }} fontWeight={600} color="common.white" textAlign="center">
              Turn your ideas into reality
            </Typography>
            <Typography color="common.white" textAlign="center">
              Start for free and get attractive offers from the community
            </Typography>
          </Stack>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', height: '100%' }}>
        <Stack sx={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', p: 2 }}>
          <Outlet />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
