// "use client";

// import React, { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation"; // Note the change from 'next/router' to 'next/navigation'
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Container,
//   useTheme,
//   CircularProgress,
// } from "@mui/material";
// import { motion } from "framer-motion";

// const LoginForm = () => {
//   const [dni, setDni] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const theme = useTheme();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     console.log("dni:", dni, "password:", password);

//     const result = await signIn("credentials", {
//       dni,
//       password,
//       redirect: false,
//     });

//     setIsLoading(false);

//     if (result?.error) {
//       setError(result.error);
//     } else if (result?.ok) {
//       router.push("/dashboard"); // Redirect to dashboard or home page
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Paper
//             elevation={3}
//             sx={{
//               padding: 4,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               backgroundColor: theme.palette.background.paper,
//             }}
//           >
//             <Typography
//               component="h1"
//               variant="h4"
//               sx={{
//                 color: theme.palette.primary.main,
//                 marginBottom: 3,
//                 fontWeight: "bold",
//               }}
//             >
//               Iniciar Sesión
//             </Typography>
//             <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="dni"
//                 label="DNI"
//                 name="dni"
//                 autoComplete="dni"
//                 autoFocus
//                 value={dni}
//                 onChange={(e) => setDni(e.target.value)}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": {
//                       borderColor: theme.palette.primary.main,
//                     },
//                     "&:hover fieldset": {
//                       borderColor: theme.palette.secondary.main,
//                     },
//                   },
//                 }}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Contraseña"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     "& fieldset": {
//                       borderColor: theme.palette.primary.main,
//                     },
//                     "&:hover fieldset": {
//                       borderColor: theme.palette.secondary.main,
//                     },
//                   },
//                 }}
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{
//                   mt: 3,
//                   mb: 2,
//                   backgroundColor: theme.palette.secondary.main,
//                   color: theme.palette.secondary.contrastText,
//                   "&:hover": {
//                     backgroundColor: theme.palette.accent?.main,
//                   },
//                 }}
//                 disabled={isLoading}
//               >
//                 {isLoading ? <CircularProgress size={24} /> : "Ingresar"}
//               </Button>
//               {error && (
//                 <Typography color="error" align="center">
//                   {error}
//                 </Typography>
//               )}
//             </Box>
//           </Paper>
//         </motion.div>
//       </Box>
//     </Container>
//   );
// };

// export { LoginForm };
"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";

type FormData = {
  dni: string;
  password: string;
};

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const theme = useTheme();

  const onSubmit = async (data: FormData) => {
    setError(null);
    setIsLoading(true);

    const result = await signIn("credentials", {
      dni: data.dni,
      password: data.password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setError(result.error);
    } else if (result?.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
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
            {/* <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <img
                src="/api/placeholder/150/150"
                alt="Mascot"
                style={{ marginBottom: "20px" }}
              />
            </motion.div> */}
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1, width: "100%" }}
            >
              <Controller
                name="dni"
                control={control}
                defaultValue=""
                rules={{ required: "DNI es requerido" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    id="dni"
                    label="Número Mágico (DNI)"
                    autoComplete="dni"
                    autoFocus
                    error={!!errors.dni}
                    helperText={errors.dni?.message}
                    InputProps={{
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
                rules={{ required: "Contraseña es requerida" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    label="Palabra Secreta"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
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
