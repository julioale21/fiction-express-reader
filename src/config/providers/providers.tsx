"use client";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReadingMetricsProvider } from "@/app/books/contexts/ReadingMetricsContext";
import SessionAuthProvider from "../context/SessionAuthProvider";
import theme from "../themes/theme";
import getQueryClient from "../client/getQueryClient";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <SessionAuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
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
