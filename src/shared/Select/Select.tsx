import { MenuItem, Select as MaterialSelect } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, useRef } from "react";
import { ListChildComponentProps, VariableSizeList } from "react-window";

const useSelectStyles = makeStyles({
  input: {
    borderRadius: 4,
    position: "relative",
    // backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      //   borderColor: theme.palette.primary.main,
    },
  },
});

function generateMovieYearsList() {
  const YEAR_WHEN_MOVIES_WERE_MADE = 1893;
  const movieList = [];
  for (
    let i = new Date().getFullYear();
    i >= YEAR_WHEN_MOVIES_WERE_MADE;
    i -= 1
  ) {
    movieList.push(i);
  }
  return movieList;
}

const yearOptions = generateMovieYearsList();

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;
  const value = yearOptions[index];
  return (
    <MenuItem value={value} style={style}>
      {value}
    </MenuItem>
  );
}

const Select: FC = (props) => {
  const listContainerRef = useRef<HTMLDivElement>(null);
  return (
    <MaterialSelect
      defaultValue="All"
      input={<InputBase />}
      style={{ width: 200 }}
    >
      <MenuItem value={"All"}>All</MenuItem>
      <VariableSizeList
        height={400}
        width="100%"
        itemSize={(index) => 100}
        itemCount={yearOptions.length}
      >
        {renderRow}
      </VariableSizeList>
    </MaterialSelect>
  );
};
