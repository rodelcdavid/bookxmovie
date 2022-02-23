import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:7000";
// Define a service using a base URL and expected endpoints
export const matchesApi = createApi({
  reducerPath: "matchesApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getMatchesList: builder.query({
      query: (userId) => `matches/${userId}`,
      providesTags: ["Matches"],
      transformResponse: (response) => {
        response = response.map((match) => {
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
        return response;
      },
    }),
    //addmatch
    addMatch: builder.mutation({
      query: (match) => ({
        url: "add",
        method: "POST",
        body: match,
      }),
      invalidatesTags: ["Matches"],
    }),

    addVote: builder.mutation({
      query: ({ matchId, ...rest }) => ({
        url: `vote/${matchId}`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["Matches"],
    }),
    //deleteMatch
    deleteMatch: builder.mutation({
      query: (matchId) => ({
        url: "delete",
        method: "DELETE",
        body: matchId,
      }),
      invalidatesTags: ["Matches"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMatchesListQuery,
  useAddMatchMutation,
  useDeleteMatchMutation,
  useAddVoteMutation,
} = matchesApi;
