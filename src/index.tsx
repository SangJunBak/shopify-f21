import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/styles";
import { initialTheme } from "constants/theme";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ReactQueryDevtools } from "react-query-devtools";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const materialTheme = createMuiTheme({
  typography: {
    // fontSize: 12,
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

const theme = {
  ...materialTheme,
  mode: "light",
};

ReactDOM.render(
  <MaterialThemeProvider theme={theme}>
    <SCThemeProvider theme={theme}>
      <App />
      <ReactQueryDevtools />
    </SCThemeProvider>
  </MaterialThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
