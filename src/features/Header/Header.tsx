import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";
import {
  Autocomplete as MaterialAutocomplete,
  AutocompleteRenderInputParams,
} from "@material-ui/lab";
import { gray2, gray3, white } from "constants/colors";
import { barPaddingCSS } from "constants/mixins";
import { OMDB_SEARCH_QUERY } from "constants/queryKeys";
import { getMovies } from "helpers/api";
import { paginationQueryFunction } from "hooks/useFetchMovies";
import React, { FC, useState } from "react";
import { useQuery } from "react-query";
import { Card } from "shared/Card/Card";
import { Input } from "shared/Input/Input";
import styled, { css } from "styled-components/macro";
import theme from "styled-theming";
import { Movie } from "types/movie";
import { debounce } from "lodash";

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
  ${topbarHeaderPadding};
  background-color: ${topbarColor};
  justify-content: space-between;
  align-items: center;
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

  top: 6px;
  left: 6px;
`;

type DefaultOption = {
  id: string;
  title: string;
};

type Option = DefaultOption | Movie;

type AutocompleteProps = {};

// TODO: Alert if < 3 search results
const Autocomplete: FC<AutocompleteProps> = (props) => {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setCurrentSearchText] = useState<string>("");
  const [page, setPage] = useState(1);

  // TODO: Error states
  const { data, isLoading, isError } = useQuery(
    [OMDB_SEARCH_QUERY, searchText, page],
    paginationQueryFunction,
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  const handleInputChange = debounce(
    (_, value: string) => {
      setCurrentSearchText(value);
      setOpen(value.length > 0);
    },
    500,
    { leading: true }
  );

  const defaultOption: DefaultOption = {
    id: "default",
    title: `View all results with ${searchText.trim()}`,
  };

  const options: Option[] = [defaultOption, ...(data?.Search ?? [])];

  return (
    <AutocompleteContainer isFocused={isFocused}>
      <MaterialAutocomplete
        classes={classes}
        options={options}
        open={open}
        onOpen={() => setOpen(searchText.length > 0)}
        onClose={() => setOpen(false)}
        loading={isLoading} // Text loading
        getOptionSelected={(option: Option, value: Option) =>
          option.id === value.id
        }
        getOptionLabel={(option: Option) => option.title}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <InputContainer ref={params.InputProps.ref}>
            <StyledSearchIcon width="0.75rem" />
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
            />
            <StyledCircularProgress size="0.75rem" />
          </InputContainer>
        )}
        onInputChange={handleInputChange}
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
