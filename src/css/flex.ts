import { css } from "styled-components/macro";

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const flexColumnReverse = css`
  display: flex;
  flex-direction: column;
`;

export const flexAuto = css`
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
`;

export const flexShrink = css`
  flex: 0 1 0;
  min-width: 0;
  min-height: 0;
`;
