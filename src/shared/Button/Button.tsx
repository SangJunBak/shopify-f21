import React, { HTMLProps } from "react";
import styled, {
  BaseThemedCssFunction,
  css,
  CSSProperties,
  DefaultTheme,
  FlattenSimpleInterpolation,
  ThemedCssFunction,
} from "styled-components/macro";

type Size = "small" | "medium" | "large";

// TODO: Create a primary and secondary button prop
type ButtonProps = Omit<HTMLProps<HTMLButtonElement>, "size"> & {
  size?: Size;
};

const buttonSizes: Record<Size, FlattenSimpleInterpolation> = {
  small: css`
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  `,

  medium: css`
    font-size: 0.8rem;
    padding: 0.25rem 0.75rem;
  `,

  large: css`
    font-size: 1rem;
    padding: 0.25rem 1rem;
  `,
};

export const Button = styled.button<ButtonProps>`
  ${({ size = "medium" }) => buttonSizes[size as Size]};
`;
