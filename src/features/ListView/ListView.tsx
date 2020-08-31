import { makeStyles } from "@material-ui/core/styles";
import {
  Autocomplete as MaterialAutocomplete,
  AutocompleteRenderInputParams,
} from "@material-ui/lab";
import { OMDB_SEARCH_QUERY } from "constants/queryKeys";
import { getMovies } from "helpers/api";
import React, { FC, useRef, useState } from "react";
import { useQuery } from "react-query";
import Input from "shared/Input/Input";
import RadioGroup from "shared/RadioGroup/RadioGroup";
import YearPicker from "shared/YearPicker/YearPicker";
import styled from "styled-components";
import { Movie } from "types/movie";
import { type } from "types/apiPayload";

type ListViewProps = {};

const useStyles = makeStyles({
  paper: {
    fontSize: "0.8rem",
  },
});

const options = ["Option 1", "Option 2"];

type AutocompleteProps = {};

function searchQueryFunction(
  key: string,
  s: string | null,
  y?: number,
  type?: type
) {
  // TODO: DAMP this up
  if (s === null || s.length < 3) {
    return;
  }

  return getMovies({
    s,
    y,
    type,
  });
}

// TODO: Alert if < 3 search results
// Search button
const Autocomplete: FC<AutocompleteProps> = (props) => {
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<Movie[]>([]);
  const [searchText, setCurrentSearchText] = useState<string | null>(null);
  // TODO: Hook these up
  const YEAR = undefined;
  const TYPE = undefined;

  // TODO: Error states
  const { data, isLoading, isError } = useQuery(
    [OMDB_SEARCH_QUERY, searchText, YEAR, TYPE],
    searchQueryFunction
  );

  console.log(data);

  return (
    <MaterialAutocomplete
      classes={classes}
      options={data?.Search || []}
      loading={isLoading} // Text loading
      getOptionSelected={(option: Movie, value: Movie) =>
        option.id === value.id
      }
      getOptionLabel={(option: Movie) => option.title}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <div ref={params.InputProps.ref}>
          <Input
            style={{ fontSize: "0.8rem", width: "11rem" }}
            type="text"
            {...params.inputProps}
          />
        </div>
      )}
      onInputChange={(_, value) => {
        setCurrentSearchText(value);
      }}
    />
  );
};

const SearchContainer = styled.div`
  display: flex;
`;

const Search: FC = (props) => {
  return (
    <SearchContainer>
      <Autocomplete />
      <YearPicker />
      <RadioGroup />
    </SearchContainer>
  );
};

const ListView: FC<ListViewProps> = (props) => {
  return <Search />;
};

export default ListView;
