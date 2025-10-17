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
