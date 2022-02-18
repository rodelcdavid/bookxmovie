import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        // overflowY: "scroll",
        width: "100%",
        minHeight: "100vh",
        color: "rgba(0,0,0,0.87)",
      },
    },
  },
});

export default theme;
