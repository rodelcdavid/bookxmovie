import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const dev = process.env.NODE_ENV === "development";
const baseUrl = dev
  ? "http://localhost:7000"
  : "https://bookxmovie-api.herokuapp.com";
// Define a service using a base URL and expected endpoints
export const matchupsApi = createApi({
  reducerPath: "matchupsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getMatchups: builder.query({
      query: (userId) => `matchups/${userId}`,
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
    //addmatchup
    addMatchup: builder.mutation({
      query: (matchup) => ({
        url: "add",
        method: "POST",
        body: matchup,
      }),
      invalidatesTags: ["Matchup"],
    }),

    addVote: builder.mutation({
      query: ({ matchupId, ...rest }) => ({
        url: `vote/${matchupId}`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["Matchup"],
    }),

    //editVote
    updateVote: builder.mutation({
      query: ({ matchupId, ...patch }) => ({
        url: `votes/${matchupId}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Matchup"],
    }),

    //deleteMatchup
    deleteMatchup: builder.mutation({
      query: (matchupId) => ({
        url: "delete",
        method: "DELETE",
        body: matchupId,
      }),
      invalidatesTags: ["Matchup"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMatchupsQuery,
  useAddMatchupMutation,
  useUpdateVoteMutation,
  useDeleteMatchupMutation,
  useAddVoteMutation,
} = matchupsApi;
