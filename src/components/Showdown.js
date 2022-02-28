import {
  Box,
  Button,
  Divider,
  Heading,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useGetMatchesListQuery } from "../services/matchesApi";

import EditVoteDialog from "./EditVoteDialog";
import MatchupCard from "./MatchupCard";

const Showdown = ({ setOpenAccessDialog }) => {
  const { user } = useSelector((state) => state.authState);
  const { id: userId } = user;

  // Modal
  const [selectedMatchup, setSelectedMatchup] = useState(null);
  const [openEditVoteDialog, setOpenEditVoteDialog] = useState(false);

  const {
    data: matchesList,
    isFetching,
    isLoading,
  } = useGetMatchesListQuery(userId);

  const [searchQuery, setSearchQuery] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [filteredList, setFilteredList] = useState(matchesList);

  const handleSearch = () => {
    setSearchQuery(inputSearch);
  };

  useEffect(() => {
    if (matchesList) {
      const tempFilteredList = matchesList.filter((pair) => {
        return (
          pair.bookInfo.volumeInfo.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          pair.movieInfo.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredList(tempFilteredList);
    }
  }, [searchQuery, matchesList]);

  return (
    <Box
      sx={{
        backgroundColor: "#F8F3D4",
        padding: "1rem 0",
        minHeight: "calc(100vh - 72px)",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          color: "rgba(0,0,0,0.87)",
          padding: "0.5rem",
        }}
      >
        <Heading size="md">
          Browse for books and movies and see which one people think was better.
        </Heading>
      </Box>
      <Box
        sx={{
          width: "30%",
          minWidth: "300px",
          margin: "0 auto",
          display: "flex",
          gap: "5px",
          marginTop: "1rem",
        }}
      >
        <Input
          type="search"
          placeholder="Search for book or movie"
          sx={{ backgroundColor: "#fff" }}
          onChange={(e) => setInputSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button onClick={handleSearch} colorScheme="teal">
          Search
        </Button>
      </Box>
      <Divider margin="1rem auto" borderColor="rgba(0,0,0,0.87)" />

      {isLoading ? (
        <Box textAlign="center">
          <Spinner />
        </Box>
      ) : (
        filteredList && (
          <Box
            sx={{
              justifyItems: "center",
              display: "grid",
              gridTemplateColumns: "repeat( auto-fit, minmax(320px, 1fr) )",
              rowGap: "1rem",
              marginTop: "1rem",
            }}
          >
            {filteredList.map((pair, index) => {
              return (
                <MatchupCard
                  key={pair.id}
                  pair={pair}
                  userId={userId}
                  setOpenAccessDialog={setOpenAccessDialog}
                  setOpenEditVoteDialog={setOpenEditVoteDialog}
                  setSelectedMatchup={setSelectedMatchup}
                />
              );
            })}
            {!filteredList.length && (
              <Text fontStyle="italic">No results found.</Text>
            )}
          </Box>
        )
      )}
      <EditVoteDialog
        openEditVoteDialog={openEditVoteDialog}
        setOpenEditVoteDialog={setOpenEditVoteDialog}
        selectedMatchup={selectedMatchup}
      />
    </Box>
  );
};

export default Showdown;
