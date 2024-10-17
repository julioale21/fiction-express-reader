import React from "react";
import theme from "@/config/themes/theme";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";

const LoadingBooks = () => {
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
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <StarIcon sx={{ fontSize: 80, color: theme.palette.accent.main }} />
      </motion.div>
      <Typography
        variant="h4"
        sx={{ mt: 2, color: theme.palette.text.primary }}
      >
        Cargando tu biblioteca mágica...
      </Typography>
    </Box>
  );
};

export { LoadingBooks };
