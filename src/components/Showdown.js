import React from "react";

const Showdown = ({ showdownPairList, setShowdownPairList }) => {
  const handleVoteBook = (index) => {
    const tempShowdownPairList = [...showdownPairList];
    tempShowdownPairList[index].bookVotes += 1;

    setShowdownPairList(tempShowdownPairList);
  };
  const handleVoteMovie = (index) => {
    const tempShowdownPairList = [...showdownPairList];
    tempShowdownPairList[index].movieVotes += 1;

    setShowdownPairList(tempShowdownPairList);
  };

  const votePercentage = (bookVotes, movieVotes, type) => {
    if (bookVotes + movieVotes !== 0) {
      if (type === "book") {
        const percentage = Math.round(
          (bookVotes / (bookVotes + movieVotes)) * 100
        );
        return percentage;
      } else {
        const percentage = Math.round(
          (movieVotes / (bookVotes + movieVotes)) * 100
        );
        return percentage;
      }
    } else {
      return 0;
    }
  };

  return (
    <div>
      <h2>Showdown</h2>
      {showdownPairList.length ? (
        showdownPairList.map((pair, index) => {
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
                onClick={() => handleVoteBook(index)}
              >
                <p>
                  {votePercentage(pair.bookVotes, pair.movieVotes, "book")}%
                </p>

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
                onClick={() => handleVoteMovie(index)}
              >
                <p>
                  {votePercentage(pair.bookVotes, pair.movieVotes, "movie")}%
                </p>
                <img
                  src={`https://image.tmdb.org/t/p/original/${pair.movieInfo.poster_path}`}
                  alt=""
                  width="100"
                />
                <p>{pair.movieInfo.title}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p>Nothing to show.</p>
      )}
    </div>
  );
};

export default Showdown;
