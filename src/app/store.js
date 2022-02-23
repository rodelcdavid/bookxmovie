import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { matchesApi } from "../services/matchesApi";

export const store = configureStore({
  reducer: {
    [matchesApi.reducerPath]: matchesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(matchesApi.middleware),
});

setupListeners(store.dispatch);
