import React from "react";
import { Button } from "@mui/material";

interface GradientButtonProps {
  text: string;
  startIcon?: React.ReactNode;
  onClick?: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  text,
  startIcon,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={startIcon}
      sx={{
        mt: 2,
        borderRadius: "20px",
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export { GradientButton };
