import React from "react";
import { Typography } from "@mui/material";
import theme from "@/config/themes/theme";

type TitleVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2";

interface TitleProps {
  text: string;
  variant?: TitleVariant;
  align?: "inherit" | "left" | "center" | "right" | "justify";
  color?: string;
  size?: number | string;
}

const CustomTitle: React.FC<TitleProps> = ({
  text,
  variant = "h4",
  color,
  align = "center",
  size,
  ...props
}) => {
  return (
    <Typography
      variant={variant}
      component="h1"
      align={align}
      sx={{
        color: color || theme?.palette.primary.main,
        marginBottom: 3,
        fontWeight: "bold",
        fontSize: size,
        ...props,
      }}
    >
      {text}
    </Typography>
  );
};

export { CustomTitle };
