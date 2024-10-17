import React from "react";
import theme from "@/config/themes/theme";
import { Box, Typography } from "@mui/material";
import ChildIcon from "@mui/icons-material/ChildCare";

const BookListError = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: theme.palette.background.body,
      }}
    >
      <ChildIcon
        sx={{ fontSize: 80, color: theme.palette.accent?.light || "#FFAFAF" }}
      />
      <Typography
        variant="h4"
        sx={{ mt: 2, color: theme.palette.text.primary }}
      >
        ¡Ups! Los libros se están escondiendo. ¡Intentémoslo de nuevo!
      </Typography>
    </Box>
  );
};

export { BookListError };
