"use client";
import React from "react";
import { AppBar, Toolbar, Box, Button, IconButton } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { menuItems } from "../constants/menu-items.constants";
import theme from "@/config/themes/theme";
import FictionExpressLogo from "./FictionExpressLogo";
import { signOut } from "next-auth/react";

interface HeaderProps {
  isMobile: boolean;
  onDrawerToggle: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ isMobile, onDrawerToggle }) => {
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

            <Button
              onClick={() => signOut()}
              sx={{ color: theme.palette.text.primary }}
            >
              Cerrar sesión
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export { Header };
