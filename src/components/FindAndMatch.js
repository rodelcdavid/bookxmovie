import React, { useEffect, useState } from "react";

const FindAndMatch = () => {
  const bookApiKey = "AIzaSyCLSRspHMHw3eFivj1CJHzTksCULHUtMRg";
  //   const movieApiKey = "k_vz1az5ol";
  const movieApiKey = "fbdfc6969e8fbe78212c30a2dcc64f58";

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
      `https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${inputMovie}`
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
                <div
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "200px",
                  }}
                  key={book.id}
                  onClick={() => setSelectedBook(book.volumeInfo.title)}
                >
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt=""
                    width="100"
                  />
                  <p style={{ textAlign: "center" }}>{book.volumeInfo.title}</p>
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
                <div
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "200px",
                  }}
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie.title)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt=""
                    width="100"
                  />
                  <p style={{ textAlign: "center" }}>{movie.title}</p>
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <h3>Selected</h3>
        <p>Book: {selectedBook ? selectedBook : ""}</p>
        <p>Movie: {selectedMovie ? selectedMovie : ""}</p>
        <button>Add to Showdown</button>
      </div>
    </div>
  );
};

export default FindAndMatch;
