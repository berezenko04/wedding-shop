import { createTheme } from "@mui/material";

// providers
import { LinkBehavior } from "./components/providers/LinkBehavior";

const theme = createTheme({
  palette: {
    primary: { main: "#ED7222", 300: "#F6B87B", 50: "#FEF7EE" },
    success: { main: "#12B76A", 100: "#C2E9D1" },
    error: { main: "#F04438" },
    blue: {
      800: "#444A58",
      200: "#BCBCFF",
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
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: "100%",
        },
        body: {
          height: "100%",
        },
        "#root": {
          height: "100%",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.MuiTypography-h1, &.MuiTypography-h2, &.MuiTypography-h3, &.MuiTypography-h4, &.MuiTypography-h5, &.MuiTypography-h6":
            {
              fontFamily: '"Cinzel", serif',
              color: theme.palette.grey[700],
              fontWeight: 500,
              letterSpacing: "-2.5%",
            },
        }),
        h1: {
          fontSize: 80,
        },
        h2: {
          fontSize: 48,
        },
        h3: {
          fontSize: 32,
        },
        h4: {
          fontSize: 24,
        },
        body1: ({ theme }) => ({ fontSize: 16, lineHeight: "24px", color: theme.palette.grey[500] }),
      },
    },
    MuiButton: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: 16,
          lineHeight: "24px",
          borderRadius: 0,
          boxShadow: "none",
          whiteSpace: "nowrap",
          minWidth: "max-content",

          "&:hover": {
            boxShadow: "none",
          },
        },
        containedPrimary: ({ theme }) => ({
          color: theme.palette.common.white,
        }),
        sizeMedium: {
          padding: "16px 32px",

          svg: {
            width: 32,
            height: 32,
          },
        },
        sizeSmall: {
          padding: "8px 16px",
          height: 40,

          svg: {
            width: 24,
            height: 24,
          },
        },
      },
      variants: [
        {
          props: { variant: "iconary" },
          style: {
            width: 40,
            height: 40,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 0,
            padding: 0,

            svg: {
              width: 24,
              height: 24,
            },
          },
        },
        {
          props: { variant: "iconary", color: "grey" },
          style: ({ theme }) => ({
            border: `1px solid ${theme.palette.grey[50]}`,

            svg: {
              color: theme.palette.grey[500],
            },

            "&:hover": {
              backgroundColor: theme.palette.grey[100],
              borderColor: theme.palette.grey[200],
            },
          }),
        },
        {
          props: { color: "grey" },
          style: ({ theme }) => ({
            color: theme.palette.grey[500],
            "&:hover": { backgroundColor: theme.palette.grey[50] },
          }),
        },
        {
          props: { variant: "outlined", color: "grey" },
          style: ({ theme }) => ({
            border: `1px solid ${theme.palette.grey[200]}`,
            backgroundColor: theme.palette.grey[50],

            "&:hover": {
              backgroundColor: theme.palette.grey[100],
            },
          }),
        },
        {
          props: { color: "white" },
          style: ({ theme }) => ({
            color: theme.palette.common.white,
          }),
        },
        {
          props: { variant: "outlined", color: "white" },
          style: ({ theme }) => ({
            border: `1px solid ${theme.palette.common.white}`,
            backgroundColor: "transparent",

            // "&:hover": {
            //   backgroundColor: theme.palette.grey[100],
            // },
          }),
        },
      ],
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
        underline: "none",
      },
      styleOverrides: {
        root: {
          transition: "all 0.2s ease",
        },
      },
      variants: [
        {
          props: { color: "primary" },
          style: ({ theme }) => ({
            color: theme.palette.primary.main,
            "&:hover": {
              color: theme.palette.primary.dark,
            },
          }),
        },
        {
          props: { variant: "underlined" },
          style: {
            textDecoration: "underline",
          },
        },
        {
          props: { color: "grey" },
          style: ({ theme }) => ({
            color: theme.palette.grey[400],
            "&:hover": {
              color: theme.palette.common.white,
            },
          }),
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 0,
          height: 40,
          boxSizing: "border-box",

          "& .MuiInputAdornment-root svg": {
            color: theme.palette.grey[400],
          },
        }),

        input: ({ theme }) => ({
          padding: "10px 14px",
          height: "100%",
          boxSizing: "border-box",
          color: theme.palette.text.primary,

          "&::placeholder": {
            color: theme.palette.grey[400],
            opacity: 1,
          },
        }),
      },
    },
  },
});

export default theme;
