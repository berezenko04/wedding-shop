import "@mui/material/styles";
import { PaletteColor } from "@mui/material/styles";

interface ExtendedPaletteColor extends PaletteColor {
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
}

declare module "@mui/material/styles" {
  interface Palette {
    blue: ExtendedPaletteColor;
    yellow: ExtendedPaletteColor;
  }
  interface PaletteOptions {
    blue?: Partial<ExtendedPaletteColor>;
    yellow?: Partial<ExtendedPaletteColor>;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    iconary: true;
    iconaryOutlined: true;
  }

  interface ButtonPropsColorOverrides {
    grey: true;
    white: true;
  }
}

declare module "@mui/material/Link" {
  interface LinkPropsColorOverrides {
    grey: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    underlined: true;
    plain: true;
    medium: true;
  }
}
