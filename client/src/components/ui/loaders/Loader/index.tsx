import { alpha, Box, CircularProgress, keyframes, useTheme } from "@mui/material";

const fade = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
`;

const Loader: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100dvh",
        width: "100%",
        position: "fixed",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: alpha(theme.palette.background.default, 0.5),
          backdropFilter: "blur(8px)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          width: "max-content",
          animation: `${fade} 2s infinite ease-in-out`,
          userSelect: "none",
        }}
        aria-label="loading"
      >
        <CircularProgress color="primary" />
      </Box>
    </Box>
  );
};

export default Loader;
