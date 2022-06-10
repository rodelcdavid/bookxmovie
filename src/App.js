import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AppHeader from "./components/AppHeader";
import FindAndMatchModal from "./components/FindAndMatchModal";
import Showdown from "./components/Showdown";

function App() {
  const { user } = useSelector((state) => state.authState);

  useEffect(() => {
    // const prevUser = localStorage.getItem("user");
  }, []);

  return (
    <>
      <AppHeader />
      <Showdown />
      {user.id === 1 && <FindAndMatchModal />}
    </>
  );
}

export default App;
