"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useBookNavigation } from "../hooks/useBookNavigation";

import { BookError } from "./BookError";
import { CustomLoading } from "@/common/components";
import { FinishBookCelebration } from "./FinishBookCelebration";
import { DialogMetrics } from "./DialogMetrics";
import { useReadingMetrics } from "../hooks/useReadingMetrics";

// export interface Metrics {
//   bookId: number | null;
//   startTime: number | null;
//   totalTime: number;
//   pageReadingTimes: { [pageChapterKey: string]: number };
//   lastPageTimestamp: number | null;
// }

interface BookDetailProps {
  bookId: number;
}

const BookDetail: React.FC<BookDetailProps> = ({ bookId }) => {
  const {
    book,
    isLoading,
    error,
    currentChapter,
    currentPage,
    totalPages,
    currentPageNumber,
    isLastPage,
    nextPage,
    prevPage,
  } = useBookNavigation(bookId);

  const { metrics, handleFinish, currentPageTime } = useReadingMetrics({
    book,
    currentPageNumber,
  });

  const onFinishReading = () => {
    handleFinish();
    setShowCelebration(true);

    setTimeout(() => {
      setShowMetrics(true);
    }, 3000);
  };

  const [showCelebration, setShowCelebration] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);

  if (isLoading) return <CustomLoading text="Cargando tu libro ..." />;

  if (error || !book) return <BookError />;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: "15px",
          background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "#1a237e", textAlign: "center", fontWeight: "bold" }}
        >
          {book.title}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "#1565c0", textAlign: "center" }}
        >
          por {book.author}
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            my: 4,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentChapter}-${currentPage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{ width: "100%", textAlign: "center" }}
            >
              {currentPage === 0 ? (
                <Box>
                  <MenuBookIcon
                    sx={{ fontSize: 60, color: "#1565c0", mb: 2 }}
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#1565c0" }}
                  >
                    {book.chapters[currentChapter].title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}
                  >
                    {book.chapters[currentChapter].pages[currentPage]}
                  </Typography>

                </Box>
              ) : (
                <Typography
                  variant="body1"
                  sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}
                >
                  {book.chapters[currentChapter].pages[currentPage]}
                </Typography>
              )}
            </motion.div>
          </AnimatePresence>
        </Box>

        {showCelebration && <FinishBookCelebration />}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 4,
          }}
        >
          <IconButton
            onClick={prevPage}
            disabled={currentChapter === 0 && currentPage === 0}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="body2">
            Página {currentPageNumber} de {totalPages}
          </Typography>
          {isLastPage ? (
            <Button
              variant="contained"
              color="primary"
              onClick={onFinishReading}
            >
              Finalizar
            </Button>
          ) : (
            <IconButton onClick={nextPage}>
              <ArrowForwardIcon />
            </IconButton>
          )}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Tiempo en esta página: {currentPageTime}
          </Typography>
        </Box>
      </Paper>

      <DialogMetrics showMetrics={showMetrics} finalMetrics={metrics} />
    </Container>
  );
};

export { BookDetail };
