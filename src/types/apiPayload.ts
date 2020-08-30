export type type = "movie" | "series";
export type plot = "short" | "full";
export type r = "json" | "xml";

export type SearchByIDOrTitlePayload = {
  // Id or Title both can't be undefined
  i?: string; //id
  t: string; // Title
  y?: number; // Year
  type?: type;
  plot?: plot;
  r?: r;
  callback?: string;
};

export type SearchRequestPayload = {
  s: string; // Search string
  y?: number; // Year
  type?: type;
  r?: r;
  page?: number;
  callback?: string;
};
