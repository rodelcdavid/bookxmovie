import { Box, Image, Text, Button } from "@chakra-ui/react";
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
        // justifyContent: "flex-start",
        // paddingLeft: "1rem",
        alignItems: "center",
        height: "72px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginRight: "auto",
          marginLeft: "10px",

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
        <Image src={logo} alt="" htmlWidth="50px" marginRight="10px" />

        <Text>book</Text>
        <Text fontSize="5xl">X</Text>
        <Text>movie</Text>
      </Box>
      <Button colorScheme="yellow" marginLeft="auto" marginRight="10px">
        Log in
      </Button>
    </Box>
  );
};

export default AppHeader;
