import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMovie } from "../features/findSlice";

const FindMovie = () => {
  /* Local State */
  const [movieResults, setMovieResults] = useState(null);
  const [inputMovie, setInputMovie] = useState("");

  /* Redux */
  const { selectedMovie } = useSelector((state) => state.findState);
  const dispatch = useDispatch();

  /* Utils */
  const movieApiKey = process.env.REACT_APP_MOVIE_API_KEY;

  /* Handlers */
  const handleSearchMovie = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${inputMovie}`
    )
      .then((res) => res.json())
      .then((data) => setMovieResults(data));
  };

  return (
    <Box textAlign="center">
      <Box width="80%" margin="0 auto" display="flex" gap="5px">
        <Input
          onChange={(e) => setInputMovie(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchMovie();
            }
          }}
          type="search"
          placeholder="Find a movie"
        />
        <Button onClick={handleSearchMovie} colorScheme="teal">
          Search
        </Button>
      </Box>
      <Box
        display="flex"
        gap="20px"
        flexWrap="wrap"
        justifyContent="center"
        marginTop="1rem"
      >
        {movieResults &&
          movieResults.results.map((movie) => {
            return (
              <Box
                onClick={() => {
                  dispatch(setSelectedMovie(movie));
                }}
                cursor="pointer"
                display="flex"
                flexDir="column"
                alignItems="center"
                w="150px"
                border={selectedMovie === movie ? "1px solid teal" : "none"}
                pos="relative"
                overflow="hidden"
                _after={{
                  content: `"selected"`,
                  position: "absolute",
                  backgroundColor: "teal",
                  color: "#fff",
                  transform: "rotate(-45deg)",
                  fontSize: "0.8rem",
                  padding: "0.3rem 1rem",
                  borderRadius: "5px",
                  display: selectedMovie === movie ? "block" : "none",
                  top: "5px",
                  left: "-20px",
                }}
                key={movie.id}
              >
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                      : "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                  }
                  alt=""
                  width="150px"
                  height="200px"
                />
                <Text textAlign="center" fontWeight="bold">
                  {movie.title}
                </Text>
                <Text textAlign="center">{movie.vote_count}</Text>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

export default FindMovie;
