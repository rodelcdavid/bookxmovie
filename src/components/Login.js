import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice";
import { useLogInMutation } from "../services/authApi";

const Login = ({ setOpenAccessDialog, setTabIndex }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(false);

  const [logIn, { data: user, error }] = useLogInMutation();

  const handleLogin = async () => {
    await logIn({ email, password });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser({ user }));
      localStorage.user = JSON.stringify(user);
      setOpenAccessDialog(false);
    }
  }, [user]);

  return (
    <>
      {error?.status === 400 && (
        <Box
          style={{
            color: "black",
            textAlign: "center",
            padding: "0.5rem",
            marginTop: "1rem",
            border: "solid 1px red",
            backgroundColor: "seashell",
            fontSize: "0.8rem",
          }}
        >
          Email and password combination is incorrect. Please try again.
        </Box>
      )}
      <FormControl>
        <FormLabel htmlFor="login-email">Email</FormLabel>
        <Input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormLabel htmlFor="login-password">Password</FormLabel>
        <Input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          onClick={handleLogin}
          colorScheme="teal"
          marginTop="1rem"
        >
          Log In
        </Button>
        <Box display="flex" gap="5px" marginTop="1rem">
          <Text fontSize="sm">Don't have an account?</Text>
          <Button
            onClick={() => setTabIndex(1)}
            variant="link"
            size="sm"
            colorScheme="teal"
          >
            Sign Up
          </Button>
        </Box>
      </FormControl>
    </>
  );
};

export default Login;
