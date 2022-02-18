import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import initialState from "../initialStateExample";

const Showdown = ({ showdownPairList, setShowdownPairList }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredList, setFilteredList] = useState(showdownPairList);

  useEffect(() => {
    setFilteredList(showdownPairList);
  }, [showdownPairList]);

  const handleSearch = () => {
    //TODO: showdownpairlist should revert back to initial state
    // setShowdownPairList(initialState);
    // const tempShowdownPairList = [...showdownPairList];

    const tempFilteredList = showdownPairList.filter((pair) => {
      return (
        pair.bookInfo.volumeInfo.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        pair.movieInfo.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    //TODO:need to update filtered list when you add a new match, useeffect
    setFilteredList(tempFilteredList);
  };

  const handleVoteBook = (pair) => {
    const tempShowdownPairList = [...showdownPairList];

    const index = tempShowdownPairList.findIndex((item) => item === pair);
    tempShowdownPairList[index].bookVotes += 1;

    setShowdownPairList(tempShowdownPairList);
  };
  const handleVoteMovie = (pair) => {
    const tempShowdownPairList = [...showdownPairList];
    const index = tempShowdownPairList.findIndex((item) => item === pair);

    tempShowdownPairList[index].movieVotes += 1;

    setShowdownPairList(tempShowdownPairList);
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

  console.log("showdown", showdownPairList);

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
          onChange={(e) => setSearchQuery(e.target.value)}
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
        {filteredList.length ? (
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
                }}
                key={pair.id}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    margin: "0 auto",
                    backgroundColor: "#FFDE7D",
                    color: "rgba(0,0,0,0.87)",
                    // color: "#fff",
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
                    height: "300px",
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
                    onClick={() => handleVoteBook(pair)}
                  >
                    <Heading
                      size="md"
                      sx={{
                        color:
                          pair.bookVotes >= pair.movieVotes
                            ? "#00B8A9"
                            : "#F6416C",
                      }}
                    >
                      {votePercentage(pair.bookVotes, pair.movieVotes, "book")}%
                    </Heading>

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

                    <Text>{pair.bookInfo.volumeInfo.title}</Text>
                  </Box>

                  <Heading
                    size="lg"
                    sx={{ marginTop: "5.5rem", color: "rgba(0,0,0,0.87)" }}
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
                    onClick={() => handleVoteMovie(pair)}
                  >
                    <Heading
                      size="md"
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

                    <Text>{pair.movieInfo.title}</Text>
                  </Box>
                </Box>
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
