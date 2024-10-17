import React from "react";
import { Typography, Container } from "@mui/material";

const BookError = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h6" color="error">
        ¡Ups! No pudimos encontrar el libro. ¿Quizás se escondió en otra
        estantería?
      </Typography>
    </Container>
  );
};

export { BookError };
