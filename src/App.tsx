import { createMuiTheme } from "@material-ui/core";
import ListView from "features/ListView/ListView";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import React from "react";
import { ReactQueryDevtools } from "react-query-devtools";
import { ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Roboto"',
      '"Oxygen"',
      '"Ubuntu"',
      '"Cantarell"',
      '"Fira Sans"',
      '"Droid Sans"',
      '"Helvetica Neue"',
      "sans-serif",
    ].join(","),
  },
});

function App() {
  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <header className="App-header">Shoppies</header>
            <ListView />
          </div>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
