import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Image,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import logo2 from "../assets/logo-2.png";
import {
  setOpenAccessDialog,
  setTabIndex,
  setUser,
} from "../features/authSlice";
import { resetFilters } from "../features/filterSlice";
import { toastList } from "../utils/toastList";
import AccessDialog from "./AccessDialog";

const AppHeader = () => {
  /* Redux */
  const { user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  /* Utils */
  const toast = useToast();

  /* Handlers */
  const handleAccess = (type) => {
    dispatch(setOpenAccessDialog(true));
    if (type === "signup") {
      dispatch(setTabIndex(1));
    } else {
      dispatch(setTabIndex(0));
    }
  };

  const handleLogOut = () => {
    const guestUser = { id: "guest" };
    setTimeout(() => {
      dispatch(setUser({ user: guestUser }));
      localStorage.setItem("user", JSON.stringify(guestUser));
      dispatch(resetFilters());
      toast(toastList.logOutToast);
    }, 1500);
  };

  return (
    <Box bgColor="teal" display="flex" alignItems="center" h="72px">
      {/* Logo */}
      <Box
        color="#FFDE7D"
        fontWeight="bolder"
        fontSize="1.5rem"
        display="flex"
        alignItems="center"
        marginRight="auto"
        marginLeft="10px"
        cursor="pointer"
      >
        <Image src={logo2} alt="" htmlWidth="50px" marginRight="10px" />
        <Box display={["none", "none", "flex"]} alignItems="center">
          <Text>book</Text>
          <Text fontSize="5xl">X</Text>
          <Text>movie</Text>
        </Box>
      </Box>

      {/* User / Access */}
      {user.id !== "guest" ? (
        <Box marginRight="10px">
          <Menu closeOnSelect={false}>
            <MenuButton color="#ffde7d" fontWeight="bolder">
              {user.name} <TriangleDownIcon boxSize={3} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleLogOut}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      ) : (
        <Box marginLeft="auto" marginRight="10px" display="flex" gap="5px">
          <Button
            onClick={() => handleAccess("login")}
            colorScheme="yellow"
            color="teal.700"
            _hover={{ backgroundColor: "yellow.200" }}
            _active={{ backgroundColor: "yellow.200" }}
          >
            Log in
          </Button>
          <Button
            onClick={() => handleAccess("signup")}
            variant="ghost"
            color="#FFDE7D"
            _hover={{ backgroundColor: "none", color: "yellow.200" }}
            _active={{
              backgroundColor: "none",
              color: "yellow.200",
            }}
            _focus={{ outline: "none" }}
          >
            Sign Up
          </Button>
        </Box>
      )}

      <AccessDialog />
    </Box>
  );
};

export default AppHeader;
