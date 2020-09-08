import { elevation1 } from "constants/variables";
import React, { FC } from "react";
import styled, { css } from "styled-components/macro";

type CardProps = {
  className?: string;
  rounded?: boolean;
};

const CardContainer = styled.div<CardProps>`
  box-shadow: ${elevation1};

  ${({ rounded }) =>
    rounded
      ? css`
          border-radius: 0.25rem;
        `
      : css`
          border-radius: 0;
        `}
`;

export const Card: FC<CardProps> = (props) => {
  const { className = "", rounded = true } = props;
  return (
    <CardContainer className={className} rounded={rounded}>
      {props.children}
    </CardContainer>
  );
};
