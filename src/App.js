import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AppHeader from "./components/AppHeader";
import FindAndMatchDialog from "./components/FindAndMatchDialog";
import Showdown from "./components/Showdown";

function App() {
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
