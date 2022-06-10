import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   user: JSON.parse(localStorage.getItem("user")) || { id: "guest" },
  //   openAccessDialog: false,
  //   tabIndex: 0,
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
    // setTabIndex: (state, { payload }) => {
    //   state.tabIndex = payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setOpenModal, setSelectedBook, setSelectedMovie } =
  findSlice.actions;

export default findSlice.reducer;
