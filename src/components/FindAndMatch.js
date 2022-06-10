import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAddMatchupMutation } from "../services/matchupsApi";
import FindBook from "./FindBook";
import FindMovie from "./FindMovie";
import Selected from "./Selected";
import { toastList } from "../utils/toastList";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from "../features/findSlice";

const FindAndMatch = () => {
  //use Promise.all to fetch all bookId
  //get book.selflink

  //use Promise.all to fetch all movieId
  //  const movieFetchUrl = `https://api.themoviedb.org/3/movie/671?api_key=fbdfc6969e8fbe78212c30a2dcc64f58&language=en-US`

  //Move this to server

  const { selectedBook, selectedMovie } = useSelector(
    (state) => state.findState
  );

  const toast = useToast();

  const dispatch = useDispatch();

  const [addMatchup] = useAddMatchupMutation();

  const handleAddToShowdown = async (bookVotes, movieVotes) => {
    //What about for movies that have multiple parts??
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

    dispatch(setOpenModal(false));

    toast(toastList.addToast);
  };

  return (
    <>
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
                <FindBook />
              </TabPanel>
              <TabPanel>
                <FindMovie />
              </TabPanel>
              <TabPanel>
                <Selected handleAddToShowdown={handleAddToShowdown} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  );
};

export default FindAndMatch;
