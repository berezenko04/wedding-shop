import { Box, Button, IconButton, Stack } from "@mui/material";
import { useSelector } from "react-redux";

// components
import Logo from "../Logo";
import Searchbar from "./Searchbar";
import CustomContainer from "@/components/ui/layout/CustomContainer";

// redux
import { authSelector } from "@/redux/auth/auth.selectors";

// icons
import { FavoriteBorderOutlined, LocalMallOutlined, PersonOutline, StorefrontOutlined } from "@mui/icons-material";

const Header: React.FC = () => {
  const { isAuth } = useSelector(authSelector);

  return (
    <Box component="header">
      <CustomContainer>
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
          {!isAuth ? (
            <Stack flexDirection="row" alignItems="center" gap={0.5}>
              <IconButton href="/profile/wishlist">
                <FavoriteBorderOutlined />
              </IconButton>
              <IconButton>
                <LocalMallOutlined />
              </IconButton>
              <Button href="/profile" variant="iconary" color="grey">
                <PersonOutline />
              </Button>
            </Stack>
          ) : (
            <Stack flexDirection="row" gap={2} alignItems="center">
              <Button href="/register" color="primary" variant="outlined" size="small">
                Sign Up
              </Button>
              <Button href="/login" color="primary" variant="contained" size="small">
                Sign In
              </Button>
            </Stack>
          )}
        </Stack>
      </CustomContainer>
    </Box>
  );
};

export default Header;
