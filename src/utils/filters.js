export const onSearchFilter = (tempFilteredList, searchQuery) => {
  const currentFilteredList = tempFilteredList.filter((matchup) => {
    return (
      matchup.bookInfo.volumeInfo.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      matchup.movieInfo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  return currentFilteredList;
};

export const onSortFilter = (tempFilteredList, sortBy) => {
  let currentFilteredList;
  if (sortBy === "popularity") {
    const sorted = [...tempFilteredList].sort(
      (a, b) => parseFloat(b.popularity) - parseFloat(a.popularity)
    );
    currentFilteredList = sorted;
  }
  if (sortBy === "numvotes") {
    const sorted = [...tempFilteredList].sort(
      (a, b) =>
        parseFloat(b.bookVotes + b.movieVotes) -
        parseFloat(a.bookVotes + a.movieVotes)
    );
    currentFilteredList = sorted;
  }
  return currentFilteredList;
};

export const onBetterFilter = (tempFilteredList, better) => {
  const currentFilteredList = tempFilteredList.filter((matchup) => {
    if (better === "all") {
      return matchup;
    }
    if (better === "book") {
      return matchup.bookVotes > matchup.movieVotes;
    }
    if (better === "movie") {
      return matchup.movieVotes > matchup.bookVotes;
    }
    if (better === "both") {
      return matchup.movieVotes === matchup.bookVotes;
    }
  });
  return currentFilteredList;
};

export const onVotedFilter = (tempFilteredList, voted) => {
  const currentFilteredList = tempFilteredList.filter((matchup) => {
    if (voted === "all") {
      return matchup;
    }
    if (voted === "voted") {
      return matchup.votedFor !== null;
    }
    if (voted === "not-voted") {
      return matchup.votedFor === null;
    }
  });
  return currentFilteredList;
};
