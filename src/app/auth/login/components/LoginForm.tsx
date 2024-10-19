"use client";

import React from "react";

import { Controller } from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useLoginForm from "../hooks/useLoginForm";
import theme from "@/config/themes/theme";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    errors,
    error,
    isLoading,
    showPassword,
    dniInputRef,
    passwordInputRef,
    randomDniName,
    randomPasswordName,
    onSubmit,
    handleClickShowPassword,
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
            <Typography
              component="h1"
              variant="h4"
              sx={{
                color: theme.palette.primary.main,
                marginBottom: 3,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              ¡Bienvenido, Explorador!
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1, width: "100%" }}
              autoComplete="off"
            >
              <input type="text" style={{ display: "none" }} />
              <Controller
                name="dni"
                control={control}
                defaultValue=""
                rules={{ required: "Debe ingresar tu DNI" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    inputRef={dniInputRef}
                    margin="normal"
                    fullWidth
                    id={randomDniName.current}
                    name={randomDniName.current}
                    label="Número Mágico (DNI)"
                    autoComplete="off"
                    autoFocus
                    error={!!errors.dni}
                    helperText={errors.dni?.message}
                    InputProps={{
                      readOnly: true,
                      sx: {
                        borderRadius: "10px",
                        backgroundColor: theme.palette.background.default,
                        "&:hover": {
                          backgroundColor: theme.palette.background.paper,
                        },
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: "Debe ingresar tu Palabra Secreta" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    inputRef={passwordInputRef}
                    margin="normal"
                    fullWidth
                    label="Palabra Secreta"
                    type={showPassword ? "text" : "password"}
                    id={randomPasswordName.current}
                    name={randomPasswordName.current}
                    autoComplete="new-password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: "10px",
                        backgroundColor: theme.palette.background.default,
                        "&:hover": {
                          backgroundColor: theme.palette.background.paper,
                        },
                      },
                    }}
                  />
                )}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  borderRadius: "10px",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  padding: "12px",
                  "&:hover": {
                    backgroundColor: theme.palette.accent?.main,
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  "¡Aventura Comienza!"
                )}
              </Button>
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
