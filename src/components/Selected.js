import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const Selected = ({ selectedBook, selectedMovie, handleAddToShowdown }) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      {/* <Heading textAlign="center">Selected</Heading> */}

      {/*  */}
      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Book */}
        {selectedBook && (
          <Box sx={{ width: "100px", textAlign: "center" }}>
            <Image
              src={selectedBook.volumeInfo.imageLinks?.thumbnail}
              alt=""
              boxSize="100%"
            />
            <Text>{selectedBook.volumeInfo.title}</Text>
          </Box>
        )}

        <Box sx={{ textAlign: "center" }}>
          <Heading>VS</Heading>
        </Box>

        {/* Movie */}
        {selectedMovie && (
          <Box sx={{ width: "100px", textAlign: "center" }}>
            <Image
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
              alt=""
              boxSize="100%"
            />
            <Text>{selectedMovie.title}</Text>
          </Box>
        )}
      </Box>
      <Button onClick={handleAddToShowdown} colorScheme="teal">
        Add to Showdown
      </Button>

      {/*  */}
    </Box>
  );
};

export default Selected;
