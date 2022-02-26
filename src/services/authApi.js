import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:7000";
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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSignUpMutation, useLogInMutation } = authApi;
