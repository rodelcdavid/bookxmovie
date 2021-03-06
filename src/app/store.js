import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "../services/authApi";
import { matchupsApi } from "../services/matchupsApi";
import authReducer from "../features/authSlice";
import filterReducer from "../features/filterSlice";
import findReducer from "../features/findSlice";
import matchupsReducer from "../features/matchupsSlice";
export const store = configureStore({
  reducer: {
    authState: authReducer,
    filterState: filterReducer,
    findState: findReducer,
    matchupsState: matchupsReducer,
    [matchupsApi.reducerPath]: matchupsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(matchupsApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);
