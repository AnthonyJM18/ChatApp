import { createMuiTheme } from "@material-ui/core/styles";
export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    common: { black: "#000", white: "#fff" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "rgba(251, 220, 135, 1)",
      main: "rgba(255, 142, 0, 1)",
      dark: "rgba(212, 95, 0, 1)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(88, 165, 255, 1)",
      main: "rgba(0, 117, 255, 1)",
      dark: "rgba(1, 71, 155, 1)",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.30)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});
