import { createMuiTheme } from "@material-ui/core";
import { culturedGrey, blackPearl, gray2, white } from "constants/colors";
import { flexCol, flexWrap } from "constants/mixins";
import {
  accentColor,
  bodyBackground,
  initialTheme,
  primaryColor,
} from "constants/theme";
import { BASE_PAGE_PADDING_REM, elevation1 } from "constants/variables";
import ListView from "features/ListView/ListView";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import React, { useState } from "react";
import { ReactQueryDevtools } from "react-query-devtools";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/core/styles";
import { Card } from "shared/Card/Card";
import Drawer from "shared/Drawer/Drawer";
import { Header, topbarHeaderPadding } from "shared/Header/Header";
import { MovieCard } from "shared/MovieCard/MovieCard";
import styled, {
  css,
  ThemeProvider as SCThemeProvider,
} from "styled-components/macro";
import theme from "styled-theming";

const AppContainer = styled.div`
  ${flexCol};
  width: 100%;
  height: 100%;
  background-color: ${bodyBackground};
`;

// TODO: Make into separate layout component + hook
const StyledHeader = styled(Header)`
  flex: 0 0 auto;
`;

const BodyContainer = styled.div`
  ${flexWrap};
  flex: 1;
  padding: ${BASE_PAGE_PADDING_REM}rem;
`;

const TabsContainer = styled.div`
  border-top: 1px solid ${gray2};
  box-shadow: ${elevation1};
  min-height: 1rem;
  background-color: ${white};
`;

const StyledDrawer = styled(Drawer)`
  flex: 0 1 auto;
  //transition: all 0.3s;
  // flex-grow: ${({ open }) => (open ? 1 : 0)};
  // max-height: ${({ open }) => (open ? "none" : 0)};
  //flex-basis: 0;
  //min-height: 0;
  //overflow-y: hidden;
`;

const MobileBodyContainer = styled(BodyContainer)<{ drawerOpen?: boolean }>`
  flex: 1;
  flex-grow: ${({ drawerOpen }) => (drawerOpen ? "0" : 1)};
  min-height: 0;
  overflow-y: auto;
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
  const [open, setOpen] = useState(true);
  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <MaterialThemeProvider theme={materialTheme}>
          <SCThemeProvider theme={initialTheme}>
            {/*Desktop*/}
            <AppContainer>
              <StyledHeader title="Shoppies" />
              {/*<TabsContainer />*/}
              <StyledDrawer
                orientation={"bottom-up"}
                open={open}
                onCollapse={(open: boolean) => setOpen(!open)}
                title="Nominations"
              >
                <MovieCard />
              </StyledDrawer>
              <BodyContainer>{/*<ListView />*/}</BodyContainer>
            </AppContainer>
            {/*Mobile*/}
            {/*<AppContainer>
              <StyledHeader title="Shoppies"></StyledHeader>
              <MobileBodyContainer drawerOpen={open}>
                <ListView />
              </MobileBodyContainer>
              <StyledDrawer
                title="Nominations"
                open={open}
                onCollapse={(open: boolean) => setOpen(!open)}
              />
            </AppContainer>*/}
          </SCThemeProvider>
        </MaterialThemeProvider>
      </MuiPickersUtilsProvider>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
