import { IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/redux/store";

// redux
import { logout } from "@/redux/auth/auth.actions";

// types
import { UserSession } from "@/api/user/user.types";

// icons
import { DeleteOutline } from "@mui/icons-material";

// mapping
import { sessionIconsMap } from "@/data/mapping";

const Session: React.FC<UserSession> = ({ id, deviceType, isCurrent, country, os, createdAt }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getIcon = () => {
    const Icon = sessionIconsMap[deviceType ?? "desktop"] ?? sessionIconsMap.desktop;
    return <Icon sx={{ width: { xs: 40 }, height: "auto", color: "text.secondary" }} />;
  };

  const handleLogout = async () => {
    if (isCurrent) {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      gap={3}
      px={3}
      py={2}
      sx={(theme) => ({ border: `1px solid ${theme.palette.grey[100]}` })}
    >
      <Stack flexDirection="row" alignItems="center" gap={2}>
        {getIcon()}
        <Stack>
          <Typography variant="medium" fontSize={16} textTransform="uppercase">
            {os}, {country}
          </Typography>
          <Typography>Session started on: {new Date(createdAt).toLocaleDateString("en-GB")}</Typography>
        </Stack>
      </Stack>
      <IconButton color="error" onClick={handleLogout}>
        <DeleteOutline />
      </IconButton>
    </Stack>
  );
};

export default Session;
