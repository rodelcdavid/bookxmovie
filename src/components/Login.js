import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const Login = () => {
  return (
    <FormControl>
      <FormLabel>Email</FormLabel>
      <Input type="email" />
      <FormLabel>Password</FormLabel>
      <Input type="password" />
      <Button colorScheme="teal">Log In</Button>
    </FormControl>
  );
};

export default Login;
