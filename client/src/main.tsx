import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";

// styles
import "swiper/css";
import "swiper/css/navigation";
import "./global.css";

// theme
import theme from "./theme.ts";

// store
import { store } from "./redux/store.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
        <Toaster position="top-center" toastOptions={{ style: { maxWidth: 600 } }} />
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);
