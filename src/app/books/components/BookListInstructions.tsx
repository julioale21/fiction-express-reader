import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { GradientButton } from "@/common/components";

interface BookListInstructionsProps {
  title: string;
  steps: string[];
  setShowInstructions: (value: boolean) => void;
  actionText?: string;
}

const BookListInstructions: React.FC<BookListInstructionsProps> = ({
  title,
  steps,
  setShowInstructions,
  actionText,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          backgroundColor: "#e3f2fd",
          borderRadius: "15px",
          padding: 3,
          marginBottom: 4,
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: "#1565c0" }}>
          {title}
        </Typography>

        {steps.map((step) => (
          <Typography key={step} variant="body1" paragraph>
            {step}
          </Typography>
        ))}

        <GradientButton
          text={actionText ?? "¡Estoy Listo para Elegir!"}
          onClick={() => setShowInstructions(false)}
          startIcon={<ArrowForwardIcon />}
        />
      </Box>
    </motion.div>
  );
};

export { BookListInstructions };
