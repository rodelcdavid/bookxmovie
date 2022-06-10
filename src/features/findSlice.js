import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   user: JSON.parse(localStorage.getItem("user")) || { id: "guest" },
  //   openAccessDialog: false,
  //   tabIndex: 0,
};

export const findSlice = createSlice({
  name: "find",
  initialState,
  reducers: {
    setOpenModal: (state, { payload }) => {
      state.openModal = payload;
    },
    // setOpenAccessDialog: (state, { payload }) => {
    //   state.openAccessDialog = payload;
    // },
    // setTabIndex: (state, { payload }) => {
    //   state.tabIndex = payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setOpenModal } = findSlice.actions;

export default findSlice.reducer;
