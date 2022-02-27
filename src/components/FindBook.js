import { Box, Button, Heading, Image, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const FindBook = ({ setSelectedBook, selectedBook }) => {
  const bookApiKey = process.env.REACT_APP_BOOK_API_KEY;

  const [inputBook, setInputBook] = useState("");
  const [bookResults, setBookResults] = useState(null);

  //TODO:sort by popularity
  const handleSearchBook = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${inputBook}&key=${bookApiKey}&maxResults=40&printType=books`
    )
      .then((res) => res.json())
      .then((data) => {
        // setBookResults(data);
        const sorted = data.items.sort(
          (a, b) =>
            parseFloat(b.volumeInfo.ratingsCount) -
            parseFloat(a.volumeInfo.ratingsCount)
        );
        data.items = sorted;

        setBookResults(data);
      });
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box width="80%" margin="0 auto" display="flex" gap="5px">
        <Input type="search" onChange={(e) => setInputBook(e.target.value)} />
        <Button onClick={handleSearchBook} colorScheme="teal">
          Search
        </Button>
      </Box>

      {bookResults && (
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          {bookResults.items.map((book) => {
            return (
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "150px",
                  border: selectedBook === book ? "1px solid teal" : "none",
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
                    display: selectedBook === book ? "block" : "none",
                    top: "5px",
                    left: "-20px",
                  },
                }}
                key={book.id}
                onClick={() => setSelectedBook(book)}
              >
                <Image
                  src={
                    book.volumeInfo.imageLinks
                      ? book.volumeInfo.imageLinks.thumbnail
                      : "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                  }
                  alt=""
                  htmlWidth="100%"
                />
                <Text sx={{ textAlign: "center" }} fontWeight="bold">
                  {book.volumeInfo.title}
                </Text>
                <Text>{book.volumeInfo.ratingsCount || 0}</Text>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default FindBook;
