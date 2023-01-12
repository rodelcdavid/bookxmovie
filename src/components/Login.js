import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setOpenAccessDialog,
  setTabIndex,
  setUser,
} from "../features/authSlice";
import { useLogInMutation, useSignUpMutation } from "../services/authApi";
import { toastList } from "../utils/toastList";

const Login = () => {
  /* Local state */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* Redux */
  const [logIn, { data: user, error }] = useLogInMutation();
  const [signUp, { data: tester, isLoading: isSigningUp }] =
    useSignUpMutation();
  const dispatch = useDispatch();

  /* Utils */
  const toast = useToast();

  /* Handlers */
  const handleLogin = async () => {
    await logIn({ email, password });
  };

  const handleTest = async () => {
    const dateString = new Date().valueOf().toString();
    const tester = {
      name: "Awesome Tester",
      email: `tester${dateString}@test.com`,
      password: "test",
    };
    await signUp(tester);
  };

  /* Useeffects */
  useEffect(() => {
    if (user) {
      dispatch(setUser({ user }));
      localStorage.user = JSON.stringify(user);
      dispatch(setOpenAccessDialog(false));
    }
    if (tester) {
      dispatch(setUser({ user: tester }));
      localStorage.user = JSON.stringify(tester);
      setEmail(tester.email);
      setPassword("test");
      toast(toastList.testerToast);
      setTimeout(() => {
        dispatch(setOpenAccessDialog(false));
      }, 2000);
    }
  }, [user, tester, dispatch, toast]);

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
      <FormControl
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin();
          }
        }}
      >
        <FormLabel htmlFor="login-email">Email</FormLabel>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          id="login-email"
          type="email"
          value={email}
        />
        <FormLabel htmlFor="login-password">Password</FormLabel>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          id="login-password"
          type="password"
          value={password}
        />
        <Button
          onClick={handleLogin}
          type="submit"
          colorScheme="teal"
          marginTop="1rem"
          isFullWidth
        >
          Log In
        </Button>
        <Button
          onClick={handleTest}
          type="submit"
          colorScheme="orange"
          marginTop="5px"
          isFullWidth
          isLoading={isSigningUp}
          loadingText="Generating Test Account"
        >
          Test
        </Button>
        <Box display="flex" gap="5px" marginTop="1rem">
          <Text fontSize="sm">Don't have an account?</Text>
          <Button
            onClick={() => dispatch(setTabIndex(1))}
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
