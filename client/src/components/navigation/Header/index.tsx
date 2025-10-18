import { Stack } from "@mui/material";

// components
import Logo from "../Logo";

const Header: React.FC = () => {
  return (
    <Stack component="header" gap={3} justifyContent="space-between" alignItems="center">
      <Logo />
      
    </Stack>
  );
};

export default Header;
