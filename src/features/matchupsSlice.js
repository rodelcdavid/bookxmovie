import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMatchup: null,
  openEditVoteModal: false,
};

export const matchupsSlice = createSlice({
  name: "matchups",
  initialState,
  reducers: {
    setSelectedMatchup: (state, { payload }) => {
      state.selectedMatchup = payload;
    },
    setOpenEditVoteModal: (state, { payload }) => {
      state.openEditVoteModal = payload;
    },
  },
});

export const { setOpenEditVoteModal, setSelectedMatchup } =
  matchupsSlice.actions;

export default matchupsSlice.reducer;
