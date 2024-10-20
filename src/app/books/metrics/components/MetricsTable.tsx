import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { formatDuration } from "@/utils/metrics";
import { useMetrics } from "../../contexts/ReadingMetricsContext";
import { Metrics } from "../../types";
import BookIcon from "@mui/icons-material/Book";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimerIcon from "@mui/icons-material/Timer";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LastPageIcon from "@mui/icons-material/LastPage";
import UpdateIcon from "@mui/icons-material/Update";
import AvgTimeIcon from "@mui/icons-material/Autorenew";
import { DetailsDialog } from "./DetailsDialog";

const MetricsTable = () => {
  const { getAllMetrics } = useMetrics();
  const metrics = getAllMetrics();
  const theme = useTheme();
  const [selectedMetric, setSelectedMetric] = useState<Metrics | null>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const headerStyle = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
  };

  const iconStyle = {
    verticalAlign: "middle",
    marginRight: theme.spacing(1),
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleRowClick = (metric: Metrics) => {
    setSelectedMetric(metric);
  };

  const handleCloseDialog = () => {
    setSelectedMetric(null);
  };

  return (
    <Box sx={{ margin: "20px", maxWidth: 1200, mx: "auto" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", mb: 3 }}
      >
        <BookIcon sx={{ fontSize: 40, mr: 2 }} />
        Metricas de lectura
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table
          sx={{ minWidth: isMobile ? 300 : 650 }}
          aria-label="metrics table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={headerStyle}>
                <BookIcon sx={iconStyle} />
                Book ID
              </TableCell>
              {!isMobile && (
                <>
                  <TableCell sx={headerStyle}>
                    <AccessTimeIcon sx={iconStyle} />
                    Inicio
                  </TableCell>
                  <TableCell sx={headerStyle}>
                    <TimerIcon sx={iconStyle} />
                    Tiempo total
                  </TableCell>
                </>
              )}
              <TableCell sx={headerStyle}>
                <MenuBookIcon sx={iconStyle} />
                Paginas leidas
              </TableCell>
              {!isMobile && (
                <>
                  <TableCell sx={headerStyle}>
                    <LastPageIcon sx={iconStyle} />
                    Última pagina
                  </TableCell>
                  <TableCell sx={headerStyle}>
                    <UpdateIcon sx={iconStyle} />
                    Última lectura
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {metrics.map((metric: Metrics) => (
              <TableRow
                key={metric.bookId}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: theme.palette.action.hover,
                  },
                  cursor: "pointer",
                }}
                onClick={() => handleRowClick(metric)}
              >
                <TableCell>{metric.bookId}</TableCell>
                {!isMobile && (
                  <>
                    <TableCell>{formatTime(metric.startTime || 0)}</TableCell>
                    <TableCell>{formatDuration(metric.totalTime)}</TableCell>
                  </>
                )}
                <TableCell>
                  {Object.keys(metric.pageReadingTimes).length}
                </TableCell>
                {!isMobile && (
                  <>
                    <TableCell>
                      {Math.max(
                        ...Object.keys(metric.pageReadingTimes).map(Number)
                      )}
                    </TableCell>
                    <TableCell>
                      {formatTime(metric.lastPageTimestamp || 0)}
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DetailsDialog
        selectedMetric={selectedMetric || undefined}
        handleCloseDialog={handleCloseDialog}
        iconStyle={iconStyle}
      />
    </Box>
  );
};

export { MetricsTable };
