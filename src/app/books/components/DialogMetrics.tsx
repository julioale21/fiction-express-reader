import React from "react";
import { formatTimeFunction } from "@/utils/time";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import Link from "next/link";
import { Metrics } from "./BookDetail";

const formatTime = (timeInSeconds: number): string => {
  if (timeInSeconds >= 3600) {
    // Si el tiempo es mayor o igual a 3600 segundos (1 hora), mostrar en horas
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    return `${hours}h ${minutes}min`;
  } else if (timeInSeconds >= 60) {
    // Si el tiempo es mayor o igual a 60 segundos, mostrar en minutos
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}min ${seconds}s`;
  } else {
    // Si el tiempo es menor a 60 segundos, mostrar en segundos
    return `${timeInSeconds}s`;
  }
};

interface DialogMetricsProps {
  showMetrics: boolean;
  finalMetrics: Metrics | null;
}

const DialogMetrics: React.FC<DialogMetricsProps> = ({
  showMetrics,
  finalMetrics,
}) => {
  const totalReadingTime = finalMetrics?.pageReadingTimes
    ? Object.values(finalMetrics.pageReadingTimes).reduce(
        (acc: number, time: number) => acc + time,
        0
      )
    : 0;

  const averageTimePerPage = finalMetrics?.pageReadingTimes
    ? Object.values(finalMetrics.pageReadingTimes).reduce(
        (acc: number, time: number) => acc + time,
        0
      ) / Object.keys(finalMetrics.pageReadingTimes).length
    : 0;

  return (
    <Dialog open={showMetrics} onClose={() => {}}>
      <DialogTitle>Métricas de Lectura</DialogTitle>
      <DialogContent>
        {finalMetrics && (
          <>
            {/* Mostrar tiempo total de lectura */}
            <Typography>
              Tiempo total de lectura: {formatTime(totalReadingTime)}
            </Typography>

            {/* Mostrar tiempo promedio por página */}
            <Typography>
              Tiempo promedio por página: {formatTime(averageTimePerPage)}
            </Typography>

            {/* Convertir y mostrar startTime y lastPageTimestamp */}
            <Typography>
              Hora de inicio:{" "}
              {finalMetrics.startTime
                ? new Date(finalMetrics.startTime).toLocaleString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "No disponible"}
            </Typography>
            <Typography>
              Última página leída:{" "}
              {finalMetrics.lastPageTimestamp
                ? new Date(finalMetrics.lastPageTimestamp).toLocaleString(
                    "es-ES",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }
                  )
                : "No disponible"}
            </Typography>

            {/* Mostrar tiempos por página */}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Tiempo por página:
            </Typography>
            {Object.entries(finalMetrics.pageReadingTimes).map(
              ([pageNumber, time]) => {
                return (
                  <Typography key={pageNumber}>
                    Página {parseInt(pageNumber)}: {formatTime(time)}{" "}
                  </Typography>
                );
              }
            )}
          </>
        )}
      </DialogContent>

      {/* Acciones del diálogo */}
      <DialogActions>
        <Link href="/books">
          <Button>Cerrar</Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export { DialogMetrics };
