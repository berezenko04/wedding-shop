import { Button, Stack } from "@mui/material";

// components
import Logo from "../Logo";
import Searchbar from "./Searchbar";

// icons
import { StorefrontOutlined } from "@mui/icons-material";

const Header: React.FC = () => {
  return (
    <Stack component="header" flexDirection="row" gap={3} py={2} justifyContent="space-between" alignItems="center">
      <Logo />
      <Button
        startIcon={<StorefrontOutlined />}
        size="small"
        color="grey"
        variant="outlined"
        href="/catalog"
        sx={{ textTransform: "none" }}
      >
        Catalog
      </Button>
      <Searchbar />
      <Stack flexDirection="row" gap={2} alignItems="center">
        <Button href="/register" color="primary" variant="outlined" size="small">
          Sign Up
        </Button>
        <Button href="/login" color="primary" variant="contained" size="small">
          Sign In
        </Button>
      </Stack>
    </Stack>
  );
};

export default Header;
