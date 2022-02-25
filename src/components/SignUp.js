import React from "react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const SignUp = () => {
  return (
    <FormControl>
      <FormLabel>Name</FormLabel>
      <Input type="text" />
      <FormLabel>Email</FormLabel>
      <Input type="email" />
      <FormLabel>Password</FormLabel>
      <Input type="password" />
      <FormLabel>Confirm Password</FormLabel>
      <Input type="password" />
      <Button colorScheme="teal">Sign Up</Button>
    </FormControl>
  );
};

export default SignUp;
