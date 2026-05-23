import { Drawer, DrawerProps, IconButton, Stack, Typography } from '@mui/material';

// icons
import { Close } from '@mui/icons-material';

type Props = DrawerProps & { title: string };

const CustomDrawer: React.FC<Props> = ({ title, ...props }) => {
  return (
    <Drawer
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: 580 },
            height: '100dvh',
            maxHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          },
        },
      }}
      {...props}
    >
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={4} p={3}>
        <Typography variant="h3">{title}</Typography>
        <IconButton onClick={(event) => props.onClose?.(event, 'escapeKeyDown')}>
          <Close />
        </IconButton>
      </Stack>
      {props.children}
    </Drawer>
  );
};

export default CustomDrawer;
