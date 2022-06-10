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
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useAddMatchupMutation } from "../services/matchupsApi";
import { toastList } from "../utils/toastList";
import { setOpenModal } from "../features/findSlice";

const Selected = () => {
  const { selectedBook, selectedMovie } = useSelector(
    (state) => state.findState
  );
  const [bookVotes, setBookVotes] = useState(1);
  const [movieVotes, setMovieVotes] = useState(1);

  const [addMatchup, { isLoading }] = useAddMatchupMutation();
  const toast = useToast();
  const dispatch = useDispatch();

  const handleAddToShowdown = async (bookVotes, movieVotes) => {
    const id = uuidv4();
    const matchup = {
      id: id,
      bookInfo: selectedBook,
      movieInfo: selectedMovie,
      bookVotes: bookVotes,
      movieVotes: movieVotes,
      popularity:
        (selectedBook.volumeInfo.ratingsCount || 0) +
        (selectedMovie.vote_count || 0),
    };
    await addMatchup(matchup);
    toast(toastList.addToast);
    setTimeout(() => {
      dispatch(setOpenModal(false));
    }, 200);
  };

  return (
    <Box sx={{ textAlign: "center" }}>
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
          <Box
            sx={{
              width: "120px",
              textAlign: "center",
            }}
          >
            <Heading size="md">
              {((bookVotes / (bookVotes + movieVotes)) * 100).toFixed(2)}%
            </Heading>
            <Box width="120px">
              <Image
                src={selectedBook.volumeInfo.imageLinks?.thumbnail}
                alt=""
                width="120px"
                height="180px"
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
                width="120px"
                height="180px"
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
        isLoading={isLoading}
      >
        Add to Showdown
      </Button>
    </Box>
  );
};

export default Selected;
