import { Box, Grid, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <Grid container sx={{ height: "100vh", minHeight: "100vh" }}>
      <Grid size={{ xs: 6 }} sx={{ height: "100%" }}>
        <Box sx={{ position: "relative", height: "100%", overflow: "hidden" }}>
          <Box
            component="img"
            src="/auth.png"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
          <Stack gap={3} sx={{ position: "absolute", bottom: 48, transform: "translateX(-50%)", left: "50%" }}>
            <Typography fontSize={40} fontWeight={600} color="common.white" textAlign="center">
              Turn your ideas into reality
            </Typography>
            <Typography color="common.white">Start for free and get attractive offers from the community</Typography>
          </Stack>
        </Box>
      </Grid>
      <Grid size={{ xs: 6 }} sx={{ display: "flex", height: "100%" }}>
        <Stack sx={{ flex: 1, height: "100%", alignItems: "center", justifyContent: "center" }}>
          <Outlet />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
