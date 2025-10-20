import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

// components
import Header from "@/components/navigation/Header";
import CustomContainer from "@/components/ui/layout/CustomContainer";

const PrimaryLayout: React.FC = () => {
  return (
    <Stack sx={{ minHeight: "100svh" }}>
      <Header />
      <CustomContainer sx={{ flex: 1, display: "flex", flexDirection: "column", py: { xs: 3, md: 6 } }}>
        <Outlet />
      </CustomContainer>
    </Stack>
  );
};

export default PrimaryLayout;
