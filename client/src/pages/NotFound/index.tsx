import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

// icons
import { KeyboardArrowLeft } from "@mui/icons-material";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 6 }}>
        <Box
          component="img"
          src="/404.webp"
          sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
      </Grid>
      <Grid size={{ xs: 6 }} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Stack gap={4}>
          <Typography variant="h3">404 Error</Typography>
          <Typography
            variant="h1"
            sx={(theme) => ({
              color: `${theme.palette.primary.main} !important`,
            })}
          >
            Whoops ! Something went wrong
          </Typography>
          <Typography>
            Sorry, the page are looking for doesn't exist or has been removed. Try searching our site.
          </Typography>
          <Stack flexDirection="row" gap={4} alignItems="center">
            <Button onClick={() => navigate(-1)} startIcon={<KeyboardArrowLeft />} variant="outlined" color="primary">
              Go back
            </Button>
            <Button href="/" variant="contained" color="primary">
              Go to the main page
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default NotFoundPage;
