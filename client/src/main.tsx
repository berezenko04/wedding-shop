import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";

// theme
import theme from "./theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
      <Toaster position="top-center" toastOptions={{ style: { maxWidth: 600 } }} />
    </ThemeProvider>
  </StrictMode>
);
