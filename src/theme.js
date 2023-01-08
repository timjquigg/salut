import { Roboto, Source_Serif_4, Open_Sans, Poppins,Chonburi } from "@next/font/google";
import { createTheme } from "@mui/material/styles";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const Source_Serif = Source_Serif_4({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const Cho = Chonburi({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const serif = Cho.style.fontFamily

export const Open_sans = Open_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const Poppin = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const sans = Poppin.style.fontFamily

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#f57c21",
      contrastText: "#022140"
    },
    secondary: {
      main: "#ee6d1f",
    },
    // error: {
    //   main: "#F13C20",
    // },
    // info: {
    //   main: "#C5CBE3",
    //   contrastText: "#EFE2BA",
    // },
    // background: {
    //   default: "#E9EEEE",
    // },
  },
  typography: {
    fontFamily: [ serif, sans ]
  },
});

export default theme;
