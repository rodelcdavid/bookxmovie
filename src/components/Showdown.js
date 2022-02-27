import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Heading,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  useAddVoteMutation,
  useDeleteMatchMutation,
  useGetMatchesListQuery,
} from "../services/matchesApi";

import { toastList } from "../utils/toastList";

const Showdown = ({ setOpenAccessDialog }) => {
  //TODO: set user
  const { user } = useSelector((state) => state.authState);
  const { id: userId } = user;

  const toast = useToast();
  const {
    data: matchesList,
    isFetching,
    isLoading,
  } = useGetMatchesListQuery(userId);
  const [deleteMatch] = useDeleteMatchMutation();

  const [addVote] = useAddVoteMutation();

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
      setFilteredList(tempFilteredList);
    }
  }, [searchQuery, matchesList]);

  const handleVote = async (matchId, votedFor) => {
    if (userId === "guest") {
      //open login dialog
      setOpenAccessDialog(true);
      toast(toastList.accessToast);
      //proceed vote
    } else {
      await addVote({ userId, matchId, votedFor });
      toast(toastList.voteToast);
    }
  };

  const handleDelete = async (matchId) => {
    await deleteMatch({ matchId });
    toast(toastList.deleteToast);
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
      return "BOTH were great";
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F8F3D4",
        padding: "1rem 0",
        minHeight: "calc(100vh - 72px)",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          color: "rgba(0,0,0,0.87)",
          padding: "0.5rem",
        }}
      >
        <Heading size="md">
          Browse for books and movies and see which one people think was better.
        </Heading>
      </Box>
      <Box
        sx={{
          width: "30%",
          minWidth: "300px",
          margin: "0 auto",
          display: "flex",
          gap: "5px",
          marginTop: "1rem",
        }}
      >
        <Input
          type="search"
          placeholder="Search for book or movie"
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
      <Divider margin="1rem auto" borderColor="rgba(0,0,0,0.87)" />
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
        {filteredList ? (
          filteredList.map((pair, index) => {
            return (
              <Box
                sx={{
                  boxShadow: "0 5px 10px rgba(0,0,0,0.6)",
                  borderRadius: "10px",
                  width: "300px",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                  position: "relative",
                }}
                key={pair.id}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    margin: "0 auto",
                    backgroundColor: "#FFDE7D",
                    color: "rgba(0,0,0,0.87)",
                    padding: "0.5rem",
                    height: "4rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {userId === "guest" ? (
                    <Button
                      variant="solid"
                      colorScheme="teal"
                      onClick={handleVote}
                      fontSize="lg"
                      fontWeight="bold"
                      cursor="pointer"
                      width="100%"
                    >
                      Reveal Stats
                    </Button>
                  ) : (
                    <>
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
                    </>
                  )}
                </Box>
                <Box
                  sx={{
                    padding: "0.5rem 0",
                    display: "flex",
                    justifyContent: "center",
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
                    <Button
                      onClick={() => handleVote(pair.id, "book")}
                      colorScheme="teal"
                      size="xs"
                      // border="2px"
                      width="80%"
                      marginTop="0.5rem"
                      // isLoading={isLoading}
                      disabled={pair.votedFor ? true : false}
                      position="relative"
                    >
                      {pair.votedFor ? "You already voted" : "Vote for Book"}
                    </Button>

                    {userId === "guest" ? (
                      <Heading size="lg" color="rgba(0,0,0,0.87)">
                        ?%
                      </Heading>
                    ) : (
                      <Heading
                        size="lg"
                        sx={{
                          color:
                            pair.bookVotes >= pair.movieVotes
                              ? "#00B8A9"
                              : "#F6416C",
                        }}
                      >
                        {votePercentage(
                          pair.bookVotes,
                          pair.movieVotes,
                          "book"
                        )}
                        %
                      </Heading>
                    )}

                    <Box
                      sx={{
                        position: "relative",
                        cursor: "pointer",
                        overflow: "hidden",

                        "&::before": {
                          content: `"View Details"`,
                          color: "#fff",
                          position: "absolute",
                          display: "flex",
                          opacity: "0",
                          width: "100%",
                          height: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bolder",
                          backgroundColor: "rgba(0,0,0,0.6)",
                          zIndex: 1,
                          transition: "opacity 150ms ease-in",
                        },
                        "&:hover::before": { opacity: "1" },
                        "&::after": {
                          content: `"Voted"`,
                          position: "absolute",
                          width: "70px",
                          fontSize: "0.75rem",
                          fontWeight: "bolder",
                          top: "5px",
                          right: "-20px",
                          color: "#fff",
                          backgroundColor: "teal",
                          transform: "rotate(45deg)",
                          display: pair.votedFor === "book" ? "block" : "none",
                        },
                      }}
                    >
                      <Image
                        src={pair.bookInfo.volumeInfo.imageLinks?.thumbnail}
                        alt=""
                        width="120px"
                        height="180px"
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
                    }}
                    // onClick={() => handleVoteMovie(pair)}
                  >
                    <Button
                      onClick={() => handleVote(pair.id, "movie")}
                      colorScheme="teal"
                      size="xs"
                      width="80%"
                      // border="2px"
                      marginTop="0.5rem"
                      // isLoading={isLoading}
                      isDisabled={pair.votedFor ? true : false}
                    >
                      {pair.votedFor ? "You already voted" : "Vote for Movie"}
                    </Button>
                    {userId === "guest" ? (
                      <Heading size="lg" color="rgba(0,0,0,0.87)">
                        ?%
                      </Heading>
                    ) : (
                      <Heading
                        size="lg"
                        sx={{
                          color:
                            pair.movieVotes >= pair.bookVotes
                              ? "#00B8A9"
                              : "#F6416C",
                        }}
                        position="relative"
                      >
                        {votePercentage(
                          pair.bookVotes,
                          pair.movieVotes,
                          "movie"
                        )}
                        %
                      </Heading>
                    )}

                    <Box
                      sx={{
                        position: "relative",
                        cursor: "pointer",
                        overflow: "hidden",

                        "&::before": {
                          content: `"View Details"`,
                          color: "#fff",
                          position: "absolute",
                          display: "flex",
                          opacity: "0",
                          width: "100%",
                          height: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bolder",

                          backgroundColor: "rgba(0,0,0,0.6)",
                          zIndex: 1,
                          transition: "opacity 150ms ease-in",
                        },
                        "&:hover::before": { opacity: "1" },

                        "&::after": {
                          content: `"Voted"`,
                          position: "absolute",
                          width: "70px",
                          fontSize: "0.75rem",
                          fontWeight: "bolder",
                          top: "5px",
                          right: "-20px",
                          color: "#fff",
                          backgroundColor: "teal",
                          transform: "rotate(45deg)",
                          display: pair.votedFor === "movie" ? "block" : "none",
                        },
                      }}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/original/${pair.movieInfo.poster_path}`}
                        alt=""
                        // htmlWidth="100%"
                        // htmlHeight="100%"
                        width="120px"
                        height="180px"
                      />
                    </Box>

                    <Text fontSize="sm" marginTop="0.2rem">
                      {pair.movieInfo.title}
                    </Text>
                  </Box>
                </Box>
                {userId === 2 && (
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
