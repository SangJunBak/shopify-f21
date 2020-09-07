import { OMDB_PAGINATION_QUERY, OMDB_SEARCH_QUERY } from "constants/queryKeys";
import { getMovies } from "helpers/api";
import { usePaginatedQuery, useQuery } from "react-query";
import { SearchRequestPayload, type } from "types/apiPayload";

export const paginationQueryFunction = (
  key: string,
  s: string,
  page?: number
) => {
  if (s.length < 3) {
    return;
  }

  return getMovies({
    s: s.trim(), // Make the payload more searchable
    page,
  });
};
