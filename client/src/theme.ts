import { alpha, createTheme } from '@mui/material';

// providers
import { LinkBehavior } from './components/providers/LinkBehavior';

// icons
import { KeyboardArrowDown } from '@mui/icons-material';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: { main: '#ED7222', 300: '#F6B87B', 50: '#FEF7EE' },
    success: { main: '#12B76A', 100: '#C2E9D1' },
    error: { main: '#F04438' },
    blue: {
      800: '#444A58',
      200: '#BCBCFF',
    },
    yellow: {
      500: '#FFCE15',
    },
    grey: {
      800: '#383838',
      700: '#434343',
      500: '#686868',
      400: '#818181',
      300: '#A4A4A4',
      200: '#C8C8C8',
      100: '#E3E3E3',
      50: '#F7F7F7',
    },
    common: {
      white: '#FFFFFF',
      black: '#121212',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
        },
        '#root': {
          height: '100%',
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
          '&.MuiTypography-h1, &.MuiTypography-h2, &.MuiTypography-h3, &.MuiTypography-h4, &.MuiTypography-h5, &.MuiTypography-h6':
            {
              fontFamily: `"Placid Armor", serif`,
              color: theme.palette.grey[700],
              textTransform: 'uppercase',
              fontWeight: 500,
            },
        }),
        h1: ({ theme }) => ({
          fontSize: 40,
          [theme.breakpoints.up('sm')]: {
            fontSize: 48,
          },
          [theme.breakpoints.up('md')]: {
            fontSize: 56,
          },
          [theme.breakpoints.up('lg')]: {
            fontSize: 64,
          },
        }),
        h2: ({ theme }) => ({
          fontSize: 32,
          [theme.breakpoints.up('sm')]: {
            fontSize: 40,
          },
          [theme.breakpoints.up('md')]: {
            fontSize: 48,
          },
          [theme.breakpoints.up('lg')]: {
            fontSize: 56,
          },
        }),
        h3: ({ theme }) => ({
          fontSize: 28,
          [theme.breakpoints.up('md')]: {
            fontSize: 32,
          },
        }),
        h4: {
          fontSize: 24,
        },
        body1: ({ theme }) => ({
          fontSize: 16,
          lineHeight: '24px',
          color: theme.palette.grey[500],
        }),
      },
      variants: [
        {
          props: { variant: 'medium' },
          style: ({ theme }) => ({
            fontSize: 20,
            fontWeight: 500,
            lineHeight: '24px',
            color: theme.palette.grey[700],
          }),
        },
      ],
    },
    MuiButton: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: 16,
          lineHeight: '24px',
          borderRadius: 0,
          boxShadow: 'none',
          whiteSpace: 'nowrap',
          minWidth: 'max-content',

          svg: {
            width: 24,
            height: 24,
          },

          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: ({ theme }) => ({
          color: theme.palette.common.white,
        }),
        sizeMedium: {
          padding: '16px 32px',
          height: 56,
        },
        sizeSmall: {
          padding: '8px 16px',
          height: 40,
        },
      },
      variants: [
        {
          props: { variant: 'iconary' },
          style: ({ theme }) => ({
            width: 40,
            height: 40,
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%',
            padding: 0,

            svg: {
              width: 24,
              height: 24,
              color: theme.palette.grey[500],
            },
          }),
        },
        {
          props: { variant: 'iconaryOutlined' },
          style: ({ theme }) => ({
            width: 40,
            height: 40,
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,

            svg: {
              width: 24,
              height: 24,
              color: theme.palette.grey[500],
            },
          }),
        },
        {
          props: { variant: 'iconary', size: 'large' },
          style: {
            width: 56,
            height: 56,
          },
        },
        {
          props: { variant: 'iconaryOutlined', size: 'large' },
          style: {
            flexShrink: 0,
            width: 56,
            height: 56,
          },
        },
        {
          props: { variant: 'iconaryOutlined', color: 'grey' },
          style: ({ theme }) => ({
            border: `1px solid ${theme.palette.grey[100]}`,

            '&:hover': {
              backgroundColor: theme.palette.grey[100],
            },
          }),
        },
        {
          props: { variant: 'iconary', color: 'white' },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.common.white,

            '&:hover': {
              backgroundColor: theme.palette.grey[100],
              borderColor: theme.palette.grey[200],
            },
          }),
        },
        {
          props: { variant: 'iconary', color: 'grey' },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.grey[50],

            '&:hover': {
              backgroundColor: theme.palette.grey[100],
              borderColor: theme.palette.grey[200],
            },
          }),
        },
        {
          props: { color: 'grey' },
          style: ({ theme }) => ({
            color: theme.palette.grey[500],
            '&:hover': { backgroundColor: theme.palette.grey[50] },
          }),
        },
        {
          props: { variant: 'outlined', color: 'grey' },
          style: ({ theme }) => ({
            border: `1px solid ${theme.palette.grey[200]}`,
            backgroundColor: theme.palette.grey[50],

            '&:hover': {
              backgroundColor: theme.palette.grey[100],
            },
          }),
        },
        {
          props: { color: 'white' },
          style: ({ theme }) => ({
            color: theme.palette.common.white,
          }),
        },
        {
          props: { variant: 'outlined', color: 'white' },
          style: ({ theme }) => ({
            fontSize: 20,
            border: `1px solid ${theme.palette.common.white}`,
            color: theme.palette.common.white,
            backgroundColor: 'transparent',

            [theme.breakpoints.up('lg')]: {
              fontSize: 24,
            },

            '&:hover': {
              backgroundColor: alpha(theme.palette.common.white, 0.08),
              borderColor: theme.palette.common.white,
            },
          }),
        },
      ],
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
        underline: 'none',
      },
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
        },
      },
      variants: [
        {
          props: { color: 'primary' },
          style: ({ theme }) => ({
            color: theme.palette.primary.main,
            '&:hover': {
              color: theme.palette.primary.dark,
            },
          }),
        },
        {
          props: { variant: 'underlined' },
          style: {
            textDecoration: 'underline',
          },
        },
        {
          props: { color: 'grey' },
          style: ({ theme }) => ({
            color: theme.palette.grey[400],
            '&:hover': {
              color: theme.palette.common.white,
            },
          }),
        },
        {
          props: { color: 'grey.500' },
          style: ({ theme }) => ({
            color: theme.palette.grey[500],
            '&:hover': {
              color: theme.palette.common.black,
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
          boxSizing: 'border-box',

          '& .MuiInputAdornment-root svg': {
            color: theme.palette.grey[400],
          },

          '&.MuiInputBase-multiline': {
            height: '100%',
            border: 'none',
            padding: 0,
          },
        }),

        input: ({ theme }) => ({
          padding: '10px 14px',
          height: '100%',
          boxSizing: 'border-box',
          color: theme.palette.text.primary,

          '&::placeholder': {
            color: theme.palette.grey[400],
            opacity: 1,
          },
        }),
      },
    },
    MuiSelect: {
      defaultProps: {
        IconComponent: KeyboardArrowDown,
      },
      styleOverrides: {
        icon: ({ theme }) => ({
          color: theme.palette.grey[700],
        }),
        select: ({ theme }) => ({
          textTransform: 'uppercase',
          fontWeight: 500,
          color: theme.palette.grey[700],
          padding: '4px 0',
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          textTransform: 'uppercase',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          alignSelf: 'center',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: 40,
          height: 40,
          borderRadius: 0,
          margin: 0,
          color: theme.palette.grey[700],
          backgroundColor: theme.palette.common.white,
          border: `1px solid ${theme.palette.grey[100]}`,
          fontSize: 14,
          fontWeight: 500,

          '&:not(:first-of-type)': {
            marginLeft: '-1px',
          },

          '&.Mui-selected': {
            backgroundColor: theme.palette.grey[50],
          },

          '&:hover': {
            backgroundColor: theme.palette.grey[100],
          },
        }),
        ellipsis: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconEmpty: ({ theme }) => ({
          color: theme.palette.yellow[500],
        }),
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: ({ theme }) => ({
          color: theme.palette.common.white,
          padding: '2px',
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        sizeMedium: {
          fontSize: 16,
        },
        colorSuccess: ({ theme }) => ({
          backgroundColor: theme.palette.success[100],
          color: theme.palette.success.main,
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: 16,
          borderColor: theme.palette.grey[50],
        }),
        body: ({ theme }) => ({
          color: theme.palette.grey[500],
        }),
        head: ({ theme }) => ({
          fontSize: 16,
          textTransform: 'uppercase',
          color: theme.palette.grey[700],
          backgroundColor: theme.palette.grey[50],
          fontWeight: 500,
        }),
      },
    },
    MuiTable: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${theme.palette.grey[50]}`,
        }),
      },
    },
  },
});

export default theme;
