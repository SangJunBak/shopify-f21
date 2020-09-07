import { flexWrap, muiMediaQuery } from "constants/mixins";
import { MY_FAVOURITE_MOVIES } from "constants/myFavouriteMovies";
import { BASE_PAGE_PADDING_REM } from "constants/variables";
import React, { FC } from "react";
import {
  MOVIE_CARD_MIN_WIDTH_REM,
  MovieCard,
} from "shared/MovieCard/MovieCard";
import { breakpoint } from "styled-components-breakpoint";
import styled, { css } from "styled-components/macro";

type MovieResultsProps = {
  className?: string;
};

const StyledMovieCard = styled(MovieCard)``;

const MovieResultsContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: minmax(0, 1fr);
  padding: ${BASE_PAGE_PADDING_REM}rem;

  ${({ theme }) =>
    muiMediaQuery(
      theme,
      "md",
      css`
        grid-template-columns: repeat(2, minmax(0, 1fr));
      `
    )};

  ${({ theme }) =>
    muiMediaQuery(
      theme,
      "lg",
      css`
        grid-template-columns: repeat(3, minmax(0, 1fr));
      `
    )};
`;

const MovieResults: FC<MovieResultsProps> = (props) => {
  const { className = "" } = props;

  return (
    <MovieResultsContainer className={className}>
      {MY_FAVOURITE_MOVIES.map((movie) => (
        <StyledMovieCard movie={movie} key={movie.id} />
      ))}
    </MovieResultsContainer>
  );
};

export default MovieResults;
