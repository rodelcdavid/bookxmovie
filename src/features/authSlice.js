import { createSlice } from "@reduxjs/toolkit";
const userLocalStorage = localStorage.getItem("user");

const initialState = {
  //currentUser:{},
  //error:"",
  //isUserAuthenticated:false,
  //loading: false
  user: JSON.parse(localStorage.getItem("user")) || { id: "guest" },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions;

export default authSlice.reducer;
