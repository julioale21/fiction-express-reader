import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    accent?: {
      main: string;
      light: string;
    };
  }

  interface PaletteOptions {
    accent?: {
      main: string;
      light: string;
    };
  }

  interface TypeBackground {
    header: string;
    body: string;
  }

  interface TypeText {
    accent: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#7BD7D6",
      contrastText: "#264D5C",
    },
    secondary: {
      main: "#FFB74C",
      contrastText: "#264D5C",
    },
    accent: {
      main: "#FFB74C",
      light: "#FFAFAF",
    },
    background: {
      body: "#FFFCE8",
      header: "#7BD7D6",
      default: "#FFFCE8",
      paper: "#FFFCE8",
    },
    text: {
      primary: "#264D5C",
      secondary: "#264D5C",
      disabled: "#264D5C",
      accent: "#FFB74C",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), Roboto, Arial, sans-serif",
    h6: {
      fontWeight: 700,
      letterSpacing: "0.1em",
      color: "#264D5C",
    },
    body1: {
      color: "#264D5C",
    },
    body2: {
      color: "#264D5C",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#7BD7D6",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          "&:hover": {
            backgroundColor: "#FFB74C",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#264D5C",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "var(--font-geist-sans), Roboto, Arial, sans-serif",
        },
      },
    },
  },
});

export default theme;
