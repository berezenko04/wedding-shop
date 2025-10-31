import { Grid } from "@mui/material";
import { Outlet } from "react-router";

const ProfileLayout: React.FC = () => {
  return (
    <Grid container>
      <Grid size={{ xs: 2 }}>Menu</Grid>
      <Grid size={{ xs: 10 }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default ProfileLayout;
