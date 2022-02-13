import { useState } from "react";
import FindAndMatch from "./components/FindAndMatch";
import Showdown from "./components/Showdown";
import initialState from "./initialStateExample";

function App() {
  const [showdownPairList, setShowdownPairList] = useState(initialState);

  return (
    <>
      <FindAndMatch setShowdownPairList={setShowdownPairList} />
      <Showdown
        showdownPairList={showdownPairList}
        setShowdownPairList={setShowdownPairList}
      />
    </>
  );
}

export default App;
