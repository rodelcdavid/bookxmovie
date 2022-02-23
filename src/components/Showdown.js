import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import {
  useAddUserVoteMutation,
  useDeleteMatchMutation,
  useGetMatchesListQuery,
  useUpdateMatchesVoteMutation,
} from "../services/matchesApi";

import { toastList } from "../utils/toastList";

const Showdown = () => {
  const user = { userId: "32432", isAdmin: true };
  const { userId, isAdmin } = user;

  const toast = useToast();
  const {
    data: matchesList,
    isFetching,
    isLoading,
  } = useGetMatchesListQuery(userId);
  const [deleteMatch] = useDeleteMatchMutation();
  const [updateMatchesVote] = useUpdateMatchesVoteMutation();
  const [addUserVote] = useAddUserVoteMutation();
  // const matchesList = data;

  const [searchQuery, setSearchQuery] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [filteredList, setFilteredList] = useState(matchesList);

  const handleSearch = () => {
    setSearchQuery(inputSearch);
  };

  useEffect(() => {
    if (matchesList) {
      const tempFilteredList = matchesList.filter((pair) => {
        return (
          pair.bookInfo.volumeInfo.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          pair.movieInfo.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      //TODO:need to update filtered list when you add a new match, useeffect
      setFilteredList(tempFilteredList);
    }
  }, [searchQuery, matchesList]);

  //Make vote into one function
  const handleVoteBook = async (pair) => {
    //TODO: update both matches and uservote tables, use TRANSACTION in postgres
    //update in db table matches
    await updateMatchesVote({ matchId: pair.id, votedFor: "book" });

    //update in db table user_votes
    await addUserVote({ userId, matchId: pair.id, votedFor: "book" });
    toast(toastList.voteToast);
  };
  const handleVoteMovie = async (pair) => {
    //update db in matches table
    await updateMatchesVote({ matchId: pair.id, votedFor: "movie" });

    //update db in user_votes table
    await addUserVote({ userId, matchId: pair.id, votedFor: "movie" });

    toast(toastList.voteToast);
  };

  const handleDelete = async (matchId) => {
    await deleteMatch({ matchId });
    toast(toastList.deleteToast);
    // dispatch(deleteMatchAsync({ matchId: id }));
  };

  const votePercentage = (bookVotes, movieVotes, type) => {
    if (bookVotes + movieVotes !== 0) {
      if (type === "book") {
        const percentage = (
          (bookVotes / (bookVotes + movieVotes)) *
          100
        ).toFixed(2);
        return percentage;
      } else {
        const percentage = (
          (movieVotes / (bookVotes + movieVotes)) *
          100
        ).toFixed(2);
        return percentage;
      }
    } else {
      return 0;
    }
  };

  const whichWasBetter = (bookVotes, movieVotes) => {
    if (bookVotes > movieVotes) {
      return "BOOK was better";
    } else if (movieVotes > bookVotes) {
      return "MOVIE was better";
    } else if (movieVotes + bookVotes === 0) {
      return "No votes yet";
    } else {
      return "BOTH are great";
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F8F3D4",
        padding: "0.5rem 0",
        minHeight: "calc(100vh - 72px)",
      }}
    >
      <Box
        sx={{
          width: "30%",
          minWidth: "300px",
          margin: "0 auto",
          display: "flex",
          gap: "5px",
        }}
      >
        <Input
          type="search"
          // htmlSize="10"
          // width="auto"
          sx={{ backgroundColor: "#fff" }}
          onChange={(e) => setInputSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button onClick={handleSearch} colorScheme="teal">
          Search
        </Button>
      </Box>

      <Box
        sx={{
          justifyItems: "center",
          display: "grid",
          gridTemplateColumns: "repeat( auto-fit, minmax(320px, 1fr) )",
          // gap: "0.5rem",
          rowGap: "1rem",
          marginTop: "1rem",
        }}
      >
        {/* <Heading>Showdown</Heading> */}
        {filteredList ? (
          filteredList.map((pair, index) => {
            return (
              <Box
                sx={{
                  // backgroundColor: index % 2 === 0 ? "#fff" : "#C1DEAE",
                  // padding: "0.5rem",
                  // border: "2px solid teal",
                  boxShadow: "0 5px 10px rgba(0,0,0,0.6)",
                  borderRadius: "10px",
                  width: "300px",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                  position: "relative",
                }}
                key={pair.id}
                //TODO:remove this
                // onClick={() => alert(pair.id)}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    margin: "0 auto",
                    backgroundColor: "#FFDE7D",
                    color: "rgba(0,0,0,0.87)",
                    padding: "0.5rem",
                  }}
                >
                  <Heading
                    size="md"
                    sx={{
                      borderBottom: "1px solid rgba(0,0,0,0.87)",
                      width: "70%",
                      margin: "0 auto",
                    }}
                  >
                    {whichWasBetter(pair.bookVotes, pair.movieVotes)}
                  </Heading>
                  <Text sx={{ fontSize: "0.75rem" }}>
                    Total votes: {pair.bookVotes + pair.movieVotes}
                  </Text>
                </Box>
                <Box
                  sx={{
                    // padding: "1rem",
                    // border: "1px solid #aaa",
                    // width: "40%",
                    // height: "300px",
                    padding: "0.5rem 0",
                    display: "flex",
                    // gap: "10px",
                    justifyContent: "center",
                    // alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {/* Book */}
                  <Box
                    sx={{
                      width: "300px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    // onClick={() => handleVoteBook(pair)}
                  >
                    <Heading
                      size="lg"
                      sx={{
                        color:
                          pair.bookVotes >= pair.movieVotes
                            ? "#00B8A9"
                            : "#F6416C",
                      }}
                    >
                      {votePercentage(pair.bookVotes, pair.movieVotes, "book")}%
                    </Heading>

                    <Button
                      onClick={() => handleVoteBook(pair)}
                      colorScheme="teal"
                      size="xs"
                      border="2px"
                      width="80%"
                      marginTop="0.5rem"
                      // isLoading={isLoading}
                      disabled={pair.votedFor ? true : false}
                    >
                      {pair.votedFor ? "Already Voted" : "Vote for Book"}
                    </Button>

                    <Box
                      sx={{
                        width: "120px",
                        margin: "0 auto",
                        position: "relative",
                        cursor: "pointer",

                        "&::before": {
                          content: `"Vote for book"`,
                          color: "#fff",
                          position: "absolute",
                          display: "flex",
                          opacity: "0",
                          width: "100%",
                          height: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bolder",
                          fontSize: "1.2rem",
                          backgroundColor: "rgba(0,0,0,0.6)",
                          zIndex: 1,
                          transition: "opacity 150ms ease-in",
                        },
                        "&:hover::before": { opacity: "1" },
                      }}
                    >
                      <Image
                        src={pair.bookInfo.volumeInfo.imageLinks?.thumbnail}
                        alt=""
                        htmlWidth="100%"
                      />
                    </Box>

                    <Text fontSize="sm" marginTop="0.2rem">
                      {pair.bookInfo.volumeInfo.title}
                    </Text>
                  </Box>

                  <Heading
                    size="lg"
                    sx={{ marginTop: "8.5rem", color: "rgba(0,0,0,0.87)" }}
                  >
                    VS
                  </Heading>

                  {/* Movie */}
                  <Box
                    sx={{
                      width: "300px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      // justifyContent: "space-around",
                    }}
                    // onClick={() => handleVoteMovie(pair)}
                  >
                    <Heading
                      size="lg"
                      sx={{
                        color:
                          pair.movieVotes >= pair.bookVotes
                            ? "#00B8A9"
                            : "#F6416C",
                      }}
                    >
                      {votePercentage(pair.bookVotes, pair.movieVotes, "movie")}
                      %
                    </Heading>

                    <Button
                      onClick={() => handleVoteMovie(pair)}
                      colorScheme="teal"
                      size="xs"
                      width="80%"
                      border="2px"
                      marginTop="0.5rem"
                      // isLoading={isLoading}
                      isDisabled={pair.votedFor ? true : false}
                    >
                      {pair.votedFor ? "Already Voted" : "Vote for Movie"}
                    </Button>

                    <Box
                      sx={{
                        width: "120px",
                        margin: "0 auto",
                        position: "relative",
                        cursor: "pointer",

                        "&::before": {
                          content: `"Vote for movie"`,
                          color: "#fff",
                          position: "absolute",
                          display: "flex",
                          opacity: "0",
                          width: "100%",
                          height: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bolder",
                          fontSize: "1.2rem",

                          backgroundColor: "rgba(0,0,0,0.6)",
                          zIndex: 1,
                          transition: "opacity 150ms ease-in",
                        },
                        "&:hover::before": { opacity: "1" },
                      }}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/original/${pair.movieInfo.poster_path}`}
                        alt=""
                        htmlWidth="100%"
                      />
                    </Box>

                    <Text fontSize="sm" marginTop="0.2rem">
                      {pair.movieInfo.title}
                    </Text>
                  </Box>
                </Box>
                {isAdmin && (
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(pair.id)}
                    size="xs"
                    sx={{
                      position: "absolute",
                      right: 1,
                      top: 1,
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                )}
              </Box>
            );
          })
        ) : (
          <Spinner />
        )}
      </Box>
    </Box>
  );
};

export default Showdown;
