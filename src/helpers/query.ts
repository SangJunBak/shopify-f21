import { getMovies } from "helpers/api";

export const paginationQueryFunction = (
  key: string,
  s: string,
  page?: number
) => {
  if (s.length <= 0) {
    return;
  }

  return getMovies({
    s: s.trim(), // Make the payload more searchable
    page,
  });
};
