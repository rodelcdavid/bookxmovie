import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || { id: "guest" },
  openAccessDialog: false,
  tabIndex: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload.user;
    },
    setOpenAccessDialog: (state, { payload }) => {
      state.openAccessDialog = payload;
    },
    setTabIndex: (state, { payload }) => {
      state.tabIndex = payload;
    },
  },
});

export const { setUser, setOpenAccessDialog, setTabIndex } = authSlice.actions;

export default authSlice.reducer;
