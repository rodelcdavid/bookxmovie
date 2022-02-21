import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMatchesListAsync = createAsyncThunk(
  "matches/getMatchesListAsync",
  async (payload) => {
    try {
      const response = await fetch("http://localhost:7000/matches");
      const matchesList = await response.json();
      return { matchesList };
    } catch (err) {
      console.log(err);
    }
  }
);

//add match async
export const addMatchAsync = createAsyncThunk(
  "matches/addMatchAsync",
  async (payload) => {
    try {
      const response = await fetch("http://localhost:7000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ match: payload.match }),
      });
      const newMatch = await response.json();
      return { newMatch };
    } catch (err) {
      console.log(err);
    }
  }
);

//update votes async

//delete match async
export const deleteMatchAsync = createAsyncThunk(
  "matches/deleteMatchAsync",
  async (payload) => {
    try {
      const response = await fetch("http://localhost:7000/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchId: payload.matchId }),
      });
      const deletedMatch = await response.json();
      return { deletedMatch };
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  matchesList: [],
};

export const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {},
  extraReducers: {
    [getMatchesListAsync.fulfilled]: (state, { payload }) => {
      const renamedDataProps = payload.matchesList.map((match) => {
        return {
          id: match.id,
          bookInfo: match.book_info,
          movieInfo: match.movie_info,
          bookVotes: match.book_votes,
          movieVotes: match.movie_votes,
          popularity: match.popularity,
          votedFor: match.voted_for,
        };
      });

      state.matchesList = renamedDataProps;
    },
    [getMatchesListAsync.pending]: (state, { payload }) => {
      console.log("pending");
    },
    [getMatchesListAsync.rejected]: (state, { payload }) => {
      console.log("error");
    },
    [addMatchAsync.fulfilled]: (state, { payload }) => {
      //push new match to current matcheslist
      const {
        id,
        book_info,
        movie_info,
        book_votes,
        movie_votes,
        popularity,
        voted_for,
      } = payload.newMatch;

      //FIXME: push will not be sorted by popularity
      state.matchesList.push({
        id: id,
        bookInfo: book_info,
        movieInfo: movie_info,
        bookVotes: book_votes,
        movieVotes: movie_votes,
        popularity: popularity,
        votedFor: voted_for,
      });
    },
    [addMatchAsync.pending]: (state, { payload }) => {
      console.log("pending");
    },
    [addMatchAsync.rejected]: (state, { payload }) => {
      console.log("error");
    },
    [deleteMatchAsync.fulfilled]: (state, { payload }) => {
      state.matchesList = state.matchesList.filter((match) => {
        return match.id !== payload.deletedMatch.id;
      });
    },
    [deleteMatchAsync.pending]: (state, { payload }) => {
      console.log("pending");
    },
    [deleteMatchAsync.rejected]: (state, { payload }) => {
      console.log("error");
    },
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default matchesSlice.reducer;
