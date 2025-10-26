import { Stack } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

// components
import Header from "@/components/navigation/Header";
import WarAlert from "@/components/navigation/WarAlert";
import Footer from "@/components/navigation/Footer";
import PrivacyRights from "@/components/navigation/Footer/PrivacyRights";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

const PrimaryLayout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <Stack minHeight="100svh">
      <WarAlert />
      <Header />
      {!isHome && <Breadcrumbs />}
      <Stack flexGrow={1} flexDirection="column" py={isHome ? 0 : 8}>
        <Outlet />
      </Stack>
      <Footer />
      <PrivacyRights />
    </Stack>
  );
};

export default PrimaryLayout;
