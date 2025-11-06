import { Button, Stack, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// components
import Session from "./Item";

// api
import UserService from "@/api/user/user.service";
import AuthService from "@/api/auth/auth.service";

// types
import { UserSession } from "@/api/user/user.types";
import { BaseResponseData } from "@/types/base.types";

const Sessions: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: sessions = [] } = useQuery({
    queryKey: ["sessions"],
    queryFn: UserService.getSessions,
  });

  const logoutAllMutation = useMutation({
    mutationFn: AuthService.logoutAll,
    onSuccess: (result: BaseResponseData) => {
      toast.success(result.message);
      queryClient.setQueryData(["sessions"], (old: UserSession[] = []) => old.filter((s) => s.isCurrent === true));
    },
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
          <Button
            variant="outlined"
            color="grey"
            size="small"
            sx={{ width: "max-content" }}
            onClick={() => logoutAllMutation.mutate()}
          >
            Log out all devices without current
          </Button>
        </>
      )}
    </Stack>
  );
};

export default Sessions;
