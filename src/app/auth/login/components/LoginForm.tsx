"use client";

import React from "react";

import { Box, Typography, Paper, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useLoginForm } from "../hooks/useLoginForm";
import theme from "@/config/themes/theme";
import {
  CustomPasswordField,
  CustomTextField,
  CustomTitle,
} from "@/common/components";
import { FormButton } from ".";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    error,  
    isLoading,
    dniInputRef,
    passwordInputRef,
    onSubmit,
  } = useLoginForm();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CustomTitle text="¡Bienvenido, Explorador!" />

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1, width: "100%" }}
              autoComplete="off"
            >
              <input type="text" style={{ display: "none" }} />
              <CustomTextField
                name="dni"
                control={control}
                defaultValue=""
                rules={{ required: "Debes ingresar tu DNI" }}
                label="Número Mágico (DNI)"
                inputRef={dniInputRef}
              />

              <CustomPasswordField
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "Debes ingresar tu contraseña",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                }}
                label="Palabra Secreta"
                inputRef={passwordInputRef}
              />

              <FormButton isLoading={isLoading} />

              {error && (
                <Typography color="error" align="center">
                  {error}
                </Typography>
              )}
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
};

export { LoginForm };
