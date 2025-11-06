import { Button, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

// components
import Session from "./Item";

// api
import UserService from "@/api/user/user.service";

const Sessions: React.FC = () => {
  const { data: sessions = [] } = useQuery({
    queryKey: ["sessions"],
    queryFn: UserService.getSessions,
  });

  return (
    <Stack gap={2}>
      <Stack gap={2}>
        <Typography variant="medium" textTransform="uppercase" fontSize={24}>
          Current Device
        </Typography>
        <Session {...sessions.find((i) => i.isCurrent)!} />
      </Stack>
      {sessions.length > 1 && (
        <>
          <Stack gap={2}>
            <Typography variant="medium" textTransform="uppercase" fontSize={24}>
              Other Devices
            </Typography>
            {sessions
              .filter((i) => !i.isCurrent)
              .map((session) => (
                <Session {...session} />
              ))}
          </Stack>
          <Button variant="outlined" color="grey" size="small" sx={{ width: "max-content" }}>
            Log out all devices without current
          </Button>
        </>
      )}
    </Stack>
  );
};

export default Sessions;
