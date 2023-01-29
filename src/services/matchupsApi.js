import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const dev = process.env.NODE_ENV === "development";
const baseUrl = dev
  ? "http://localhost:7000"
  : process.env.REACT_APP_SERVER_URL;
// Define a service using a base URL and expected endpoints
export const matchupsApi = createApi({
  reducerPath: "matchupsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Matchup"],
  endpoints: (builder) => ({
    getMatchups: builder.query({
      query: (userId) => `api/matchups/get-all/${userId}`,
      providesTags: ["Matchup"],
      transformResponse: (response) => {
        response = response.map((matchup) => {
          return {
            id: matchup.id,
            bookInfo: matchup.book_info,
            movieInfo: matchup.movie_info,
            bookVotes: matchup.book_votes,
            movieVotes: matchup.movie_votes,
            popularity: matchup.popularity,
            votedFor: matchup.voted_for,
          };
        });
        return response;
      },
    }),
    //addmatchup-admin
    addMatchup: builder.mutation({
      query: (matchup) => ({
        url: "api/admin/matchups/add-matchup",
        method: "POST",
        body: matchup,
      }),
      invalidatesTags: ["Matchup"],
    }),

    addVote: builder.mutation({
      query: ({ matchupId, ...rest }) => ({
        url: `api/matchups/add-vote/${matchupId}`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["Matchup"],
    }),

    //editVote-admin
    updateVote: builder.mutation({
      query: ({ matchupId, ...patch }) => ({
        url: `api/admin/matchups/edit-votes/${matchupId}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Matchup"],
    }),

    //removeVote
    removeVote: builder.mutation({
      query: ({ matchupId, ...patch }) => ({
        url: `api/matchups/remove-vote/${matchupId}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Matchup"],
    }),

    //deleteMatchup-admin
    deleteMatchup: builder.mutation({
      query: (matchupId) => ({
        url: "api/admin/matchups/delete-matchup",
        method: "DELETE",
        body: matchupId,
      }),
      invalidatesTags: ["Matchup"],
    }),
  }),
});

export const {
  useGetMatchupsQuery,
  useAddMatchupMutation,
  useUpdateVoteMutation,
  useRemoveVoteMutation,
  useDeleteMatchupMutation,
  useAddVoteMutation,
} = matchupsApi;
