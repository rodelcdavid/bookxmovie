import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const Movie = ({
  matchup,
  userId,
  isVoting,
  handleVote,
  votePercentage,
  isStatsVisible,
}) => {
  return (
    <Box
      sx={{
        width: "300px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        onClick={() => handleVote(matchup.id, "movie")}
        isLoading={isVoting}
        colorScheme="teal"
        size="xs"
        width="120px"
        borderRadius="3px"
        marginBottom="0.2rem"
        isDisabled={matchup.votedFor ? true : false}
      >
        {matchup.votedFor ? "You already voted" : "Vote for Movie"}
      </Button>

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

          "&::before": {
            content: `"${votePercentage(
              matchup.bookVotes,
              matchup.movieVotes,
              "movie"
            )}%"`,
            paddingTop: "4.2rem",
            position: "absolute",
            width: "120px",
            height: "180px",
            fontSize: "1.8rem",
            fontWeight: "bolder",
            top: "0",
            right: "0",
            color: "#fff",
            backgroundColor: "rgba(0,0,0,0.6)",
            opacity: isStatsVisible ? "1" : "0",
            transition: "opacity 0.3s ease-out",
          },
        }}
      >
        <Image
          src={`https://image.tmdb.org/t/p/original/${matchup.movieInfo.poster_path}`}
          alt=""
          width="120px"
          height="180px"
          border="1px solid #000"
        />
      </Box>

      <Text
        marginTop="0.2rem"
        fontSize="smaller"
        fontWeight="bold"
        width="120px"
      >
        {matchup.movieInfo.title}
      </Text>
    </Box>
  );
};

export default Movie;
