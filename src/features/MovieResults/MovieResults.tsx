import { useTheme, Zoom } from "@material-ui/core";
import { muiMediaQuery } from "constants/mixins";
import { MY_FAVOURITE_MOVIES } from "constants/myFavouriteMovies";
import { OMDB_SEARCH_QUERY } from "constants/queryKeys";
import { BASE_PAGE_PADDING_REM } from "constants/variables";
import { useMovieResults } from "context/movieResults";
import { paginationQueryFunction } from "hooks/useFetchMovies";
import React, { FC, useEffect, useState } from "react";
import { usePaginatedQuery, useQuery } from "react-query";
import { CardZoom } from "shared/CardZoom/CardZoom";
import { FlexCenterHorizontally } from "shared/FlexCenterHorizontally/FlexCenterHorizontally";
import { MovieCard } from "shared/MovieCard/MovieCard";
import { Problem } from "shared/Problem/Problem";
import styled, { css } from "styled-components/macro";
import { Movie } from "types/movie";

type MovieResultsProps = {
  className?: string;
};

const MovieResultsContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: minmax(0, 1fr);
  padding: ${BASE_PAGE_PADDING_REM}rem;

  ${({ theme }) =>
    muiMediaQuery(
      theme,
      "md",
      `${css`
        grid-template-columns: repeat(2, minmax(0, 1fr));
      `}`
    )};

  ${({ theme }) =>
    muiMediaQuery(
      theme,
      "xl",
      `${css`
        grid-template-columns: repeat(4, minmax(0, 1fr));
      `}`
    )};
`;

const MovieResults: FC<MovieResultsProps> = (props) => {
  const { className = "" } = props;
  const { searchValue, page } = useMovieResults();

  const { resolvedData, isLoading, error, isError } = usePaginatedQuery(
    [OMDB_SEARCH_QUERY, searchValue, page],
    paginationQueryFunction,
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  return (
    <MovieResultsContainer className={className}>
      {isLoading ? null : isError ? (
        <FlexCenterHorizontally>
          <Problem>{error?.Error}</Problem>
        </FlexCenterHorizontally>
      ) : (
        (resolvedData?.Search?.length >= 0
          ? resolvedData?.Search
          : MY_FAVOURITE_MOVIES
        )?.map?.((movie: Movie) => (
          <CardZoom key={movie.id}>
            <MovieCard movie={movie} />
          </CardZoom>
        ))
      )}
    </MovieResultsContainer>
  );
};

export default MovieResults;
