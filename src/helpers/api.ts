import axios from "axios";
import { getOMDBKey } from "helpers/env";
import {
  apiData,
  SearchRequestPayload,
  SearchResponsePayload,
} from "types/apiPayload";

const httpClient = axios.create({
  params: {
    apikey: getOMDBKey(),
    type: "movie",
  },
  baseURL: "http://www.omdbapi.com/",
});

export const isError = (response: SearchResponsePayload) => {
  return response?.Response === "False";
};

export const getErrorMessage = (response: SearchResponsePayload) =>
  response?.Error ?? "";

export async function getMovies(payload: SearchRequestPayload) {
  try {
    const { data } = await httpClient.get("", {
      params: payload,
    });
    //TODO: Validate data
    const { Search, ...rest } = data;
    const cleansedSearchResults = Search?.map(
      ({ Title, Year, imdbID, Type, Poster }: apiData) => ({
        title: Title,
        year: Year,
        id: imdbID,
        type: Type,
        poster: Poster,
      })
    );

    return {
      ...rest,
      Search: cleansedSearchResults,
    };
  } catch (error) {
    console.log(error);
  }
}
