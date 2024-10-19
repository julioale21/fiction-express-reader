"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReadingMetricsProvider } from "@/app/books/contexts/ReadingMetricsContext";
import { useState } from "react";
import SessionAuthProvider from "../context/SessionAuthProvider";

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: "var(--font-geist-sans), Roboto, Arial, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "var(--font-geist-sans), Roboto, Arial, sans-serif",
        },
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
          },
        },
      })
  );

  return (
    <SessionAuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ReadingMetricsProvider>
            <CssBaseline />
            {children}
          </ReadingMetricsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionAuthProvider>
  );
}
