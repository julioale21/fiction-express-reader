"use client";
import React, { useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";

import { Footer, Header, MenuDrawer } from "@/common/components";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <Header
        isMobile={isMobile}
        onDrawerToggle={handleDrawerToggle}
        title="Fiction Express"
      />
      <MenuDrawer mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ flexGrow: 1, width: "100%" }}>
        {children}
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
