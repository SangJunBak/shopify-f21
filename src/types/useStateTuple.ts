import { Dispatch, SetStateAction } from "react";

export type useStateTuple<T> = [T, Dispatch<SetStateAction<T>>];
