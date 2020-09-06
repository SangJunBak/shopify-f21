import React, { FC } from "react";
import styled, { css } from "styled-components/macro";
import breakpoint from "styled-components-breakpoint";
import { flexAuto, flexColumn, flexColumnReverse, flexShrink } from "css/flex";

type PageLayoutProps = {
  Sidebar?: React.ReactNode;
  Page?: React.ReactNode;
  open?: boolean;
};

const desktopCSS = css`
  flex-direction: row;
`;

const Container = styled.div`
  ${flexColumnReverse}

  ${breakpoint("desktop")`
    ${desktopCSS}  
  `}
`;

const SidebarContainer = styled.div<Pick<PageLayoutProps, "open">>`
  ${({ open }) => (open ? flexAuto : flexShrink)}
`;

const PageContainer = styled.div``;

const PageLayout: FC<PageLayoutProps> = (props) => {
  const { Sidebar = null, Page = null } = props;
  return (
    <Container>
      <SidebarContainer>{Sidebar}</SidebarContainer>
      <PageContainer>{Page}</PageContainer>
    </Container>
  );
};

export default PageLayout;
