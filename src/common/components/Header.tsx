"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import { menuItems } from "../constants/menu-items.constants";
import theme from "@/config/themes/theme";
import FictionExpressLogo from "./FictionExpressLogo";

interface HeaderProps {
  isMobile: boolean;
  onDrawerToggle: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ isMobile, onDrawerToggle, title }) => {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: theme.palette.background.header,
        boxShadow: "none",
        borderBottom: `4px solid ${theme.palette.text.primary}`,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: "64px" }}>
        <FictionExpressLogo
          iconHeight={isMobile ? 50 : 70}
          iconWidth={isMobile ? 50 : 70}
        />

        {isMobile ? (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={onDrawerToggle}
            sx={{ color: theme.palette.text.primary }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                startIcon={item.icon}
                sx={{
                  color: theme.palette.text.primary,
                  mx: 1,
                  "&:hover": {
                    bgcolor: "rgba(38, 77, 92, 0.1)",
                  },
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export { Header };
