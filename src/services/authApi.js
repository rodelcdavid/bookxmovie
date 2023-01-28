import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const dev = process.env.NODE_ENV === "development";
const baseUrl = dev
  ? "http://localhost:7000"
  : process.env.REACT_APP_SERVER_URL;

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    //signUp
    signUp: builder.mutation({
      query: (user) => ({
        url: "signup",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    logIn: builder.mutation({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useSignUpMutation, useLogInMutation } = authApi;
