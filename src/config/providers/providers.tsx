"use client";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import SessionAuthProvider from "../context/SessionAuthProvider";
import theme from "../themes/theme";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "../client/getQueryClient";
import { MetricsProvider } from "@/app/books/contexts/ReadingMetricsContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <SessionAuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider theme={theme}>
          <MetricsProvider>
            <CssBaseline />
            {children}
          </MetricsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionAuthProvider>
  );
}
