"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import theme from "@/config/themes/theme";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.background.header,
        color: theme.palette.text.primary,
        py: 2,
        textAlign: "center",
        borderTop: `4px solid ${theme.palette.text.primary}`,
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        © 2024 Fiction Express. ¡Deja volar tu imaginación!
      </Typography>
      <Typography variant="body2">
        Solved by <span style={{ fontWeight: "bold" }}>Julio Romero</span>
      </Typography>
    </Box>
  );
};

export { Footer };
