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
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.MuiTypography-h1, &.MuiTypography-h2, &.MuiTypography-h3, &.MuiTypography-h4, &.MuiTypography-h5, &.MuiTypography-h6":
            {
              color: theme.palette.grey[700],
              fontWeight: 500,
              letterSpacing: "-2.5%",
            },
        }),
        h1: {
          fontSize: 80,
        },
        h2: {
          fontSize: 56,
        },
        h3: {
          fontSize: 48,
        },
        h4: {
          fontSize: 32,
        },
        h5: {
          fontSize: 24,
        },
        body1: { fontSize: 16, lineHeight: 24 },
      },
    },
  },
});

export default theme;
