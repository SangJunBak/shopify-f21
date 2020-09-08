import { Fade, Grow } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { gray5 } from "constants/colors";
import { useNominationsState } from "context/nominations";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components/macro";

type BannerProps = {};

const BannerContainer = styled.div`
  padding: 0.5rem 1rem;
  border: 1px solid #b7eb8f;
  background-color: #f6ffed;
  z-index: 1;
  position: fixed;
  left: 50%;
  top: 0.67rem;
  transform: translate(-50%, 0);
  border-radius: 8px;
  display: flex;
  align-items: center;
`;

const StyledCloseIcon = styled(Close)`
  margin-left: 0.2rem;
  cursor: pointer;
  color: ${gray5};
  && {
    font-size: 0.9rem;
  }
`;

export const Banner: FC<BannerProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const { isAtMaxCapacity } = useNominationsState();

  useEffect(() => {
    setVisible(isAtMaxCapacity);
  }, [isAtMaxCapacity]);

  return (
    <Fade in={visible}>
      <div>
        <BannerContainer>
          <span>You have selected 5 nominations</span>
          <StyledCloseIcon onClick={() => setVisible(false)} />
        </BannerContainer>
      </div>
    </Fade>
  );
};
