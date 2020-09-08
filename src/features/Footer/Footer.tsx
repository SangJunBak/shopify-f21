import { CircularProgress, useMediaQuery, useTheme } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { divider, surface } from "constants/theme";
import { NUM_RESULTS_PER_PAGE } from "constants/variables";
import { useMovieResults } from "context/movieResults";
import React, { FC } from "react";
import styled from "styled-components/macro";

type FooterProps = {
  className?: string;
};

const FooterContainer = styled.footer`
  border-top: 1px solid ${divider};
  background-color: ${surface};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const calculateCount = (current: number = 1, total: number = 0) =>
  Math.ceil(total / current);

export const Footer: FC<FooterProps> = (props) => {
  const { className = "" } = props;
  const theme = useTheme();
  const isLargerThanMD = useMediaQuery(theme.breakpoints.up("md"));
  const {
    page,
    setPage,
    query: { resolvedData, isLoading },
  } = useMovieResults();

  const isNoResults = (resolvedData?.totalResults?.length ?? 0) <= 0;
  return (
    <FooterContainer className={className}>
      <Pagination
        page={page}
        onChange={(_, newPage) => setPage!(newPage)}
        count={calculateCount(
          NUM_RESULTS_PER_PAGE,
          parseFloat(resolvedData?.totalResults)
        )}
        color="primary"
        size={isLargerThanMD ? "medium" : "small"}
        disabled={isNoResults}
      />
      {isLoading && <CircularProgress size="0.75rem" />}
    </FooterContainer>
  );
};
