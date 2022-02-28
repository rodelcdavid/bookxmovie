import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";

import React from "react";

const Book = ({ pair, userId, isVoting, handleVote, votePercentage }) => {
  return (
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
        isLoading={isVoting}
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
            color: pair.bookVotes >= pair.movieVotes ? "#00B8A9" : "#F6416C",
          }}
        >
          {votePercentage(pair.bookVotes, pair.movieVotes, "book")}%
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
  );
};

export default Book;
