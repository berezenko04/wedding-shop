import { Box, Grid, Stack, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <Grid
      container
      sx={{
        height: '100dvh',
        overflow: 'hidden',
      }}
    >
      <Grid
        size={6}
        sx={{
          display: { xs: 'none', md: 'block' },
          height: '100%',
        }}
      >
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
              left: '50%',
              transform: 'translateX(-50%)',
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

      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            height: '100%',
            overflowY: 'auto',
            px: 2,
            py: 4,
          }}
        >
          <Box
            sx={{
              minHeight: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 520,
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
