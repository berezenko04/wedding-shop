import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#ED7222", 50: "#FEF7EE" },
    success: { main: "#12B76A", 100: "#C2E9D1" },
    error: { main: "#F04438" },
    blue: {
      800: "#444A58",
    },
    grey: {
      800: "#383838",
      700: "#434343",
      500: "#686868",
      400: "#818181",
      300: "#A4A4A4",
      200: "#C8C8C8",
      100: "#E3E3E3",
      50: "#F7F7F7",
    },
    common: {
      white: "#FFFFFF",
      black: "#121212",
    },
  },
});

export default theme;
