import { Button, ChakraProvider } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "./components/AppHeader";
import FindAndMatch from "./components/FindAndMatch";
import FindAndMatchDialog from "./components/FindAndMatchDialog";
import Showdown from "./components/Showdown";
import { getMatchesListAsync } from "./features/matchesSlice";
import initialState from "./initialStateExample";

function App() {
  const userId = "6721";
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

  const dispatch = useDispatch();

  useEffect(async () => {
    // fetch("http://localhost:7000")
    //   .then((res) => res.json())
    //   .then(console.log);
    dispatch(getMatchesListAsync({ userId }));

    // const res = await fetch("http://localhost:7000/matches");
    // const data = await res.json();

    // const renamedDataProps = data.map((match) => {
    //   return {
    //     id: match.id,
    //     bookInfo: match.book_info,
    //     movieInfo: match.movie_info,
    //     bookVotes: match.book_votes,
    //     movieVotes: match.movie_votes,
    //     popularity: match.popularity,
    //     votedFor: match.voted_for,
    //   };
    // });

    // //TODO: create user object that has info of votes, then combine to each match
    // //Match and Combine
    // //OR use JOINS in database, then fetch that data already combined

    // setShowdownPairList(renamedDataProps);
  }, []);

  const { matchesList } = useSelector((state) => state.matchesState);

  return (
    <>
      <AppHeader />
      <Showdown
        showdownPairList={matchesList}
        setShowdownPairList={setShowdownPairList}
      />
      <FindAndMatchDialog setShowdownPairList={setShowdownPairList} />
    </>
  );
}

export default App;
