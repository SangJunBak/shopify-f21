import { OMDB_PAGINATION_QUERY, OMDB_SEARCH_QUERY } from "constants/queryKeys";
import { getMovies } from "helpers/api";
import { usePaginatedQuery, useQuery } from "react-query";
import { SearchRequestPayload, type } from "types/apiPayload";

function searchQueryFunction(key: string, s: string, y?: number, type?: type) {
  return getMovies({
    s,
    y,
    type,
  });
}

function paginationQueryFunction(
  key: string,
  s: string,
  y?: number,
  type?: type,
  page?: number
) {
  return getMovies({
    s,
    y,
    type,
    page,
  });
}

export const useFetchMovies = (payload: SearchRequestPayload) => {
  const { s, y, page, type } = payload;

  const searchQuery = useQuery(
    [OMDB_SEARCH_QUERY, s, y, type],
    searchQueryFunction
  );

  const {
    isLoading,
    isError,
    error,
    resolvedData,
    latestData,
    isFetching,
  } = usePaginatedQuery([OMDB_PAGINATION_QUERY, page], paginationQueryFunction);
};
