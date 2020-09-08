import { flexCol } from "constants/mixins";
import { bodyBackground } from "constants/theme";
import { BASE_PAGE_PADDING_REM } from "constants/variables";
import { MenuProvider } from "context/menu";
import { MovieResultsProvider } from "context/movieResults";
import { NominationsProvider } from "context/nominations";
import { Banner } from "features/Banner/Banner";
import { Footer } from "features/Footer/Footer";
import MovieResults from "features/MovieResults/MovieResults";
import React from "react";
import { NominationsDrawer } from "features/NominationsDrawer/NominationsDrawer";
import { Header } from "features/Header/Header";
import styled from "styled-components/macro";

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
  flex: 1;
  overflow-y: auto;
`;

const StyledMovieResults = styled(MovieResults)``;

const StyledNominationsDrawer = styled(NominationsDrawer)`
  flex: 0 1 auto;
`;

function App() {
  return (
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
  );
}

export default App;
