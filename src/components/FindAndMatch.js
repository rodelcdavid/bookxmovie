import React, { useEffect, useState } from "react";

const FindAndMatch = () => {
  const bookApiKey = "AIzaSyCLSRspHMHw3eFivj1CJHzTksCULHUtMRg";
  const movieApiKey = "k_vz1az5ol";

  const [inputBook, setInputBook] = useState("");
  const [inputMovie, setInputMovie] = useState("");

  const [bookResults, setBookResults] = useState(null);
  const [movieResults, setMovieResults] = useState(null);

  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearchBook = () => {
    //fetch book search api
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${inputBook}&key=${bookApiKey}`
    )
      .then((res) => res.json())
      .then((data) => setBookResults(data));
    //then setResults
  };

  const handleSearchMovie = () => {
    //fetch movie search api
    fetch(
      `https://imdb-api.com/en/API/SearchMovie/${movieApiKey}/${inputMovie}`
    )
      .then((res) => res.json())
      .then((data) => setMovieResults(data));
    //then setResults
  };

  //   useEffect(() => {}, [bookResults]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Find and Match</h2>
      <div
        style={{
          width: "100%",
          height: "500px",
          border: "1px solid #000",
          overflow: "auto",
        }}
      >
        {/*Find Books  */}
        <h3>Find Book</h3>
        <input type="search" onChange={(e) => setInputBook(e.target.value)} />
        <button onClick={handleSearchBook}>Search</button>
        <div>Book results</div>
        <div style={{ display: "flex", gap: "20px" }}>
          {bookResults &&
            bookResults.items.map((book) => {
              return (
                <div>
                  <img src={book.volumeInfo.imageLinks.thumbnail} alt="" />
                  <h2>{book.volumeInfo.title}</h2>
                </div>
              );
            })}
        </div>
        {/* Find Movies */}
        <h3>Find Movie</h3>
        <input type="search" onChange={(e) => setInputMovie(e.target.value)} />
        <button onClick={handleSearchMovie}>Search</button>
        <div>Movie results</div>
        <div style={{ display: "flex", gap: "20px" }}>
          {movieResults &&
            movieResults.results.map((movie) => {
              return (
                <div>
                  <img src={movie.image} alt="" width="100px" height="auto" />
                  <h2>{movie.title}</h2>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FindAndMatch;
