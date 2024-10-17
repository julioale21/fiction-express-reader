import { useState, useCallback } from "react";
import { useReadingMetrics } from "../contexts/ReadingMetricsContext";

interface ReadingMetricsHook {
  startReading: (bookId: number) => void;
  updatePageTime: (pageId: number) => void;
  finishReading: () => {
    totalTime: number;
    averageTimePerPage: number;
    pageReadingTimes: { [pageId: number]: number };
  };
  getPageReadingTime: (pageId: number) => number;
  showMetrics: boolean;
  setShowMetrics: (show: boolean) => void;
  finalMetrics: {
    totalTime: number;
    averageTimePerPage: number;
    pageReadingTimes: { [pageId: number]: number };
  } | null;
  setFinalMetrics: (
    metrics: {
      totalTime: number;
      averageTimePerPage: number;
      pageReadingTimes: { [pageId: number]: number };
    } | null
  ) => void;
}

const useReadingMetricsHook = (): ReadingMetricsHook => {
  const { startReading, updatePageTime, finishReading, getPageReadingTime } =
    useReadingMetrics();
  const [showMetrics, setShowMetrics] = useState(false);
  const [finalMetrics, setFinalMetrics] = useState<{
    totalTime: number;
    averageTimePerPage: number;
    pageReadingTimes: { [pageId: number]: number };
  } | null>(null);

  const handleFinishReading = useCallback(() => {
    const metrics = finishReading();
    setFinalMetrics(metrics);
    setShowMetrics(true);
    return metrics; // Devolver las métricas
  }, [finishReading]);

  return {
    startReading,
    updatePageTime,
    finishReading: handleFinishReading,
    getPageReadingTime,
    showMetrics,
    setShowMetrics,
    finalMetrics,
    setFinalMetrics,
  };
};

export { useReadingMetricsHook };
