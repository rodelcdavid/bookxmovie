import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedBook } from "../features/findSlice";

const FindBook = () => {
  /* Local state */
  const [inputBook, setInputBook] = useState("");
  const [bookResults, setBookResults] = useState(null);
  /* Redux */
  const { selectedBook } = useSelector((state) => state.findState);
  const dispatch = useDispatch();

  /* Utils */
  const bookApiKey = process.env.REACT_APP_BOOK_API_KEY;

  /* Handlers */
  const handleSearchBook = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${inputBook}&key=${bookApiKey}&maxResults=40&printType=books`
    )
      .then((res) => res.json())
      .then((data) => {
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
    <Box textAlign="center">
      <Box width="80%" margin="0 auto" display="flex" gap="5px">
        <Input
          onChange={(e) => setInputBook(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchBook();
            }
          }}
          type="search"
          placeholder="Find a book"
        />
        <Button onClick={handleSearchBook} colorScheme="teal">
          Search
        </Button>
      </Box>

      {bookResults && (
        <Box
          display="flex"
          gap="20px"
          flexWrap="wrap"
          justifyContent="center"
          mt="1rem"
        >
          {bookResults.items.map((book) => {
            return (
              <Box
                onClick={() => dispatch(setSelectedBook(book))}
                cursor="pointer"
                display="flex"
                flexDir="column"
                alignItems="center"
                w="150px"
                border={selectedBook === book ? "1px solid teal" : "none"}
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
                  display: selectedBook === book ? "block" : "none",
                  top: "5px",
                  left: "-20px",
                }}
                key={book.id}
              >
                <Image
                  src={
                    book.volumeInfo.imageLinks
                      ? book.volumeInfo.imageLinks.thumbnail
                      : "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                  }
                  alt=""
                  width="150px"
                  height="200px"
                />
                <Text textAlign="center" fontWeight="bold">
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
