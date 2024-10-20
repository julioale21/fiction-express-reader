import React from "react";

import theme from "@/config/themes/theme";
import {
  formatDuration,
  calculateAverageTimePerPage,
  formatDate,
} from "@/utils/metrics";
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  Grid,
  Paper,
  Box,
  DialogActions,
  Button,
} from "@mui/material";

import BookIcon from "@mui/icons-material/Book";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimerIcon from "@mui/icons-material/Timer";
import UpdateIcon from "@mui/icons-material/Update";
import AvgTimeIcon from "@mui/icons-material/Autorenew";

import { IconStyle } from "./MetricsTable";
import { Metrics } from "@/app/books/types";

interface DetailsDialogProps {
  selectedMetric?: Metrics;
  handleCloseDialog: () => void;
  iconStyle?: IconStyle;
}

const DetailsDialog: React.FC<DetailsDialogProps> = ({
  selectedMetric,
  handleCloseDialog,
  iconStyle = {},
}) => {
  return (
    <Dialog
      open={!!selectedMetric}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth
    >
      {selectedMetric && (
        <>
          <DialogTitle>
            <Typography
              variant="h5"
              align="center"
              sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
            >
              <BookIcon
                sx={{ fontSize: 30, verticalAlign: "middle", marginRight: 1 }}
              />
              Detalles del Libro {selectedMetric.bookId}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
                  <Typography variant="h6" gutterBottom>
                    Estadísticas Generales
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <TimerIcon
                      sx={{ ...iconStyle, color: theme.palette.primary.main }}
                    />
                    <Typography component="span">Tiempo total: </Typography>
                    <Typography component="span" fontWeight="bold">
                      {formatDuration(selectedMetric.totalTime)}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <AvgTimeIcon
                      sx={{
                        ...iconStyle,
                        color: theme.palette.secondary.main,
                      }}
                    />
                    <Typography component="span">
                      Tiempo promedio por página:{" "}
                    </Typography>
                    <Typography component="span" fontWeight="bold">
                      {formatDuration(
                        calculateAverageTimePerPage(selectedMetric)
                      )}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <AccessTimeIcon
                      sx={{ ...iconStyle, color: theme.palette.success.main }}
                    />
                    <Typography component="span">Inicio: </Typography>
                    <Typography component="span" fontWeight="bold">
                      {formatDate(selectedMetric.startTime || 0)}
                    </Typography>
                  </Box>
                  <Box>
                    <UpdateIcon
                      sx={{ ...iconStyle, color: theme.palette.error.main }}
                    />
                    <Typography component="span">Última lectura: </Typography>
                    <Typography component="span" fontWeight="bold">
                      {formatDate(selectedMetric.lastPageTimestamp || 0)}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    height: "100%",
                    maxHeight: 300,
                    overflow: "auto",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Tiempo por Página
                  </Typography>
                  {Object.entries(selectedMetric.pageReadingTimes).map(
                    ([pageNumber, time]) => (
                      <Box
                        key={pageNumber}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography>Página {pageNumber}:</Typography>
                        <Typography fontWeight="bold">
                          {formatDuration(time)}
                        </Typography>
                      </Box>
                    )
                  )}
                </Paper>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export { DetailsDialog };
