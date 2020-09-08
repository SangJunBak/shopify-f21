import { Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { barPaddingCSS } from "constants/mixins";
import { background, divider, surface, textColor } from "constants/theme";
import { BASE_PAGE_PADDING_REM, elevation1 } from "constants/variables";
import { useMenuActions, useMenuState } from "context/menu";
import { useNominationsState } from "context/nominations";
import React, { FC, useEffect, useRef } from "react";
import { CardZoom } from "shared/CardZoom/CardZoom";
import { FlexCenterHorizontally } from "shared/FlexCenterHorizontally/FlexCenterHorizontally";
import { MovieCard } from "shared/MovieCard/MovieCard";
import { Problem } from "shared/Problem/Problem";
import { Subtitle } from "shared/Subtitle/Subtitle";
import styled from "styled-components/macro";
import { Movie } from "types/movie";

type DrawerProps = {
  className?: string;
};

const StyledCardZoom = styled(CardZoom)``;

const Container = styled.div<DrawerProps>`
  border-top: 1px solid ${divider};
  box-shadow: ${elevation1};
  background-color: ${surface};
`;

const HeaderContainer = styled.div`
  display: flex;
  ${barPaddingCSS};
  justify-content: space-between;
  cursor: pointer;
  //color: ${textColor};
  align-items: center;
  padding: 0.5rem ${BASE_PAGE_PADDING_REM}rem;
`;
const HeaderIconContainer = styled.div`
  svg {
    font-size: 1rem;
  }
  display: flex;
`;

const CollapseWrapper = styled.div`
  background-color: ${background};
  padding: 1rem ${BASE_PAGE_PADDING_REM}rem;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  ${StyledCardZoom} {
    margin-right: 1rem;
  }
  ${StyledCardZoom}:last-child {
    padding-right: 2rem;
  }
`;

// TODO:
export const NominationsDrawer: FC<DrawerProps> = (props) => {
  const { className = "" } = props;

  const menuState = useMenuState();
  const { toggleMenu } = useMenuActions();
  const { nominations } = useNominationsState();

  const prevNominations = useRef<Movie[]>(nominations);
  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevNominations.current.length < nominations.length) {
      listContainerRef?.current?.scrollTo?.({
        left: listContainerRef!.current!.scrollWidth,
        behavior: "smooth",
      });
    }

    prevNominations.current = nominations;
  }, [nominations]);

  return (
    <Container className={className}>
      <Collapse in={menuState!.isMenuOpen}>
        <CollapseWrapper ref={listContainerRef}>
          {nominations.length <= 0 ? (
            <FlexCenterHorizontally>
              <Problem>You currently have no nominations!</Problem>
            </FlexCenterHorizontally>
          ) : (
            nominations.map((movie) => (
              <StyledCardZoom key={movie.id}>
                <MovieCard movie={movie} />
              </StyledCardZoom>
            ))
          )}
        </CollapseWrapper>
      </Collapse>
      <HeaderContainer onClick={toggleMenu}>
        <Subtitle>Nominations</Subtitle>
        <HeaderIconContainer>
          {menuState!.isMenuOpen ? (
            <ExpandLess onClick={toggleMenu} />
          ) : (
            <ExpandMore />
          )}
        </HeaderIconContainer>
      </HeaderContainer>
    </Container>
  );
};
