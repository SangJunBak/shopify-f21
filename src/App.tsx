import { createMuiTheme } from "@material-ui/core";
import { culturedGrey, blackPearl, gray2, white } from "constants/colors";
import { flexCol, flexWrap } from "constants/mixins";
import { bodyBackground, initialTheme } from "constants/theme";
import { BASE_PAGE_PADDING_REM } from "constants/variables";
import ListView from "features/ListView/ListView";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import React, { useState } from "react";
import { ReactQueryDevtools } from "react-query-devtools";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/core/styles";
import Drawer from "shared/Drawer/Drawer";
import { FlexCenterHorizontally } from "shared/FlexCenterHorizontally/FlexCenterHorizontally";
import { Header } from "shared/Header/Header";
import { MovieCard } from "shared/MovieCard/MovieCard";
import { Problem } from "shared/Problem/Problem";
import styled, {
  ThemeProvider as SCThemeProvider,
} from "styled-components/macro";

const AppContainer = styled.div`
  ${flexCol};
  width: 100%;
  height: 100%;
  background-color: ${bodyBackground};
`;

const StyledHeader = styled(Header)`
  flex: 0 0 auto;
`;

const BodyContainer = styled.div`
  ${flexWrap};
  flex: 1;
  padding: ${BASE_PAGE_PADDING_REM}rem;
`;

const StyledDrawer = styled(Drawer)`
  flex: 0 1 auto;
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
                {/*<MovieCard />*/}
                <FlexCenterHorizontally>
                  <Problem>You currently have no nominations!</Problem>
                </FlexCenterHorizontally>
              </StyledDrawer>
              <BodyContainer>
                {/*<ListView />*/}
                {/*<FlexCenterHorizontally>*/}
                {/*  <Problem message="Sorry, seems like no results were found..." />*/}
                {/*</FlexCenterHorizontally>*/}
              </BodyContainer>
            </AppContainer>
          </SCThemeProvider>
        </MaterialThemeProvider>
      </MuiPickersUtilsProvider>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
