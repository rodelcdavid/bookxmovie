import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        width: "100%",
        minHeight: "100vh",
        color: "rgba(0,0,0,0.87)",
      },
    },
  },
  breakpoints: {
    sm: "320px",
    md: "664px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  },
});

export default theme;
