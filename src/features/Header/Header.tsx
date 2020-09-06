import { gray2, white } from "constants/colors";
import { barPaddingCSS } from "constants/mixins";
import React, { FC } from "react";
import { Card } from "shared/Card/Card";
import styled, { css } from "styled-components/macro";
import theme from "styled-theming";

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
`;

const Title = styled.h1`
  font-weight: 500;
`;

export const Header: FC<HeaderProps> = (props) => {
  const { className = "" } = props;
  return (
    <StyledCard rounded={false} className={className}>
      <Title>Shoppies</Title>
    </StyledCard>
  );
};
