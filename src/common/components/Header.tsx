
"use client";
import React from "react";
import { AppBar, Toolbar, Box, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { menuItems } from "../constants/menu-items.constants";
import theme from "@/config/themes/theme";
import FictionExpressLogo from "./FictionExpressLogo";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface HeaderProps {
  isMobile: boolean;
  onDrawerToggle: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ isMobile, onDrawerToggle }) => {

  const handleSignOut = () => {
    signOut();
  };

  const buttonStyle = {
    color: theme.palette.text.primary,
    mx: 1,
    "&:hover": {
      bgcolor: "rgba(38, 77, 92, 0.1)",
    },
    textTransform: "uppercase",
    fontWeight: "bold",
  };

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
              <Link
                href={item.href}
                key={item.text}
                passHref
                style={{ textDecoration: "none" }}
              >
                <Button startIcon={item.icon} sx={buttonStyle}>
                  {item.text}
                </Button>
              </Link>
            ))}

            <Button
              onClick={handleSignOut}
              startIcon={<LogoutIcon />}
              sx={buttonStyle}
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
