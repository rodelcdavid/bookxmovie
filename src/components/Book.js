import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";

import React from "react";

const Book = ({
  matchup,
  userId,
  isVoting,
  handleVote,
  votePercentage,
  isStatsVisible,
}) => {
  return (
    <Box
      width="300px"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Button
        onClick={() => handleVote(matchup.id, "book")}
        isLoading={isVoting}
        colorScheme="teal"
        size="xs"
        borderRadius="0"
        width="120px"
        marginBottom="0.2rem"
        disabled={matchup.votedFor ? true : false}
        position="relative"
      >
        Vote for Book
      </Button>

      <Box
        position="relative"
        overflow="hidden"
        _after={{
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
          display: matchup.votedFor === "book" ? "block" : "none",
        }}
        _before={{
          content: `"${votePercentage(
            matchup.bookVotes,
            matchup.movieVotes,
            "book"
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
        }}
      >
        <Image
          src={matchup.bookInfo.volumeInfo.imageLinks?.thumbnail}
          alt=""
          w="120px"
          h="180px"
          border="1px solid rgba(0,0,0,0.87)"
        />
      </Box>

      <Text fontSize="smaller" marginTop="0.2rem" fontWeight="bold" w="120px">
        {matchup.bookInfo.volumeInfo.title}
      </Text>
    </Box>
  );
};

export default Book;
