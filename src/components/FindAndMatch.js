import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addMatchAsync } from "../features/matchesSlice";
import { useAddMatchMutation } from "../services/matchesApi";
import FindBook from "./FindBook";
import FindMovie from "./FindMovie";
import Selected from "./Selected";
import { toastList } from "../utils/toastList";

const FindAndMatch = ({ setOpenDialog }) => {
  //use Promise.all to fetch all bookId
  //get book.selflink

  //use Promise.all to fetch all movieId
  //  const movieFetchUrl = `https://api.themoviedb.org/3/movie/671?api_key=fbdfc6969e8fbe78212c30a2dcc64f58&language=en-US`

  //Move this to server

  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const toast = useToast();

  const [addMatch] = useAddMatchMutation();

  const handleAddToShowdown = async (bookVotes, movieVotes) => {
    //What about for movies that have multiple parts??
    const id = uuidv4();
    const match = {
      id: id,
      bookInfo: selectedBook,
      movieInfo: selectedMovie,
      bookVotes: bookVotes,
      movieVotes: movieVotes,
      //TODO: what if undefined ratingsCount or vote count
      popularity:
        (selectedBook.volumeInfo.ratingsCount || 0) +
        (selectedMovie.vote_count || 0),
    };

    await addMatch(match);

    setOpenDialog(false);

    toast(toastList.addToast);
  };

  return (
    <>
      {/* <Heading>Find and Match</Heading> */}

      <Box sx={{ display: "flex", gap: "30px" }}>
        <Box
          sx={{
            width: "800px",
            height: "450px",
            border: "1px solid rgba(0,0,0,0.87)",
            overflow: "auto",
          }}
        >
          <Tabs isFitted variant="enclosed" colorScheme="green">
            <TabList>
              <Tab>Find Book</Tab>
              <Tab>Find Movie</Tab>
              <Tab>Selected</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <FindBook
                  setSelectedBook={setSelectedBook}
                  selectedBook={selectedBook}
                />
              </TabPanel>
              <TabPanel>
                <FindMovie
                  setSelectedMovie={setSelectedMovie}
                  selectedMovie={selectedMovie}
                />
              </TabPanel>
              <TabPanel>
                <Selected
                  selectedBook={selectedBook}
                  selectedMovie={selectedMovie}
                  handleAddToShowdown={handleAddToShowdown}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  );
};

export default FindAndMatch;
