"use client";
import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import theme from "@/config/themes/theme";
import { BasicAppbar } from "@/common/components";

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: theme.palette.background.body,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <BasicAppbar />

      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          py: 4,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            color: theme.palette.text.primary,
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          ¡Bienvenido a tu biblioteca!
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: theme.palette.text.accent,
            mb: 4,
          }}
        >
          Un mundo de aventuras te espera
        </Typography>
        <Box mt={4}>
          <Image
            src="/fiction-express-logo.svg"
            width={200}
            height={200}
            alt="Fiction Express Logo"
          />
        </Box>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            href="/auth/login"
            sx={{
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
              "&:hover": {
                bgcolor: theme.palette.secondary.main,
              },
            }}
          >
            Comienza a leer
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
