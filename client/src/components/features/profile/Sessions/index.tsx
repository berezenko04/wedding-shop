import { Button, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// components
import Session from './Item';
import SessionSkeleton from '@/components/ui/loaders/skeletons/Session';

// api
import UserService from '@/api/user/user.service';
import AuthService from '@/api/auth/auth.service';

// types
import { UserSession } from '@/api/user/user.types';
import { BaseResponseData } from '@/types/base.types';

const Sessions: React.FC = () => {
  const queryClient = useQueryClient();
  const theme = useTheme();

  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: UserService.getSessions,
  });

  const logoutAllMutation = useMutation({
    mutationFn: AuthService.logoutAll,
    onSuccess: (result: BaseResponseData) => {
      toast.success(result.message);
      queryClient.setQueryData(['sessions'], (old: UserSession[] = []) => old.filter((s) => s.isCurrent === true));
    },
  });

  return (
    <Stack gap={2}>
      <Stack gap={2}>
        <Typography variant="medium" textTransform="uppercase" fontSize={24}>
          Current Device
        </Typography>
        {isLoading ? <SessionSkeleton /> : <Session {...sessions.find((i) => i.isCurrent)!} />}
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
            sx={{ width: 'max-content' }}
            onClick={() => logoutAllMutation.mutate()}
          >
            {isSmUp ? 'Log out all devices without current' : 'Log out all devices'}
          </Button>
        </>
      )}
    </Stack>
  );
};

export default Sessions;
