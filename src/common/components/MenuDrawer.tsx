
"use client";
import React from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { menuItems } from "../constants/menu-items.constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";

interface MenuDrawerProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({
  mobileOpen,
  onDrawerToggle,
}) => {
  const theme = useTheme();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/login");
    onDrawerToggle();
  };

  const listItemStyle = {
    color: theme.palette.text.primary,
    "&:hover": {
      bgcolor: "rgba(38, 77, 92, 0.1)",
    },
    borderRadius: 1,
    my: 0.5,
  };

  const drawer = (
    <Box
      sx={{
        bgcolor: theme.palette.background.header,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          my: 2,
          color: theme.palette.text.primary,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Fiction Express
      </Typography>
      <List sx={{ flexGrow: 1, px: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Link
              href={item.href}
              passHref
              style={{ textDecoration: "none", width: "100%" }}
            >
              <ListItemButton onClick={onDrawerToggle} sx={listItemStyle}>
                <ListItemIcon
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <List sx={{ px: 2 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleSignOut} sx={listItemStyle}>
            <ListItemIcon
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Cerrar sesión"
              primaryTypographyProps={{
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            bgcolor: theme.palette.background.header,
            borderRight: `4px solid ${theme.palette.text.primary}`,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export { MenuDrawer };
