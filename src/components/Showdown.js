import {
  Box,
  Button,
  Divider,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spinner,
  Text,
} from "@chakra-ui/react";

import { BiFilter, BiSort } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetMatchupsQuery } from "../services/matchupsApi";

import EditVoteModal from "./EditVoteModal";
import MatchupCard from "./MatchupCard";
import {
  onBetterFilter,
  onSearchFilter,
  onSortFilter,
  onVotedFilter,
} from "../utils/filters";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  setBetter,
  setSearch,
  setSortBy,
  setVoted,
} from "../features/filterSlice";

const Showdown = ({ setOpenAccessDialog }) => {
  const { user } = useSelector((state) => state.authState);
  const { id: userId } = user;

  // Edit Vote Modal
  const [selectedMatchup, setSelectedMatchup] = useState(null);
  const [openEditVoteModal, setOpenEditVoteModal] = useState(false);

  const { data: matchups, isLoading } = useGetMatchupsQuery(userId);

  /* Filters */
  const [inputSearch, setInputSearch] = useState("");
  const [filteredList, setFilteredList] = useState(null);

  // const [filters, setFilters] = useState({
  //   sortBy: null,
  //   search: "",
  //   better: null,
  //   voted: null,
  // });
  const { filters } = useSelector((state) => state.filterState);
  const dispatch = useDispatch();

  const applyFilters = () => {
    let tempFilteredList = matchups;

    /* Search Filter */
    if (filters.search.length) {
      tempFilteredList = onSearchFilter(tempFilteredList, filters.search);
    }

    /* Sort Filter */
    if (filters.sortBy) {
      tempFilteredList = onSortFilter(tempFilteredList, filters.sortBy);
    }

    /* Better Filter */
    if (filters.better) {
      tempFilteredList = onBetterFilter(tempFilteredList, filters.better);
    }

    /* Voted Filter */
    if (filters.voted) {
      tempFilteredList = onVotedFilter(tempFilteredList, filters.voted);
    }

    setFilteredList(tempFilteredList);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  /* Infinite Scroll */
  const [displayList, setDisplayList] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [visible, setVisible] = useState(8);
  const loadCount = 16;

  const fetchMoreData = () => {
    if (displayList.length >= filteredList.length) {
      setHasMore(false);
      return;
    }

    setDisplayList(filteredList.slice(0, visible + loadCount));
    setVisible((prev) => prev + loadCount);
  };

  useEffect(() => {
    if (matchups) {
      setFilteredList(matchups);
    }
  }, [matchups]);

  useEffect(() => {
    if (filteredList) {
      setDisplayList(filteredList.slice(0, visible));
      setVisible(
        filteredList.length > loadCount ? loadCount : filteredList.length
      );
    }
  }, [filteredList]);

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
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // setFilters({ ...filters, search: inputSearch });
              dispatch(setSearch({ search: inputSearch }));
            }
          }}
        />
        <Button
          onClick={() => dispatch(setSearch({ search: inputSearch }))}
          colorScheme="teal"
        >
          Search
        </Button>
      </Box>
      <Divider margin="1rem auto" borderColor="rgba(0,0,0,0.87)" />
      {!isLoading && userId !== "guest" && (
        <Box
          display="flex"
          gap="10px"
          justifyContent="center"
          marginRight="1rem"
          sx={{
            "@media (min-width:960px)": {
              justifyContent: "flex-end",
            },
          }}
        >
          <Menu>
            <MenuButton
              as={IconButton}
              leftIcon={<BiSort />}
              padding="0 0.5rem"
              backgroundColor="white"
            >
              Sort
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                type="radio"
                value={filters.sortBy || "popularity"}
                onChange={(value) => dispatch(setSortBy({ sortBy: value }))}
              >
                <MenuItemOption value="popularity">Popularity</MenuItemOption>
                <MenuItemOption value="numvotes">
                  Number of votes
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>

          <Menu closeOnSelect={false}>
            <MenuButton
              as={IconButton}
              leftIcon={<BiFilter />}
              padding="0 0.5rem"
              backgroundColor="white"
            >
              Filter
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                title="Which was better"
                type="radio"
                value={filters.better || "all"}
                onChange={(value) => dispatch(setBetter({ better: value }))}
              >
                <MenuItemOption value="all">Show all</MenuItemOption>
                <MenuItemOption value="book">Book was better</MenuItemOption>
                <MenuItemOption value="movie">Movie was better</MenuItemOption>
                <MenuItemOption value="both">Both were great</MenuItemOption>
              </MenuOptionGroup>
              <MenuOptionGroup
                title="Voted"
                type="radio"
                value={filters.voted || "all"}
                onChange={(value) => dispatch(setVoted({ voted: value }))}
              >
                <MenuItemOption value="all">Show all</MenuItemOption>
                <MenuItemOption value="voted">Already voted</MenuItemOption>
                <MenuItemOption value="not-voted">Not yet voted</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Box>
      )}

      {isLoading ? (
        <Box textAlign="center">
          <Spinner />
        </Box>
      ) : (
        displayList && (
          <>
            <InfiniteScroll
              dataLength={displayList.length}
              next={fetchMoreData}
              hasMore={hasMore}
              style={{
                justifyItems: "center",
                display: "grid",
                gridTemplateColumns: "repeat( auto-fit, minmax(320px, 1fr) )",
                rowGap: "1rem",
                padding: "1rem 0",
              }}
            >
              {displayList.map((matchup, index) => {
                return (
                  <MatchupCard
                    key={matchup.id}
                    matchup={matchup}
                    userId={userId}
                    setOpenAccessDialog={setOpenAccessDialog}
                    setOpenEditVoteModal={setOpenEditVoteModal}
                    setSelectedMatchup={setSelectedMatchup}
                  />
                );
              })}
            </InfiniteScroll>
            {!filteredList.length && (
              <Text fontStyle="italic" textAlign="center">
                Nothing to show.
              </Text>
            )}
          </>
        )
      )}
      <EditVoteModal
        openEditVoteModal={openEditVoteModal}
        setOpenEditVoteModal={setOpenEditVoteModal}
        selectedMatchup={selectedMatchup}
      />
    </Box>
  );
};

export default Showdown;
