import React from "react";
import {} from "@material-ui/core";
import { ReactQueryDevtools } from "react-query-devtools";
import Autocomplete from "shared/Autocomplete/Autocomplete";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">Shoppies</header>
        <Autocomplete />
      </div>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}

export default App;
