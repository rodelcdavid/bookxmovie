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
      };
    });

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
