import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

// components
import Header from "@/components/navigation/Header";
import CustomContainer from "@/components/ui/layout/CustomContainer";
import WarAlert from "@/components/navigation/WarAlert";
import Footer from "@/components/navigation/Footer";
import PrivacyRights from "@/components/navigation/Footer/PrivacyRights";

const PrimaryLayout: React.FC = () => {
  return (
    <Stack sx={{ minHeight: "100svh" }}>
      <WarAlert />
      <Header />
      <CustomContainer sx={{ flex: 1, display: "flex", flexDirection: "column", py: { xs: 3, md: 6 } }}>
        <Outlet />
      </CustomContainer>
      <Footer />
      <PrivacyRights />
    </Stack>
  );
};

export default PrimaryLayout;
