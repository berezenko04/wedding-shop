import { IconButton, Stack, Typography } from "@mui/material";

// types
import { UserSession } from "@/api/user/user.types";

// icons
import { DeleteOutline } from "@mui/icons-material";

// mapping
import { sessionIconsMap } from "@/data/mapping";

const Session: React.FC<UserSession> = ({ id, deviceType, country, os, createdAt }) => {
  const getIcon = () => {
    const Icon = sessionIconsMap[deviceType ?? "desktop"] ?? sessionIconsMap.desktop;
    return <Icon sx={{ width: { xs: 40 }, height: "auto", color: "text.secondary" }} />;
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
      <IconButton color="error">
        <DeleteOutline />
      </IconButton>
    </Stack>
  );
};

export default Session;
