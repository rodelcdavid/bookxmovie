import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const Movie = ({ matchup, userId, isVoting, handleVote, votePercentage }) => {
  return (
    <Box
      sx={{
        width: "300px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      // onClick={() => handleVoteMovie(matchup)}
    >
      <Button
        onClick={() => handleVote(matchup.id, "movie")}
        isLoading={isVoting}
        colorScheme="teal"
        size="xs"
        width="80%"
        // border="2px"
        marginTop="0.5rem"
        // isLoading={isLoading}
        isDisabled={matchup.votedFor ? true : false}
      >
        {matchup.votedFor ? "You already voted" : "Vote for Movie"}
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
              matchup.movieVotes >= matchup.bookVotes ? "#00B8A9" : "#F6416C",
          }}
          position="relative"
        >
          {votePercentage(matchup.bookVotes, matchup.movieVotes, "movie")}%
        </Heading>
      )}

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",

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
            display: matchup.votedFor === "movie" ? "block" : "none",
          },
        }}
      >
        <Image
          src={`https://image.tmdb.org/t/p/original/${matchup.movieInfo.poster_path}`}
          alt=""
          // htmlWidth="100%"
          // htmlHeight="100%"
          width="120px"
          height="180px"
        />
      </Box>

      <Text fontSize="sm" marginTop="0.2rem">
        {matchup.movieInfo.title}
      </Text>
    </Box>
  );
};

export default Movie;
