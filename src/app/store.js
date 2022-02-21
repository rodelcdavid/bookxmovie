import { configureStore } from "@reduxjs/toolkit";
import matchesReducer from "../features/matchesSlice";

export const store = configureStore({
  reducer: {
    matchesState: matchesReducer,
  },
});
