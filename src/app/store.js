import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "../services/authApi";
import { matchesApi } from "../services/matchesApi";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    authState: authReducer,
    [matchesApi.reducerPath]: matchesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(matchesApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);
