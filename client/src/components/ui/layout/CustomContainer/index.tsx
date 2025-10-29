import { Container, type SxProps } from "@mui/material";

type ContainerProps = {
  sx?: SxProps;
  children: React.ReactNode;
};

const CustomContainer: React.FC<ContainerProps> = ({ sx, children }) => {
  return (
    <Container
      disableGutters
      sx={{
        position: "relative",
        maxWidth: "1614px !important",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        px: { xs: 2, md: 4 },
        ...sx,
      }}
    >
      {children}
    </Container>
  );
};

export default CustomContainer;
