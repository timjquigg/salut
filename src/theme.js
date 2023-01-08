import { Roboto, Source_Serif_4, Open_Sans, Poppins } from "@next/font/google";
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

const serif = Source_Serif.style.fontFamily

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
      main: "#FC8C23",
    },
    // secondary: {
    //   main: "#D79922",
    // },
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
