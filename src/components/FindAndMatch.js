import React, { useEffect, useState } from "react";

const FindAndMatch = () => {
  // const showdownPairList = [];

  const [showdownPairList, setShowdownPairList] = useState([]);

  //use Promise.all to fetch all bookId
  //get book.selflink

  //use Promise.all to fetch all movieId
  //  const movieFetchUrl = `https://api.themoviedb.org/3/movie/671?api_key=fbdfc6969e8fbe78212c30a2dcc64f58&language=en-US`

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
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${inputBook}&key=${bookApiKey}`
    )
      .then((res) => res.json())
      .then((data) => setBookResults(data));
  };

  const handleSearchMovie = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${inputMovie}`
    )
      .then((res) => res.json())
      .then((data) => setMovieResults(data));
  };

  const handleAddToShowdown = () => {
    //What about for movies that have multiple parts??

    const newPair = {
      id: showdownPairList.length + 1,
      bookInfo: selectedBook,
      movieInfo: selectedMovie,
      bookVotes: 0,
      movieVotes: 0,
    };

    setShowdownPairList((prev) => [...prev, newPair]);
  };

  const handleVoteForBook = (pairId) => {
    //update bookVotes where id = pairId
  };
  const handleVoteForMovie = (pairId) => {
    //update bookVotes where id = pairId
  };

  useEffect(() => {
    console.log(showdownPairList);
  }, [showdownPairList]);

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
                  onClick={() => setSelectedBook(book)}
                >
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail}
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
                  onClick={() => setSelectedMovie(movie)}
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
        <p>Book: {selectedBook ? selectedBook.volumeInfo.title : ""}</p>
        <p>Movie: {selectedMovie ? selectedMovie.title : ""}</p>
        <button onClick={handleAddToShowdown}>Add to Showdown</button>
      </div>

      {/* required data: pairId, bookInfo, movieInfo, bookVotes, movieVotes */}
      <div>Temporary Showdown Display</div>
      {showdownPairList.length &&
        showdownPairList.map((pair) => {
          return (
            <div
              style={{
                padding: "1rem",
                border: "1px solid #aaa",
                width: "800px",
                display: "flex",
                gap: "30px",
                justifyContent: "center",
                alignItems: "center",
              }}
              key={pair.id}
            >
              {/* Book */}
              <div
                style={{ width: "200px", textAlign: "center" }}
                onClick={() => handleVoteForBook(pair.id)}
              >
                <img
                  src={pair.bookInfo.volumeInfo.imageLinks?.thumbnail}
                  alt=""
                  width="100"
                />
                <p>{pair.bookInfo.volumeInfo.title}</p>
              </div>

              <h3>VS</h3>

              {/* Movie */}
              <div
                style={{ width: "200px", textAlign: "center" }}
                onClick={() => handleVoteForMovie(pair.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original/${pair.movieInfo.poster_path}`}
                  alt=""
                  width="100"
                />
                <p>{pair.movieInfo.title}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default FindAndMatch;
