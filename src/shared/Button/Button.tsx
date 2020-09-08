import { gray3, white } from "constants/colors";
import { HTMLProps } from "react";
import styled, {
  css,
  FlattenSimpleInterpolation,
} from "styled-components/macro";

type Size = "small" | "medium" | "large";

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
    padding: 0.3rem 0.75rem;
  `,

  large: css`
    font-size: 1rem;
    padding: 0.3rem 1rem;
  `,
};

export const Button = styled.button<ButtonProps>`
  ${({ size = "medium" }) => buttonSizes[size as Size]};

  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${white};
  font-weight: bold;
  outline: none;

  &:disabled {
    background-color: ${gray3};
    cursor: not-allowed;
  }
`;
