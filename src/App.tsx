import { createMuiTheme } from "@material-ui/core";
import { initialTheme } from "constants/theme";
import ListView from "features/ListView/ListView";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import React, { useState } from "react";
import { ReactQueryDevtools } from "react-query-devtools";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/core/styles";
import { Card } from "shared/Card/Card";
import Drawer from "shared/Drawer/Drawer";
import styled, { ThemeProvider as SCThemeProvider } from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const AppBarContainer = styled.div`
  flex: 0 0 auto;
`;

const BodyContainer = styled.div<{ drawerOpen?: boolean }>`
  flex: 1;
  flex-grow: ${({ drawerOpen }) => (drawerOpen ? 0 : 1)};
  min-height: 0;
  overflow-y: auto;
  transition: flex 0.3s;
`;

const StyledDrawer = styled(Drawer)`
  flex: 0 1 auto;
  flex-grow: ${({ open }) => (open ? 1 : 0)};
  transition: flex 0.3s;
`;

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

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <MaterialThemeProvider theme={materialTheme}>
          <SCThemeProvider theme={initialTheme}>
            <AppContainer>
              <AppBarContainer>
                <header className="App-header">Shoppies</header>
              </AppBarContainer>
              <BodyContainer drawerOpen={open}>
                <Card>
                  <ListView />
                </Card>
              </BodyContainer>
              <StyledDrawer
                title="Nominations"
                open={open}
                onCollapse={(open: boolean) => setOpen(!open)}
              />
            </AppContainer>
          </SCThemeProvider>
        </MaterialThemeProvider>
      </MuiPickersUtilsProvider>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
