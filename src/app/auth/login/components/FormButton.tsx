import React from "react";
import theme from "@/config/themes/theme";
import { Button, CircularProgress } from "@mui/material";

interface FormButtonProps {
  isLoading: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({ isLoading }) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{
        mt: 3,
        mb: 2,
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        borderRadius: "10px",
        fontWeight: "bold",
        fontSize: "1.1rem",
        padding: "12px",
        "&:hover": {
          backgroundColor: theme.palette.accent?.main,
          transform: "scale(1.05)",
        },
        transition: "all 0.3s ease-in-out",
      }}
      disabled={isLoading}
    >
      {isLoading ? <CircularProgress size={24} /> : "¡La Aventura Comienza!"}
    </Button>
  );
};

export { FormButton };
