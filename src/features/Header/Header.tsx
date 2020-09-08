import { Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { gray5, white } from "constants/colors";
import { muiMediaQuery } from "constants/mixins";
import { OMDB_SEARCH_QUERY } from "constants/queryKeys";
import { DEFAULT_QUERY_STALE_TIME } from "constants/variables";
import { useMovieResults } from "context/movieResults";
import { useTheme } from "context/theme";
import { Autocomplete } from "./Autocomplete";
import { paginationQueryFunction } from "helpers/query";
import React, { FC, useState } from "react";
import { useQuery } from "react-query";
import { Card } from "shared/Card/Card";
import { Input } from "shared/Input/Input";
import styled, { css } from "styled-components/macro";
import theme from "styled-theming";
import { Movie } from "types/movie";

type HeaderProps = {
  className?: string;
};

const topbarColor = theme("mode", {
  light: white,
});

export const topbarHeaderPadding = css`
  padding: 0 2rem;
`;

const StyledCard = styled(Card)`
  display: flex;
  padding: 2rem 0;
  background-color: ${topbarColor};
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  ${({ theme }) =>
    muiMediaQuery(
      theme,
      "md",
      `${css`
        flex-direction: row;
      `} ${topbarHeaderPadding}`
    )};
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 500;
`;

const useStyles = makeStyles({
  root: {
    marginTop: "0.5rem",
    marginLeft: "0.5rem",
  },
});

export const Header: FC<HeaderProps> = (props) => {
  const { className = "" } = props;
  const { isDarkMode, toggleDarkMode } = useTheme();
  const classes = useStyles();
  return (
    <StyledCard rounded={false} className={className}>
      <LeftContainer>
        <Title>Shoppies</Title>
        <Switch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          color="primary"
          name="darkModeSwitch"
          inputProps={{ "aria-label": "primary checkbox" }}
          classes={classes}
        />
      </LeftContainer>
      <Autocomplete />
    </StyledCard>
  );
};
