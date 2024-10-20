import { useEffect, useState } from "react";
import { Book, Metrics } from "../../books/types";
import { useMetrics } from "../../books/contexts/ReadingMetricsContext";

interface ReadingMetricsProps {
  book?: Book;
  currentPageNumber: number;
}

const useReadingMetrics = ({
  book,
  currentPageNumber,
}: ReadingMetricsProps) => {
  const { getMetrics, saveMetrics } = useMetrics();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [currentPageTime, setCurrentPageTime] = useState(0);
  const [finishedReading, setFinishedReading] = useState(false);

  // Inicializo metricas existentes
  useEffect(() => {
    if (book) {
      const savedMetrics = getMetrics(book.id);
      if (savedMetrics) {
        setMetrics(savedMetrics);
      } else {
        setMetrics({
          bookId: book.id,
          startTime: Date.now(),
          totalTime: 0,
          pageReadingTimes: {},
          lastPageTimestamp: Date.now(),
        });
      }
    }
  }, [book, getMetrics]);

  // Tiempo de lectura de la pagina actual
  useEffect(() => {
    if (finishedReading) return;

    const intervalId = setInterval(() => {
      setCurrentPageTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentPageNumber, finishedReading]);

  // Actualizo metricas cuando cambia el número de página
  useEffect(() => {
    if (!metrics || currentPageNumber <= 1) return;

    setMetrics((prevMetrics) => {
      if (!prevMetrics) return null;

      const updatedMetrics = {
        ...prevMetrics,
        totalTime: prevMetrics.totalTime + currentPageTime,
        pageReadingTimes: {
          ...prevMetrics.pageReadingTimes,
          [currentPageNumber - 1]:
            (prevMetrics.pageReadingTimes[currentPageNumber - 1] || 0) +
            currentPageTime,
        },
        lastPageTimestamp: Date.now(),
      };

      saveMetrics(updatedMetrics);
      return updatedMetrics;
    });

    setCurrentPageTime(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageNumber, saveMetrics]);

  // Cuando se actualizan las metricas se persisten en el storage
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (metrics) {
        saveMetrics(metrics);
      }
    }, 30000);

    return () => clearInterval(saveInterval);
  }, [metrics, saveMetrics]);

  const handleFinish = () => {
    if (!metrics) return;

    const finalMetrics = {
      ...metrics,
      totalTime: metrics.totalTime + currentPageTime,
      pageReadingTimes: {
        ...metrics.pageReadingTimes,
        [currentPageNumber]:
          (metrics.pageReadingTimes[currentPageNumber] || 0) + currentPageTime,
      },
    };

    setMetrics(finalMetrics);
    saveMetrics(finalMetrics);
    setFinishedReading(true);
  };

  return {
    handleFinish,
    metrics,
    currentPageTime,
  };
};

export { useReadingMetrics };
