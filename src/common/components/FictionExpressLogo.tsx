import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import theme from "@/config/themes/theme";

interface FictionExpressLogoProps {
  iconWidth?: number;
  iconHeight?: number;
  showIcon?: boolean;
  title?: string;
}

const FictionExpressLogo: React.FC<FictionExpressLogoProps> = ({
  iconWidth = 50,
  iconHeight = 50,
  showIcon = true,
  title = "Fiction Express Reader",
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }} gap={2}>
      {showIcon && (
        <Image
          src="/fiction-express-logo.svg"
          width={iconWidth}
          height={iconHeight}
          alt="Fiction Express Logo"
        />
      )}
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.text.primary,
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default FictionExpressLogo;
