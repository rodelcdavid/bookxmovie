import { Box, Image, Text, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import logo from "../assets/logo.png";
import AccessDialog from "./AccessDialog";

const AppHeader = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [initialTab, setInitialTab] = useState("login");

  const handleAccess = (type) => {
    setOpenDialog(true);
    if (type === "login") {
      setInitialTab("login");
    } else {
      setInitialTab("signup");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "teal",
        display: "flex",
        alignItems: "center",
        height: "72px",
      }}
    >
      <Box
        sx={{
          color: "#FFDE7D",
          fontWeight: "bolder",
          fontSize: "1.5rem",
          display: "flex",
          alignItems: "center",
          marginRight: "auto",
          marginLeft: "10px",
          cursor: "pointer",

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
      <Box marginLeft="auto" marginRight="10px" display="flex" gap="5px">
        <Button
          colorScheme="yellow"
          color="teal.700"
          _hover={{ backgroundColor: "yellow.200" }}
          _active={{ backgroundColor: "yellow.200" }}
          onClick={() => handleAccess("login")}
        >
          Log in
        </Button>
        <Button
          variant="ghost"
          color="#FFDE7D"
          _hover={{ backgroundColor: "none", color: "yellow.200" }}
          _active={{
            backgroundColor: "none",
            color: "yellow.200",
          }}
          _focus={{ outline: "none" }}
          onClick={() => handleAccess("signup")}
        >
          Sign Up
        </Button>
      </Box>
      <AccessDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        initialTab={initialTab}
      />
    </Box>
  );
};

export default AppHeader;
