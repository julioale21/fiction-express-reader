import React, { createContext, useContext, useCallback } from "react";
import { Metrics } from "../types";

interface MetricsContextType {
  getMetrics: (bookId: number) => Metrics | null;
  saveMetrics: (metrics: Metrics) => void;
  clearMetrics: (bookId: number) => void;
  getAllMetrics: () => Metrics[];
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

  const getAllMetrics = useCallback((): Metrics[] => {
    const allMetrics: Metrics[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("book_metrics_")) {
        const metricsString = localStorage.getItem(key);
        if (metricsString) {
          try {
            const metrics = JSON.parse(metricsString);
            allMetrics.push(metrics);
          } catch (error) {
            console.error(`Error parsing metrics for key ${key}:`, error);
          }
        }
      }
    }
    return allMetrics;
  }, []);

  return (
    <MetricsContext.Provider
      value={{
        getMetrics,
        saveMetrics,
        clearMetrics,
        getAllMetrics,
      }}
    >
      {children}
    </MetricsContext.Provider>
  );
};
