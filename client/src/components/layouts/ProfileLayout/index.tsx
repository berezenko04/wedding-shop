import { Grid } from "@mui/material";
import { Outlet } from "react-router";

// components
import ProfileMenu from "@/components/navigation/ProfileMenu";

const ProfileLayout: React.FC = () => {
  return (
    <Grid container>
      <Grid size={{ xs: 2 }}>
        <ProfileMenu />
      </Grid>
      <Grid size={{ xs: 10 }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default ProfileLayout;
