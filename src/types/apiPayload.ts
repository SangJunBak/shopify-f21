export type type = "movie" | "series";
export type plot = "short" | "full";

export type SearchByIDOrTitlePayload = {
  // Id or Title both can't be undefined
  i?: string; //id
  t: string; // Title
};

export type SearchRequestPayload = {
  s: string; // Search string
  page?: number;
};

export type apiData = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type SearchResponsePayload = {
  Search?: apiData[];
  totalResults?: string;
  Response: string;
  Error?: string;
};
