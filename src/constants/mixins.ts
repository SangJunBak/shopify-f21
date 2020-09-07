import { Theme } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { css, FlattenInterpolation } from "styled-components/macro";

export const barPaddingCSS = css`
  padding: 0.25rem 0.5rem;
`;

/* Flex */
export const flexCol = css`
  display: flex;
  flex-direction: column;
`;

export const flexWrap = css`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const muiMediaQuery = (
  theme: Theme,
  bp: Breakpoint,
  css: FlattenInterpolation<any>
) => `
  ${theme.breakpoints.up(bp)} {
    ${css}
  }
`;
