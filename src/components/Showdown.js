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
import React, { useEffect, useRef, useState } from "react";
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
import {
  setBetter,
  setSearch,
  setSortBy,
  setVoted,
} from "../features/filterSlice";

const Showdown = () => {
  /* Local state */
  const [inputSearch, setInputSearch] = useState("");
  const [filteredList, setFilteredList] = useState(null);

  /* Redux */
  const { user } = useSelector((state) => state.authState);
  const { id: userId } = user;
  const { data: matchups, isLoading } = useGetMatchupsQuery(userId);
  const { filters } = useSelector((state) => state.filterState);
  const dispatch = useDispatch();

  const applyFilters = useRef(() => {});
  applyFilters.current = () => {
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

  /* Useeffects */
  useEffect(() => {
    applyFilters.current();
  }, [filters]);

  useEffect(() => {
    if (matchups) {
      setFilteredList(matchups);
      applyFilters.current();
    }
  }, [matchups]);

  return (
    <Box bgColor="#F8F3D4" padding="1rem 0" minH="calc(100vh - 72px)">
      <Box textAlign="center" color="rgba(0,0,0,0.87)" padding="0 0.5rem">
        <Heading size="md">
          Browse for books and movies and see which one people think was better.
        </Heading>
      </Box>
      <Box
        w="30%"
        minW="300px"
        margin="0 auto"
        display="flex"
        gap="5px"
        mt="1rem"
      >
        <Input
          onChange={(e) => setInputSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // setFilters({ ...filters, search: inputSearch });
              dispatch(setSearch({ search: inputSearch }));
            }
          }}
          type="search"
          placeholder="Search for book or movie"
          value={inputSearch}
          bgColor="#fff"
        />
        <Button
          onClick={() => dispatch(setSearch({ search: inputSearch }))}
          colorScheme="teal"
        >
          Search
        </Button>
      </Box>
      <Divider margin="1rem auto" borderColor="teal" />
      {!isLoading && userId !== "guest" && (
        <Box display="flex" gap="10px" justifyContent="center">
          <Menu>
            <MenuButton
              as={IconButton}
              leftIcon={<BiSort />}
              padding="0 0.5rem"
              backgroundColor="white"
            >
              Sort
            </MenuButton>
            <MenuList zIndex="999">
              <MenuOptionGroup
                onChange={(value) => dispatch(setSortBy({ sortBy: value }))}
                type="radio"
                value={filters.sortBy || "popularity"}
                zIndex="999"
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
            <MenuList zIndex="999">
              <MenuOptionGroup
                onChange={(value) => dispatch(setBetter({ better: value }))}
                title="Which was better"
                type="radio"
                value={filters.better || "all"}
              >
                <MenuItemOption value="all">Show all</MenuItemOption>
                <MenuItemOption value="book">Book was better</MenuItemOption>
                <MenuItemOption value="movie">Movie was better</MenuItemOption>
                <MenuItemOption value="both">Both were great</MenuItemOption>
              </MenuOptionGroup>
              <MenuOptionGroup
                onChange={(value) => dispatch(setVoted({ voted: value }))}
                title="Voted"
                type="radio"
                value={filters.voted || "all"}
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
        // displayList or filteredlist
        filteredList && (
          <>
            {/* Infinite Scroll or Box ? */}
            <Box
              justifyItems="center"
              display="grid"
              gridTemplateColumns="repeat( auto-fit, minmax(320px, 1fr) )"
              rowGap="5rem"
              columnGap="1.5rem"
              padding="1rem 0"
            >
              {/* displayList if InfiniteScroll, filteredList if Box */}
              {filteredList.map((matchup, index) => {
                return (
                  <MatchupCard
                    key={matchup.id}
                    matchup={matchup}
                    userId={userId}
                  />
                );
              })}
            </Box>
            {!filteredList.length && (
              <Text fontStyle="italic" textAlign="center">
                Nothing to show.
              </Text>
            )}
          </>
        )
      )}
      <EditVoteModal />
    </Box>
  );
};

export default Showdown;
