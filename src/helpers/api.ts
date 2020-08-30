import axios from "axios";
import { getOMDBKey } from "helpers/env";
import { SearchRequestPayload } from "types/apiPayload";

const httpClient = axios.create({
  params: {
    apikey: getOMDBKey(),
  },
  baseURL: "http://www.omdbapi.com/",
});

export async function getMovies(payload: SearchRequestPayload) {
  try {
    const { data } = await httpClient.get("", {
      params: payload,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
