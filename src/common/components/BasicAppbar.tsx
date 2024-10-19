"use client";

import React from "react";
import theme from "@/config/themes/theme";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const BasicAppbar = () => {
  const session = useSession();
  const pathname = usePathname();

  console.log(pathname);

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          component={Link}
          href="/"
          sx={{
            textDecoration: "none",
            flexGrow: 1,
            cursor: "pointer",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: "Fredoka One, Roboto, Arial, sans-serif",
              color: theme.palette.text.primary,
            }}
          >
            Mi Biblioteca
          </Typography>
        </Box>
        {(session.status !== "authenticated" && pathname !== "/auth/login") && (
          <Button color="inherit" component={Link} href="/auth/login">
            Iniciar Sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export { BasicAppbar };
