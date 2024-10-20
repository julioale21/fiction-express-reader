import React from "react";
import { Box, Typography, Container } from "@mui/material";
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
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingBottom: 4,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%" }}
      >
        <Box
          sx={{
            backgroundColor: "#e3f2fd",
            borderRadius: "15px",
            padding: 3,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: { xs: "90%", sm: "80%", md: "50%" },
            mx: "auto",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: "#1565c0" }}>
            {title}
          </Typography>

          {steps.map((step, index) => (
            <Typography key={index} variant="body1" paragraph>
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
    </Container>
  );
};

export { BookListInstructions };
