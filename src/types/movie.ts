import { type } from "types/apiPayload";

export type Movie = {
  title: string;
  year: string;
  id: string;
  type: type;
  poster: string;
};
