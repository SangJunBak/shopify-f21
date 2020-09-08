import ConfusedSpongebobURL from "assets/images/confused_spongebob.png";
import React, { FC } from "react";
import styled from "styled-components/macro";

type ProblemProps = {
  className?: string;
  height?: string;
  expand?: boolean;
};

const ProblemContainer = styled.div<ProblemProps>`
  display: flex;
  max-width: 28rem;
  height: ${({ height }) => height};
  width: ${({ expand }) => (expand ? "100%" : "auto")};
`;

const Spongebob = styled.img.attrs({ src: ConfusedSpongebobURL })`
  flex: 0 0 auto;
  max-height: 100%;
  border-radius: 0.25rem 0 0 0.25rem;
`;

const Text = styled.h3`
  font-weight: 200;
  margin-block-start: 0.5rem;
`;

export const Problem: FC<ProblemProps> = ({
  className = "",
  height = "5rem",
  expand = false,
  children,
}) => {
  return (
    <ProblemContainer className={className} height={height} expand={expand}>
      <Text>{children}</Text>
      <Spongebob />
    </ProblemContainer>
  );
};
