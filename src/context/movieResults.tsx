import { OMDB_SEARCH_QUERY } from "constants/queryKeys";
import { DEFAULT_QUERY_STALE_TIME } from "constants/variables";
import { paginationQueryFunction } from "helpers/query";
import React, { createContext, useContext, useState } from "react";
import { usePaginatedQuery } from "react-query";
import { useStateTuple } from "types/useStateTuple";

type MovieResultsProviderProps = { children: React.ReactNode };

const SearchValueContext = createContext<useStateTuple<string> | null>(null);
const PageContext = createContext<useStateTuple<number> | null>(null);

const MovieResultsProvider = (props: MovieResultsProviderProps) => {
  const searchValueTuple = useState("");
  const pageTuple = useState(1);

  return (
    <SearchValueContext.Provider value={searchValueTuple}>
      <PageContext.Provider value={pageTuple}>
        {props.children}
      </PageContext.Provider>
    </SearchValueContext.Provider>
  );
};

const useMovieResults = () => {
  const [searchValue, setSearchValue] = useContext(SearchValueContext) || [];
  const [page, setPage] = useContext(PageContext) || [];
  if (searchValue === undefined || page === undefined) {
    throw new Error(
      "useMovieResults must be used within a MovieResultsProvider"
    );
  }

  const query = usePaginatedQuery(
    [OMDB_SEARCH_QUERY, searchValue, page],
    paginationQueryFunction,
    {
      staleTime: DEFAULT_QUERY_STALE_TIME,
    }
  );

  return {
    searchValue,
    page,
    setSearchValue,
    setPage,
    query,
  };
};

export { MovieResultsProvider, useMovieResults };
