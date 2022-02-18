import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import logo from "../assets/logo.png";

const AppHeader = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: "teal",
        color: "#fff",
        fontWeight: "bolder",
        fontSize: "1.5rem",
        display: "flex",
        justifyContent: "flex-start",
        paddingLeft: "1rem",
        alignItems: "center",
        height: "72px",

        "& > p": {
          display: "none",
        },

        "@media(min-width:640px)": {
          "& > p": {
            display: "block",
          },
        },
      }}
    >
      <Image src={logo} alt="" htmlWidth="50px" sx={{ marginRight: "10px" }} />

      <Text>book</Text>
      <Text fontSize="5xl">X</Text>
      <Text>movie</Text>
    </Box>
  );
};

export default AppHeader;
