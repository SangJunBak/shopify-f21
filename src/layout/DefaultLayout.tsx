import React, { FC } from "react";
import styled from "styled-components/macro";

type DefaultLayoutProps = {};

const SidebarContainer = styled.div``;

const TopbarContainer = styled.div``;

const BodyContainer = styled.div``;

const DefaultLayoutContainer = styled.div``;

const DefaultLayout: FC<DefaultLayoutProps> = (props) => {
  return (
    <DefaultLayoutContainer>
      <SidebarContainer />
      <TopbarContainer />
      <BodyContainer />
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;
