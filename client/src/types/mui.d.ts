import "@mui/material/styles";
import { PaletteColorOptions } from "@mui/material";

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
    grey: true;
  }

  interface ButtonPropsColorOverrides {
    grey: true;
  }
}
