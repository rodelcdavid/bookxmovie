import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMovie } from "../features/findSlice";

const FindMovie = () => {
  const movieApiKey = process.env.REACT_APP_MOVIE_API_KEY;
  const [inputMovie, setInputMovie] = useState("");

  const [movieResults, setMovieResults] = useState(null);
  const { selectedMovie } = useSelector((state) => state.findState);
  const dispatch = useDispatch();

  const handleSearchMovie = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${inputMovie}`
    )
      .then((res) => res.json())
      .then((data) => setMovieResults(data));
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box width="80%" margin="0 auto" display="flex" gap="5px">
        <Input type="search" onChange={(e) => setInputMovie(e.target.value)} />
        <Button onClick={handleSearchMovie} colorScheme="teal">
          Search
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        {movieResults &&
          movieResults.results.map((movie) => {
            return (
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "150px",
                  border: selectedMovie === movie ? "1px solid teal" : "none",
                  position: "relative",
                  overflow: "hidden",
                  "&::after": {
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
                  },
                }}
                key={movie.id}
                onClick={() => {
                  dispatch(setSelectedMovie(movie));
                }}
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
                <Text sx={{ textAlign: "center" }} fontWeight="bold">
                  {movie.title}
                </Text>
                <Text sx={{ textAlign: "center" }}>{movie.vote_count}</Text>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

export default FindMovie;
