import { Button, ChakraProvider } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import AppHeader from "./components/AppHeader";
import FindAndMatch from "./components/FindAndMatch";
import FindAndMatchDialog from "./components/FindAndMatchDialog";
import Showdown from "./components/Showdown";
import initialState from "./initialStateExample";
import theme from "./utils/theme";

function App() {
  // const [showdownPairList, setShowdownPairList] = useState(
  //   Array(10).fill(initialState)
  // );
  // const [showdownPairList, setShowdownPairList] = useState(initialState);
  const [showdownPairList, setShowdownPairList] = useState([]);

  //User votes
  const [userVotes, setUserVotes] = useState([
    { id: "f7b2c644-51d9-4ebe-a653-5991f5d8d6d5", votedFor: "book" },
    { id: "d5f0b0fa-400f-4393-a199-b1eef09fc320", votedFor: "movie" },
  ]);

  useEffect(async () => {
    // fetch("http://localhost:7000")
    //   .then((res) => res.json())
    //   .then(console.log);

    const res = await fetch("http://localhost:7000/matches");
    const data = await res.json();

    const renamedDataProps = data.map((match) => {
      return {
        id: match.id,
        bookInfo: match.book_info,
        movieInfo: match.movie_info,
        bookVotes: match.book_votes,
        movieVotes: match.movie_votes,
        popularity: match.popularity,
        votedFor: match.voted_for,
      };
    });

    //TODO: create user object that has info of votes, then combine to each match
    //Match and Combine
    //OR use JOINS in database, then fetch that data already combined

    setShowdownPairList(renamedDataProps);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <AppHeader />
      <Showdown
        showdownPairList={showdownPairList}
        setShowdownPairList={setShowdownPairList}
      />
      <FindAndMatchDialog setShowdownPairList={setShowdownPairList} />
    </ChakraProvider>
  );
}

export default App;
