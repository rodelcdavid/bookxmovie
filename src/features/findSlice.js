import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
  selectedBook: null,
  selectedMovie: null,
};

export const findSlice = createSlice({
  name: "find",
  initialState,
  reducers: {
    setOpenModal: (state, { payload }) => {
      state.openModal = payload;
    },
    setSelectedBook: (state, { payload }) => {
      state.selectedBook = payload;
    },
    setSelectedMovie: (state, { payload }) => {
      state.selectedMovie = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpenModal, setSelectedBook, setSelectedMovie } =
  findSlice.actions;

export default findSlice.reducer;
