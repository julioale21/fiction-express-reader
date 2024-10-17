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

interface MenuDrawerProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({
  mobileOpen,
  onDrawerToggle,
}) => {
  const theme = useTheme();

  const drawer = (
    <Box
      onClick={onDrawerToggle}
      sx={{
        textAlign: "center",
        bgcolor: theme.palette.background.body,
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          my: 2,
          color: theme.palette.text.primary,
        }}
      >
        Fiction Express
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon
                sx={{
                  color: theme.palette.accent,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: theme.palette.text.primary,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
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
            bgcolor: theme.palette.background.body,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export { MenuDrawer };
