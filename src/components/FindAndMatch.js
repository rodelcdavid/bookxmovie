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
import FindBook from "./FindBook";
import FindMovie from "./FindMovie";
import Selected from "./Selected";
import { useDispatch, useSelector } from "react-redux";

const FindAndMatch = () => {
  //use Promise.all to fetch all bookId
  //get book.selflink

  //use Promise.all to fetch all movieId
  //  const movieFetchUrl = `https://api.themoviedb.org/3/movie/671?api_key=fbdfc6969e8fbe78212c30a2dcc64f58&language=en-US`

  //Move this to server

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
                <Selected />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  );
};

export default FindAndMatch;
