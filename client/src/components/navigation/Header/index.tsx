import { Button, Stack } from "@mui/material";

// components
import Logo from "../Logo";

const Header: React.FC = () => {
  return (
    <Stack component="header" flexDirection="row" gap={3} justifyContent="space-between" alignItems="center">
      <Logo />
      <Button  size="small" color="grey" variant="outlined" sx={{ textTransform: "none" }}>
        Catalog
      </Button>
    </Stack>
  );
};

export default Header;
