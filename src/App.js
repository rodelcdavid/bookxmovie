import { Button, ChakraProvider } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "./components/AppHeader";
import FindAndMatch from "./components/FindAndMatch";
import FindAndMatchDialog from "./components/FindAndMatchDialog";
import Showdown from "./components/Showdown";
import { getMatchesListAsync } from "./features/matchesSlice";
import initialState from "./initialStateExample";
import { useGetMatchesListQuery } from "./services/matchesApi";

function App() {
  const userId = "1234";

  return (
    <>
      <AppHeader />
      <Showdown />
      <FindAndMatchDialog />
    </>
  );
}

export default App;
