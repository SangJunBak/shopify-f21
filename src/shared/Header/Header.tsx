import React, { FC } from 'react';
import styled from "styled-components";

type HeaderProps = {
    leftChildren?: React.ReactNode,
    rightChildren?: React.ReactNode,
};

const Container = styled.div`
  display: flex;
`;

const LeftChildren = styled.div`
  
`;

const RightChildren = styled.div`
  
`;

const Header: FC<HeaderProps> = (props) => {

  return (
      <Container>
          <LeftChildren>
              {props.leftChildren}
          </LeftChildren>
          <RightChildren>
              {props.rightChildren}
          </RightChildren>
      </Container>
  );
};

export default Header;
