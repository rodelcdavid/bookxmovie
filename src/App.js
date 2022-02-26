import { Button, ChakraProvider } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "./components/AppHeader";
import FindAndMatch from "./components/FindAndMatch";
import FindAndMatchDialog from "./components/FindAndMatchDialog";
import Showdown from "./components/Showdown";
import { getMatchesListAsync } from "./features/matchesSlice";
import initialState from "./initialStateExample";
import { useSignUpMutation } from "./services/authApi";
import { useGetMatchesListQuery } from "./services/matchesApi";

function App() {
  // const userId = "1234";

  const { user } = useSelector((state) => state.authState);
  const [openAccessDialog, setOpenAccessDialog] = useState(false);

  useEffect(() => {
    // const prevUser = localStorage.getItem("user");
  }, []);

  return (
    <>
      <AppHeader
        openAccessDialog={openAccessDialog}
        setOpenAccessDialog={setOpenAccessDialog}
      />
      <Showdown setOpenAccessDialog={setOpenAccessDialog} />
      {user.id === 2 && <FindAndMatchDialog />}
    </>
  );
}

export default App;
