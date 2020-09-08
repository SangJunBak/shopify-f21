import { Collapse } from "@material-ui/core";
import { bodyBackground } from "constants/theme";
import { gray2, initial, white } from "constants/colors";
import { barPaddingCSS } from "constants/mixins";
import { BASE_PAGE_PADDING_REM, elevation1 } from "constants/variables";
import { useNominationsState } from "context/nominations";
import React, { FC, useState } from "react";
import { CardZoom } from "shared/CardZoom/CardZoom";
import { FlexCenterHorizontally } from "shared/FlexCenterHorizontally/FlexCenterHorizontally";
import { MovieCard } from "shared/MovieCard/MovieCard";
import { Problem } from "shared/Problem/Problem";
import { Subtitle } from "shared/Subtitle/Subtitle";
import styled from "styled-components/macro";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import theme from "styled-theming";

type DrawerProps = {
  className?: string;
};

const StyledCardZoom = styled(CardZoom)``;

const textColor = theme("mode", {
  dark: white,
  light: initial,
});

const Container = styled.div<DrawerProps>`
  border-top: 1px solid ${gray2};
  box-shadow: ${elevation1};
  background-color: ${white};
`;

const HeaderContainer = styled.div`
  display: flex;
  ${barPaddingCSS};
  justify-content: space-between;
  cursor: pointer;
  color: ${textColor};
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
  background-color: ${bodyBackground};
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

export const NominationsDrawer: FC<DrawerProps> = (props) => {
  const { className = "" } = props;

  const [open, setOpen] = useState(false);
  const onCollapse = () => setOpen((prevOpen) => !prevOpen);
  const { nominations } = useNominationsState();

  return (
    <Container className={className}>
      <Collapse in={open}>
        <CollapseWrapper>
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
      <HeaderContainer onClick={onCollapse}>
        <Subtitle>Nominations</Subtitle>
        <HeaderIconContainer>
          {open ? <ExpandLess onClick={onCollapse} /> : <ExpandMore />}
        </HeaderIconContainer>
      </HeaderContainer>
    </Container>
  );
};
