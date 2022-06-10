import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useSignUpMutation } from "../services/authApi";
import { useDispatch } from "react-redux";
import {
  setOpenAccessDialog,
  setTabIndex,
  setUser,
} from "../features/authSlice";

/* Validation */
const schema = yup.object({
  name: yup.string().required("This field is required."),
  email: yup
    .string()
    .email("Invalid email address.")
    .required("This field is required.")
    .test(
      "Unique Email",
      "Email already in use.", // <- key, message
      async (email) => {
        return new Promise(async (resolve, reject) => {
          try {
            const dev = process.env.NODE_ENV === "development";
            const baseUrl = dev
              ? "http://localhost:7000"
              : "https://bookxmovie-api.herokuapp.com";
            const res = await fetch(`${baseUrl}/check-email/${email}`);
            if (res.ok) {
              resolve(true);
            } else {
              resolve(false);
            }
          } catch {
            alert("There was a problem connecting to the server.");
            return;
          }
        });
      }
    ),
  password: yup.string().required("This field is required."),
  passwordConfirmation: yup
    .string()
    .required("This field is required.")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignUp = () => {
  /* React hook form */
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  /* Redux */
  const [signUp, { data: user, isLoading, isSuccess }] = useSignUpMutation();
  const dispatch = useDispatch();

  /* Useeffects */
  useEffect(() => {
    if (user) {
      dispatch(setUser({ user }));
      localStorage.user = JSON.stringify(user);
      dispatch(setOpenAccessDialog(false));
    }
  }, [user, dispatch]);

  /* Handlers */
  const onSignUp = async (data) => {
    if (data) {
      await signUp(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSignUp)}>
      {/* Name */}
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input id="name" {...register("name")} />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      {/* Email */}
      <FormControl isInvalid={errors.email}>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input id="email" type="email" {...register("email")} />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>

      {/* Password */}
      <FormControl isInvalid={errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input id="password" type="password" {...register("password")} />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>

      {/* Confirm Password */}
      <FormControl isInvalid={errors.passwordConfirmation}>
        <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
        <Input
          id="confirm-password"
          type="password"
          {...register("passwordConfirmation")}
        />
        <FormErrorMessage>
          {errors.passwordConfirmation && errors.passwordConfirmation.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        mt={4}
        colorScheme="teal"
        isLoading={isSubmitting}
        type="submit"
        isFullWidth
      >
        Sign Up
      </Button>
      <Box display="flex" gap="5px" marginTop="1rem">
        <Text fontSize="sm">Already have an account?</Text>
        <Button
          onClick={() => dispatch(setTabIndex(0))}
          variant="link"
          size="sm"
          colorScheme="teal"
        >
          Log In
        </Button>
      </Box>
    </form>
  );
};

export default SignUp;
