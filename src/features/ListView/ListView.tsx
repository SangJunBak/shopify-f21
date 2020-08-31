import { makeStyles } from "@material-ui/core/styles";
import {
  Autocomplete as MaterialAutocomplete,
  AutocompleteRenderInputParams,
} from "@material-ui/lab";
import React, { FC, useRef } from "react";
import Input from "shared/Input/Input";
import RadioGroup from "shared/RadioGroup/RadioGroup";
import YearPicker from "shared/YearPicker/YearPicker";
import styled from "styled-components";

type ListViewProps = {};

const useStyles = makeStyles({
  paper: {
    fontSize: "0.8rem",
  },
});

const options = ["Option 1", "Option 2"];

type AutocompleteProps = {};

const Autocomplete: FC<AutocompleteProps> = (props) => {
  const classes = useStyles(props);
  return (
    <MaterialAutocomplete
      classes={classes}
      options={options}
      loading={true} // Text loading
      renderInput={(params: AutocompleteRenderInputParams) => (
        <div ref={params.InputProps.ref}>
          <Input
            style={{ fontSize: "0.8rem", width: "11rem" }}
            type="text"
            {...params.inputProps}
          />
        </div>
      )}
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
