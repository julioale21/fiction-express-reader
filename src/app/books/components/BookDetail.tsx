"use client";

import React, { useState } from "react";
import { useQueryBookById } from "@/app/books/hooks/tanstack/useQueryBookById";

import {
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookIcon from "@mui/icons-material/MenuBook";

interface BookDetailProps {
  bookId: number;
}

const BookDetail: React.FC<BookDetailProps> = ({ bookId }) => {
  const { data: book, isLoading, error } = useQueryBookById(bookId);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  if (isLoading) {
    return (
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error || !book) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          ¡Ups! No pudimos encontrar el libro. ¿Quizás se escondió en otra
          estantería?
        </Typography>
      </Container>
    );
  }

  const totalPages = book.chapters.reduce(
    (sum, chapter) => sum + chapter.pages.length,
    0
  );
  const currentPageNumber =
    book.chapters
      .slice(0, currentChapter)
      .reduce((sum, chapter) => sum + chapter.pages.length, 0) +
    currentPage +
    1;

  const nextPage = () => {
    if (currentPage < book.chapters[currentChapter].pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else if (currentChapter < book.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setCurrentPage(0);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      setCurrentPage(book.chapters[currentChapter - 1].pages.length - 1);
    }
  };

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
                </Box>
              ) : (
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ fontSize: "1.2rem", lineHeight: 1.6 }}
                >
                  {book.chapters[currentChapter].pages[currentPage]}
                </Typography>
              )}
            </motion.div>
          </AnimatePresence>
        </Box>

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
          <IconButton
            onClick={nextPage}
            disabled={
              currentChapter === book.chapters.length - 1 &&
              currentPage === book.chapters[currentChapter].pages.length - 1
            }
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Paper>
    </Container>
  );
};

export { BookDetail };
