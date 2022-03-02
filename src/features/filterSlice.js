import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    sortBy: null,
    search: "",
    better: null,
    voted: null,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSortBy: (state, { payload }) => {
      state.filters.sortBy = payload.sortBy;
    },
    setSearch: (state, { payload }) => {
      state.filters.search = payload.search;
    },
    setBetter: (state, { payload }) => {
      state.filters.better = payload.better;
    },
    setVoted: (state, { payload }) => {
      state.filters.voted = payload.voted;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSortBy, setSearch, setBetter, setVoted, resetFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
