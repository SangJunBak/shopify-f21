import React, { FC } from "react";
import styled, { css } from "styled-components";

type CardProps = {
  className?: string;
  rounded?: boolean;
  variant?: "elevation" | "outlined";
  elevation?: 2 | 4;
};

const elevationToCSS = (elevation: number) => {
  switch (elevation) {
    case 2:
      return css`
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
          0px 2px 2px 0px rgba(0, 0, 0, 0.14),
          0px 3px 1px -2px rgba(0, 0, 0, 0.12);
      `;
    case 4:
      return css`
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
          0px 4px 5px 0px rgba(0, 0, 0, 0.14),
          0px 1px 10px 0px rgba(0, 0, 0, 0.12);
      `;
  }
};

const CardContainer = styled.div<CardProps>`
  ${({ elevation }) => elevationToCSS(elevation as number)}

  ${({ variant }) =>
    variant === "outlined" &&
    css`
      box-shadow: none;
      border: 1px solid rgba(0, 0, 0, 0.12);
    `}
  
  ${({ rounded, theme }) =>
    rounded
      ? css`
          border-radius: ${theme.spacing(0.5)};
        `
      : css`
          border-radius: 0;
        `}
`;

export const Card: FC<CardProps> = (props) => {
  const {
    className = "",
    rounded = true,
    elevation = 2,
    variant = "elevation",
  } = props;
  return (
    <CardContainer
      className={className}
      elevation={elevation}
      rounded={rounded}
      variant={variant}
    >
      {props.children}
    </CardContainer>
  );
};
