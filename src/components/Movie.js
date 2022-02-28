import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const Movie = ({ pair, userId, isVoting, handleVote, votePercentage }) => {
  return (
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
        isLoading={isVoting}
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
            color: pair.movieVotes >= pair.bookVotes ? "#00B8A9" : "#F6416C",
          }}
          position="relative"
        >
          {votePercentage(pair.bookVotes, pair.movieVotes, "movie")}%
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
            fontSize: "0.7rem",
            fontWeight: "bolder",
            top: "10px",
            right: "-17px",
            color: "#000",
            backgroundColor: "gold",
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
  );
};

export default Movie;
