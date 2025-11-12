import { Box, Button, Fade, Modal, Stack, Typography, type ModalProps } from "@mui/material";

// icons
import { Clear } from "@mui/icons-material";

type TCustomModalProps = ModalProps & {
  children: React.ReactNode;
  maxWidth: number;
  title: string;
};

const CustomModal: React.FC<TCustomModalProps> = ({ title, maxWidth, children, ...props }) => {
  return (
    <Modal {...props}>
      <Fade in={props.open}>
        <Stack
          sx={{
            maxWidth,
            width: "100%",
            maxHeight: { xs: "100vh", sm: "90vh" },
            height: { xs: "100%", sm: "auto" },
            bgcolor: "background.paper",
            boxShadow: 24,
            gap: 3,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "hidden",
            padding: 3,
          }}
        >
          <Typography variant="medium" textAlign="center" fontSize={20} textTransform="uppercase">
            {title}
          </Typography>
          <Box
            sx={{
              overflow: "visible",
              flexGrow: 1,
              overflowY: "auto",
              minHeight: 0,
              p: 1,
            }}
          >
            {children}
          </Box>
          <Button startIcon={<Clear />} variant="outlined" color="grey" size="small">
            Close
          </Button>
        </Stack>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
