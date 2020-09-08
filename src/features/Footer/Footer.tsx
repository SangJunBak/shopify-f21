import { useMediaQuery, useTheme } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { gray2, white } from "constants/colors";
import React, { FC } from "react";
import styled from "styled-components/macro";

type FooterProps = {
  className?: string;
};

const FooterContainer = styled.footer`
  border-top: 1px solid ${gray2};
  background-color: ${white};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export const Footer: FC<FooterProps> = (props) => {
  const { className = "" } = props;
  const theme = useTheme();
  const isLargerThanMD = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <FooterContainer className={className}>
      <Pagination
        count={10}
        color="primary"
        size={isLargerThanMD ? "medium" : "small"}
      />
    </FooterContainer>
  );
};

export default Footer;
