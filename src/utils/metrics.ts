import { Metrics } from "@/app/books/types";

export const calculateTotalReadingTime = (metrics: Metrics): number => {
  return Object.values(metrics.pageReadingTimes).reduce(
    (acc, time) => acc + time,
    0
  );
};

export const calculateAverageTimePerPage = (metrics: Metrics): number => {
  const totalTime = calculateTotalReadingTime(metrics);
  const pageCount = Object.keys(metrics.pageReadingTimes).length;
  const result = pageCount > 0 ? totalTime / pageCount : 0;
  return Number(result.toFixed(2));
};

export const formatTime = (timeInSeconds: number): string => {
  if (timeInSeconds >= 3600) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    return `${hours}h ${minutes}min`;
  } else if (timeInSeconds >= 60) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}min ${seconds}s`;
  } else {
    return `${timeInSeconds}s`;
  }
};

export const formatDate = (timestamp: number | null): string => {
  if (!timestamp) return "No disponible";
  return new Date(timestamp).toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};
