import { Box, Grid } from "@mui/material";

// components
import CustomContainer from "@/components/ui/layout/CustomContainer";
import Socials from "./Socials";

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: "common.black" }} py={4}>
      <CustomContainer>
        <Grid container spacing={4}>
          <Grid size={{ xs: 3 }}>
            <Socials />
          </Grid>
        </Grid>
      </CustomContainer>
    </Box>
  );
};

export default Footer;
