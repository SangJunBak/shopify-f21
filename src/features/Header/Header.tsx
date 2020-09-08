import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";
import {
  Autocomplete as MaterialAutocomplete,
  AutocompleteRenderInputParams,
} from "@material-ui/lab";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { gray5, white } from "constants/colors";
import { muiMediaQuery } from "constants/mixins";
import { OMDB_SEARCH_QUERY } from "constants/queryKeys";
import { DEFAULT_QUERY_STALE_TIME } from "constants/variables";
import { useMovieResults } from "context/movieResults";
import { paginationQueryFunction } from "helpers/query";
import React, { FC, useState } from "react";
import { useQuery } from "react-query";
import { Card } from "shared/Card/Card";
import { Input } from "shared/Input/Input";
import styled, { css } from "styled-components/macro";
import theme from "styled-theming";
import { Movie } from "types/movie";

type HeaderProps = {
  className?: string;
};

const topbarColor = theme("mode", {
  light: white,
});

export const topbarHeaderPadding = css`
  padding: 0 2rem;
`;

const StyledCard = styled(Card)`
  display: flex;
  padding: 2rem 0;
  background-color: ${topbarColor};
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  ${({ theme }) =>
    muiMediaQuery(
      theme,
      "md",
      `${css`
        flex-direction: row;
      `} ${topbarHeaderPadding}`
    )};
`;

const Title = styled.h1`
  font-weight: 500;
`;

const useStyles = makeStyles({
  root: {
    flex: 1,
  },
});

const AutocompleteContainer = styled.div<{ isFocused: boolean }>`
  display: flex;
  transition: flex 0.6s;
  margin-left: 2rem;
  flex: ${({ isFocused }) => (isFocused ? 1 : 0)};
`;

const InputContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
`;

const StyledInput = styled(Input)`
  flex: 1;
`;

const StyledCircularProgress = styled(CircularProgress)`
  top: 12px;
  right: 12px;
  position: absolute;
`;

const StyledSearchIcon = styled(Search)`
  position: absolute;
  color: ${gray5};
  top: 6px;
  left: 6px;
`;

type DefaultOption = {
  id: string;
  title: string;
};

type Option = DefaultOption | Movie;

type AutocompleteProps = {};

const Autocomplete: FC<AutocompleteProps> = (props) => {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [currentSearchText, setCurrentSearchText] = useState<string>("");
  const { setSearchValue } = useMovieResults();

  const { data, isLoading } = useQuery(
    [OMDB_SEARCH_QUERY, currentSearchText, 1],
    paginationQueryFunction,
    {
      staleTime: DEFAULT_QUERY_STALE_TIME,
    }
  );

  const handleInputChange = (_: any, value: string) => {
    setOpen(value.length > 0);
    setCurrentSearchText(value);
  };

  const defaultOption: DefaultOption = {
    id: "default",
    // title: `View all results with ${currentSearchText.trim()}`,
    title: currentSearchText,
  };

  const options: Option[] = [defaultOption, ...(data?.Search ?? [])];

  return (
    <AutocompleteContainer isFocused={isFocused}>
      <MaterialAutocomplete
        classes={classes}
        options={options}
        open={open}
        onClose={() => setOpen(false)}
        loading={isLoading} // Text loading
        getOptionSelected={(option: Option, value: Option) =>
          option.id === value.id
        }
        getOptionLabel={(option: Option) => option.title}
        filterOptions={(options, state) =>
          options.filter((option) => {
            return (
              option.id === "default" ||
              option.title
                .toUpperCase()
                .includes(state.inputValue.toUpperCase())
            );
          })
        }
        renderOption={(option, { inputValue }) => {
          const matches = match(option.title, inputValue);
          const parts = parse(option.title, matches);

          if (option.id === "default") {
            parts.unshift({ text: "View all results with ", highlight: false });
          }

          return (
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          );
        }}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <InputContainer ref={params.InputProps.ref}>
            <StyledSearchIcon style={{ width: "1rem" }} />
            <StyledInput
              {...params.inputProps}
              onFocus={(...eventParams) => {
                // @ts-ignore: Even if it doesn't exist, this shouldn't fail
                params?.inputProps?.onFocus?.(...eventParams);
                setIsFocused(true);
              }}
              onBlur={(...eventParams) => {
                // @ts-ignore: Even if it doesn't exist, this shouldn't fail
                params?.inputProps?.onBlur?.(...eventParams);
                setIsFocused(false);
              }}
              placeholder="Search..."
            />
            {isLoading && <StyledCircularProgress size="0.75rem" />}
          </InputContainer>
        )}
        onInputChange={handleInputChange}
        onChange={(_, v) => setSearchValue?.(v?.title ?? "")}
        autoHighlight
        fullWidth
      />
    </AutocompleteContainer>
  );
};

export const Header: FC<HeaderProps> = (props) => {
  const { className = "" } = props;
  return (
    <StyledCard rounded={false} className={className}>
      <Title>Shoppies</Title>
      <Autocomplete />
    </StyledCard>
  );
};
