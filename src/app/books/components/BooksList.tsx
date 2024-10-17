"use client";
import React from "react";
import { useBooks } from "@/app/books/hooks/tanstack/useQueryGetBooks";
import { motion } from "framer-motion";
import { Typography, Box, Grid, useTheme } from "@mui/material";
import { BookCard, BookListError, Instructions } from ".";
import { useInstructions } from "../hooks/useInstructions";
import { CustomLoading } from "@/common/components";

interface BookListProps {
  listTitle: string;
}

const BooksList: React.FC<BookListProps> = ({ listTitle }) => {
  const { data, isLoading, error } = useBooks();
  const { showInstructions, toggleInstructions } = useInstructions();
  const theme = useTheme();

  if (isLoading)
    return <CustomLoading text="Cargando tu biblioteca mágica ..." />;
  if (error) return <BookListError />;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: theme.palette.background.body,
        padding: { xs: 2, sm: 4 },
        overflow: "auto",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          textAlign: "center",
          color: theme.palette.text.primary,
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          mb: 4,
          pt: 2,
        }}
      >
        {listTitle}
      </Typography>

      {showInstructions && (
        <Instructions show={showInstructions} setShow={toggleInstructions} />
      )}

      <Grid container spacing={3} justifyContent="center">
        {data?.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <BookCard book={book} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export { BooksList };
