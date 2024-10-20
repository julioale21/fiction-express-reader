import React, { createContext, useContext, useCallback } from "react";
import { Metrics } from "../types";

interface MetricsContextType {
  getMetrics: (bookId: number) => Metrics | null;
  saveMetrics: (metrics: Metrics) => void;
  clearMetrics: (bookId: number) => void;
}

const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

export const useMetrics = () => {
  const context = useContext(MetricsContext);
  if (!context) {
    throw new Error("useMetrics must be used within a MetricsProvider");
  }
  return context;
};

export const MetricsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const getMetrics = useCallback((bookId: number): Metrics | null => {
    const metricsString = localStorage.getItem(`book_metrics_${bookId}`);
    return metricsString ? JSON.parse(metricsString) : null;
  }, []);

  const saveMetrics = useCallback((metrics: Metrics) => {
    localStorage.setItem(
      `book_metrics_${metrics.bookId}`,
      JSON.stringify(metrics)
    );
  }, []);

  const clearMetrics = useCallback((bookId: number) => {
    localStorage.removeItem(`book_metrics_${bookId}`);
  }, []);

  return (
    <MetricsContext.Provider
      value={{
        getMetrics,
        saveMetrics,
        clearMetrics,
      }}
    >
      {children}
    </MetricsContext.Provider>
  );
};
