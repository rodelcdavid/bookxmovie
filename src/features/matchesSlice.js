import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMatchesListAsync = createAsyncThunk(
  "matches/getMatchesListAsync",
  async (payload) => {
    try {
      const response = await fetch(
        `http://localhost:7000/matches/${payload.userId}`
      );
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

//update vote matches
export const updateMatchesVoteAsync = createAsyncThunk(
  "matches/updateMatchesVoteAsync",
  async (payload) => {
    try {
      const response = await fetch(
        `http://localhost:7000/matches/${payload.matchId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ votedFor: payload.votedFor }),
        }
      );
      const updatedMatch = await response.json();
      return { updatedMatch };
    } catch (err) {
      console.log(err);
    }
  }
);

//add vote user record
export const addUserVoteAsync = createAsyncThunk(
  "matches/addUserVoteAsync",
  async (payload) => {
    try {
      const response = await fetch(
        `http://localhost:7000/user-votes/${payload.userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            matchId: payload.matchId,
            votedFor: payload.votedFor,
          }),
        }
      );
      const userVote = await response.json();
      return { userVote };
    } catch (err) {
      console.log(err);
    }
  }
);

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
    [updateMatchesVoteAsync.fulfilled]: (state, { payload }) => {
      state.matchesList = state.matchesList.map((match) => {
        if (match.id === payload.updatedMatch.id) {
          match.bookVotes = payload.updatedMatch.book_votes;
          match.movieVotes = payload.updatedMatch.movie_votes;
        }
        return match;
      });
    },
    [updateMatchesVoteAsync.pending]: (state, { payload }) => {
      console.log("pending");
    },
    [updateMatchesVoteAsync.rejected]: (state, { payload }) => {
      console.log("error");
    },
    [addUserVoteAsync.fulfilled]: (state, { payload }) => {
      state.matchesList = state.matchesList.map((match) => {
        if (match.id === payload.userVote.match_id) {
          match.votedFor = payload.userVote.voted_for;
        }
        return match;
      });
    },
    [addUserVoteAsync.pending]: (state, { payload }) => {
      console.log("pending");
    },
    [addUserVoteAsync.rejected]: (state, { payload }) => {
      console.log("error");
    },
  },
});

export default matchesSlice.reducer;
