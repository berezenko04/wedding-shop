import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

// components
import Header from "@/components/navigation/Header";
import WarAlert from "@/components/navigation/WarAlert";
import Footer from "@/components/navigation/Footer";
import PrivacyRights from "@/components/navigation/Footer/PrivacyRights";

const PrimaryLayout: React.FC = () => {
  return (
    <Stack sx={{ minHeight: "100svh" }}>
      <WarAlert />
      <Header />
      <Stack sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Outlet />
      </Stack>
      <Footer />
      <PrivacyRights />
    </Stack>
  );
};

export default PrimaryLayout;
