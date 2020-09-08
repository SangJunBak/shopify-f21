import { createMuiTheme, useMediaQuery } from "@material-ui/core";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/styles";
import { darkModePrimary, persianGreen } from "constants/colors";
import { flexCol } from "constants/mixins";
import { background } from "constants/theme";
import { MenuProvider } from "context/menu";
import { MovieResultsProvider } from "context/movieResults";
import { NominationsProvider } from "context/nominations";
import { ThemeProvider } from "context/theme";
import { Banner } from "features/Banner/Banner";
import { Footer } from "features/Footer/Footer";
import MovieResults from "features/MovieResults/MovieResults";
import { GlobalStyle } from "GlobalStyle";
import React from "react";
import { NominationsDrawer } from "features/NominationsDrawer/NominationsDrawer";
import { Header } from "features/Header";
import styled from "styled-components/macro";

const AppContainer = styled.div`
  ${flexCol};
  width: 100%;
  height: 100%;
  background-color: ${background};
`;

const StyledHeader = styled(Header)`
  flex: 0 0 auto;
`;

const BodyContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const StyledMovieResults = styled(MovieResults)``;

const StyledNominationsDrawer = styled(NominationsDrawer)`
  flex: 0 1 auto;
`;

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <MovieResultsProvider>
        <AppContainer>
          <StyledHeader />
          <NominationsProvider>
            <Banner />
            <MenuProvider>
              <StyledNominationsDrawer />
              <BodyContainer>
                <StyledMovieResults />
              </BodyContainer>
            </MenuProvider>
          </NominationsProvider>
          <Footer />
        </AppContainer>
      </MovieResultsProvider>
      {/*<ReactQueryDevtools />*/}
    </ThemeProvider>
  );
}

export default App;
