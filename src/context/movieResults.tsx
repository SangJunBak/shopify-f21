import React, {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

type MovieResultsProviderProps = { children: React.ReactNode };
type useStateTuple<T> = [T, Dispatch<SetStateAction<T>>];

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
  return {
    searchValue,
    page,
    setSearchValue,
    setPage,
  };
};

export { MovieResultsProvider, useMovieResults };
