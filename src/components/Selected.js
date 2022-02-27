import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Selected = ({ selectedBook, selectedMovie, handleAddToShowdown }) => {
  const [bookVotes, setBookVotes] = useState(1);
  const [movieVotes, setMovieVotes] = useState(1);
  return (
    <Box sx={{ textAlign: "center" }}>
      {/* <Heading textAlign="center">Selected</Heading> */}

      {/*  */}
      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid rgba(0,0,0,0.87)",

          "@media (min-width:400px)": {
            flexDirection: "row",
            alignItems: "initial",
          },
        }}
      >
        {/* Book */}

        {selectedBook ? (
          <Box sx={{ width: "120px", textAlign: "center" }}>
            <Heading size="md">
              {((bookVotes / (bookVotes + movieVotes)) * 100).toFixed(2)}%
            </Heading>
            <Box width="120px">
              <Image
                src={selectedBook.volumeInfo.imageLinks?.thumbnail}
                alt=""
                boxSize="100%"
              />
            </Box>
            <Text fontWeight="bold">{selectedBook.volumeInfo.title}</Text>
          </Box>
        ) : (
          <Box
            border="1px solid rgba(0,0,0,0.87)"
            width="100px"
            height="150px"
            display="flex"
            alignItems="center"
          >
            Please select a book
          </Box>
        )}

        <Box sx={{ textAlign: "center", alignSelf: "center" }}>
          <Heading>VS</Heading>
        </Box>

        {/* Movie */}
        {selectedMovie ? (
          <Box sx={{ width: "120px", textAlign: "center" }}>
            <Heading size="md">
              {((movieVotes / (bookVotes + movieVotes)) * 100).toFixed(2)}%
            </Heading>
            <Box width="120px">
              <Image
                src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
                alt=""
                boxSize="100%"
              />
            </Box>
            <Text fontWeight="bold">{selectedMovie.title}</Text>
          </Box>
        ) : (
          <Box
            border="1px solid rgba(0,0,0,0.87)"
            width="100px"
            height="150px"
            display="flex"
            alignItems="center"
          >
            Please select a movie
          </Box>
        )}
      </Box>
      <Box marginTop="0.5rem" display="flex">
        <FormControl display="flex" flexDir="column" alignItems="center">
          <FormLabel htmlFor="book-votes">Initial book votes:</FormLabel>
          <NumberInput
            id="book-votes"
            size="md"
            maxW={24}
            min={0}
            value={bookVotes}
            onChange={(value) => setBookVotes(Number(value))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl display="flex" flexDir="column" alignItems="center">
          <FormLabel htmlFor="movie-votes">Initial movie votes:</FormLabel>
          <NumberInput
            id="movie-votes"
            size="md"
            maxW={24}
            min={0}
            value={movieVotes}
            onChange={(value) => setMovieVotes(Number(value))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Box>
      <Button
        onClick={() => handleAddToShowdown(bookVotes, movieVotes)}
        colorScheme="teal"
        marginTop="1rem"
        disabled={selectedBook && selectedMovie ? false : true}
      >
        Add to Showdown
      </Button>
    </Box>
  );
};

export default Selected;
