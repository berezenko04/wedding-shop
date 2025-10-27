import "@mui/material/styles";
import { PaletteColor, PaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    blue: PaletteColor;
  }
  interface PaletteOptions {
    blue?: PaletteColorOptions;
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
