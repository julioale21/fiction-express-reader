"use client";
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
import router from "next/router";

interface DialogMetricsProps {
  showMetrics: boolean;
  finalMetrics: {
    totalTime: number;
    averageTimePerPage: number;
    pageReadingTimes: { [pageId: number]: number };
  } | null;
}

const DialogMetrics: React.FC<DialogMetricsProps> = ({
  showMetrics,
  finalMetrics,
}) => {
  return (
    <Dialog open={showMetrics} onClose={() => router.push("/books")}>
      <DialogTitle>Métricas de Lectura</DialogTitle>
      <DialogContent>
        {finalMetrics && (
          <>
            <Typography>
              Tiempo total de lectura:{" "}
              {formatTimeFunction(finalMetrics.totalTime)}
            </Typography>
            <Typography>
              Tiempo promedio por página:{" "}
              {formatTimeFunction(finalMetrics.averageTimePerPage)}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Tiempo por página:
            </Typography>
            {Object.entries(finalMetrics.pageReadingTimes).map(
              ([pageId, time]) => (
                <Typography key={pageId}>
                  Página {(parseInt(pageId) % 100) + 1} del capítulo{" "}
                  {Math.floor(parseInt(pageId) / 100) + 1}:{" "}
                  {formatTimeFunction(time)}
                </Typography>
              )
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => router.push("/books")}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export { DialogMetrics };
