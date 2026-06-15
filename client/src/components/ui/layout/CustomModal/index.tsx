import { Box, Fade, Modal, Stack, Typography, type ModalProps, useTheme, useMediaQuery, Button } from '@mui/material';

type Props = ModalProps & {
  children: React.ReactNode;
  maxWidth: number;
  title: string;
};

const CustomModal: React.FC<Props> = ({ title, maxWidth, children, ...props }) => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Modal {...props}>
      <Fade in={props.open}>
        <Stack
          sx={{
            maxWidth,
            width: '100%',
            maxHeight: { xs: '100vh', sm: '90vh' },
            height: { xs: '100%', sm: 'auto' },
            bgcolor: 'background.paper',
            boxShadow: 24,
            gap: 3,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'hidden',
            padding: 3,
          }}
        >
          <Typography variant="medium" textAlign="center" fontSize={24} textTransform="uppercase">
            {title}
          </Typography>
          <Box
            sx={{
              overflow: 'visible',
              flexGrow: 1,
              overflowY: 'auto',
              minHeight: 0,
            }}
          >
            {children}
            {!isSmUp && (
              <Button
                variant="outlined"
                color="grey"
                size="small"
                fullWidth
                sx={{ mt: 1 }}
                onClick={(event) => props.onClose?.(event, 'escapeKeyDown')}
              >
                Close
              </Button>
            )}
          </Box>
        </Stack>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
