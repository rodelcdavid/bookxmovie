import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Selected = ({ selectedBook, selectedMovie, handleAddToShowdown }) => {
  const [bookVotes, setBookVotes] = useState(0);
  const [movieVotes, setMovieVotes] = useState(0);
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
        {selectedBook ? (
          <Box sx={{ width: "100px", textAlign: "center" }}>
            <Image
              src={selectedBook.volumeInfo.imageLinks?.thumbnail}
              alt=""
              boxSize="100%"
            />
            <Text>{selectedBook.volumeInfo.title}</Text>
          </Box>
        ) : (
          <Text>Please select a book.</Text>
        )}

        <Box sx={{ textAlign: "center" }}>
          <Heading>VS</Heading>
        </Box>

        {/* Movie */}
        {selectedMovie ? (
          <Box sx={{ width: "100px", textAlign: "center" }}>
            <Image
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
              alt=""
              boxSize="100%"
            />
            <Text>{selectedMovie.title}</Text>
          </Box>
        ) : (
          <Text>Please select a movie</Text>
        )}
      </Box>
      <Box>
        <FormControl>
          <FormLabel htmlFor="book-votes">Initial book votes:</FormLabel>
          <Input
            id="book-votes"
            type="number"
            value={bookVotes}
            onChange={(e) => setBookVotes(e.target.value)}
          />
          <FormLabel htmlFor="movie-votes">Initial movie votes:</FormLabel>
          <Input
            id="movie-votes"
            type="number"
            value={movieVotes}
            onChange={(e) => setMovieVotes(e.target.value)}
          />
        </FormControl>
      </Box>
      <Button
        onClick={() => handleAddToShowdown(bookVotes, movieVotes)}
        colorScheme="teal"
      >
        Add to Showdown
      </Button>

      {/*  */}
    </Box>
  );
};

export default Selected;
