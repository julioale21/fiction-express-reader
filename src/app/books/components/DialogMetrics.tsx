import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  Box,
  Grid,
  Paper,
  Divider,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { Metrics } from "../types";

import TimerIcon from "@mui/icons-material/Timer";
import AvgTimeIcon from "@mui/icons-material/Autorenew";
import StartTimeIcon from "@mui/icons-material/PlayArrow";
import EndTimeIcon from "@mui/icons-material/Stop";
import BookIcon from "@mui/icons-material/MenuBook";
import {
  calculateTotalReadingTime,
  calculateAverageTimePerPage,
  formatTime,
  formatDate,
} from "@/utils/metrics";

interface DialogMetricsProps {
  showMetrics: boolean;
  finalMetrics: Metrics | null;
}

const DialogMetrics: React.FC<DialogMetricsProps> = ({
  showMetrics,
  finalMetrics,
}) => {
  const theme = useTheme();

  if (!finalMetrics) return null;

  const totalReadingTime = calculateTotalReadingTime(finalMetrics);
  const averageTimePerPage = calculateAverageTimePerPage(finalMetrics);

  return (
    <Dialog
      open={showMetrics}
      onClose={() => {}}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: theme.palette.background.default,
          borderRadius: 16,
        },
      }}
    >
      <DialogTitle>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
        >
          <BookIcon
            sx={{ fontSize: 40, verticalAlign: "middle", marginRight: 1 }}
          />
          Resumen de Lectura
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: theme.palette.secondary.main, fontWeight: "bold" }}
              >
                Estadísticas Generales
              </Typography>
              <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
                <TimerIcon
                  sx={{
                    fontSize: 30,
                    marginRight: 2,
                    color: theme.palette.primary.main,
                  }}
                />
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Tiempo total de lectura:
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                    }}
                  >
                    {formatTime(totalReadingTime)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
                <AvgTimeIcon
                  sx={{
                    fontSize: 30,
                    marginRight: 2,
                    color: theme.palette.secondary.main,
                  }}
                />
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Tiempo promedio por página:
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: theme.palette.secondary.main,
                      fontWeight: "bold",
                    }}
                  >
                    {formatTime(Number(averageTimePerPage.toFixed(2)))}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                <StartTimeIcon
                  sx={{
                    fontSize: 24,
                    marginRight: 2,
                    color: theme.palette.success.main,
                  }}
                />
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Hora de inicio:
                  </Typography>
                  <Typography sx={{ color: theme.palette.text.primary }}>
                    {formatDate(finalMetrics.startTime)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EndTimeIcon
                  sx={{
                    fontSize: 24,
                    marginRight: 2,
                    color: theme.palette.error.main,
                  }}
                />
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    Última página leída:
                  </Typography>
                  <Typography sx={{ color: theme.palette.text.primary }}>
                    {formatDate(finalMetrics.lastPageTimestamp)}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: "100%",
                maxHeight: 400,
                overflow: "auto",
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: theme.palette.secondary.main, fontWeight: "bold" }}
              >
                Tiempo por Página
              </Typography>
              {Object.entries(finalMetrics.pageReadingTimes).map(
                ([pageNumber, time]) => (
                  <Box
                    key={pageNumber}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                      p: 1,
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <Typography sx={{ color: theme.palette.text.primary }}>
                      Página {parseInt(pageNumber)}:
                    </Typography>
                    <Typography
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: "bold",
                      }}
                    >
                      {formatTime(time)}
                    </Typography>
                  </Box>
                )
              )}
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", p: 3 }}>
        <Link href="/books" passHref>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<BookIcon />}
            sx={{
              borderRadius: 20,
              padding: "10px 30px",
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: theme.shadows[3],
            }}
          >
            Volver a la Biblioteca
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export { DialogMetrics };
