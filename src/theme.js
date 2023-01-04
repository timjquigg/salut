import { Roboto } from "@next/font/google";
import { createTheme } from "@mui/material/styles";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#4056A1",
  //   },
  //   secondary: {
  //     main: "#D79922",
  //   },
  //   error: {
  //     main: "#F13C20",
  //   },
  //   info: {
  //     main: "#C5CBE3",
  //     contrastText: "#EFE2BA",
  //   },
  //   background: {
  //     default: "#E9EEEE",
  //   },
  // },
  // typography: {
  //   fontFamily: roboto.style.fontFamily,
  // },
});

export default theme;
