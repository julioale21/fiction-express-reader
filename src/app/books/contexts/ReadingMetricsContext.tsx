// src/app/books/contexts/ReadingMetricsContext.tsx

import React, { createContext, useContext, useState, useCallback } from "react";

interface ReadingMetrics {
  bookId: number | null;
  startTime: number | null;
  totalTime: number;
  pageReadingTimes: { [pageId: number]: number };
  lastPageTimestamp: number | null;
}

interface ReadingMetricsContextType {
  metrics: ReadingMetrics;
  startReading: (bookId: number) => void;
  updatePageTime: (pageId: number) => void;
  finishReading: () => {
    totalTime: number;
    averageTimePerPage: number;
    pageReadingTimes: { [pageId: number]: number };
  };
  getPageReadingTime: (pageId: number) => number;
}

const ReadingMetricsContext = createContext<
  ReadingMetricsContextType | undefined
>(undefined);

export const useReadingMetrics = () => {
  const context = useContext(ReadingMetricsContext);
  if (!context) {
    throw new Error(
      "useReadingMetrics must be used within a ReadingMetricsProvider"
    );
  }
  return context;
};

export const ReadingMetricsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [metrics, setMetrics] = useState<ReadingMetrics>({
    bookId: null,
    startTime: null,
    totalTime: 0,
    pageReadingTimes: {},
    lastPageTimestamp: null,
  });

  const startReading = useCallback((bookId: number) => {
    setMetrics({
      bookId,
      startTime: Date.now(),
      totalTime: 0,
      pageReadingTimes: {},
      lastPageTimestamp: Date.now(),
    });
  }, []);

  const updatePageTime = useCallback((pageId: number) => {
    setMetrics((prevMetrics) => {
      const now = Date.now();
      const pageTime = prevMetrics.lastPageTimestamp
        ? now - prevMetrics.lastPageTimestamp
        : 0;

      return {
        ...prevMetrics,
        totalTime: prevMetrics.totalTime + pageTime,
        pageReadingTimes: {
          ...prevMetrics.pageReadingTimes,
          [pageId]: (prevMetrics.pageReadingTimes[pageId] || 0) + pageTime,
        },
        lastPageTimestamp: now,
      };
    });
  }, []);

  const finishReading = useCallback(() => {
    const totalPages = Object.keys(metrics.pageReadingTimes).length;
    const averageTimePerPage =
      totalPages > 0 ? metrics.totalTime / totalPages : 0;

    return {
      totalTime: metrics.totalTime,
      averageTimePerPage,
      pageReadingTimes: metrics.pageReadingTimes,
    };
  }, [metrics]);

  const getPageReadingTime = useCallback(
    (pageId: number) => {
      return metrics.pageReadingTimes[pageId] || 0;
    },
    [metrics.pageReadingTimes]
  );

  return (
    <ReadingMetricsContext.Provider
      value={{
        metrics,
        startReading,
        updatePageTime,
        finishReading,
        getPageReadingTime,
      }}
    >
      {children}
    </ReadingMetricsContext.Provider>
  );
};
