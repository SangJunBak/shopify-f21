import React, { FC } from "react";
import styled from "styled-components";
import { ExpandLess, ExpandMore, MenuOpen, Menu } from "@material-ui/icons";
import { baseSpacingRem } from "constants/variables";

type DrawerProps = {
  position?: "left" | "bottom";
  className?: string;
  open?: boolean;
  onCollapse?: () => void;
  title?: string;
};

const Container = styled.div``;
const HeaderContainer = styled.div`
  display: flex;
  padding: ${baseSpacingRem / 2}rem ${baseSpacingRem}rem;
  justify-content: space-between;
`;

const BottomHeader: FC<DrawerProps> = (props) => (
  <HeaderContainer>
    {props.children}
    {props.open ? (
      <ExpandLess onClick={props.onCollapse} />
    ) : (
      <ExpandMore onClick={props.onCollapse} />
    )}
  </HeaderContainer>
);

const LeftHeader: FC<DrawerProps> = (props) => (
  <HeaderContainer>
    {props.children}
    {props.open ? (
      <MenuOpen onClick={props.onCollapse} />
    ) : (
      <Menu onClick={props.onCollapse} />
    )}
  </HeaderContainer>
);

const getHeader = (props: DrawerProps) => {
  switch (props.open) {
    case true:
      return LeftHeader;
    default:
      return BottomHeader;
  }
};

const Drawer = (props: DrawerProps) => {
  const {
    position = "left",
    className = "",
    open = false,
    onCollapse = (open: boolean) => {},
    title = "",
  } = props;

  const Header = getHeader(props);
  return <Container></Container>;
};

export default Drawer;
