import { white } from "constants/colors";
import { primaryColor } from "constants/theme";
import React, { FC } from "react";
import styled from "styled-components";
import { ExpandLess, ExpandMore, MenuOpen, Menu } from "@material-ui/icons";
import theme from "styled-theming";

type DrawerProps = {
  position?: "left" | "bottom";
  className?: string;
  open?: boolean;
  onCollapse?: (open: boolean) => void;
  title?: string;
};

const textColor = theme("mode", {
  dark: white,
  light: white,
});

const Container = styled.div<DrawerProps>`
  background-color: ${primaryColor};
`;

const HeaderContainer = styled.div`
  display: flex;
  padding: ${({ theme: { spacing } }) => `${spacing(0.5)} ${spacing()}`};
  justify-content: space-between;
  cursor: pointer;
`;
const HeaderTitle = styled.h3`
  color: ${textColor};
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderIconContainer = styled.div`
  margin-left: ${({ theme: { spacing } }) => spacing(0.25)};
`;

// const LeftHeader: FC<DrawerProps> = (props) => (
//   <HeaderContainer>
//     {props.children}
//     {props.open ? (
//       <MenuOpen onClick={props.onCollapse} />
//     ) : (
//       <Menu onClick={props.onCollapse} />
//     )}
//   </HeaderContainer>
// );
//
// const getHeader = (props: DrawerProps) => {
//   switch (props.open) {
//     case true:
//       return LeftHeader;
//     default:
//       return BottomHeader;
//   }
// };

const Drawer: FC<DrawerProps> = (props) => {
  const {
    className = "",
    open = false,
    onCollapse = (open: boolean) => {},
    title = "",
  } = props;

  return (
    <Container className={className} open={open}>
      <HeaderContainer onClick={() => onCollapse(open)}>
        <HeaderTitle>
          {title}
          <HeaderIconContainer>
            {open ? (
              <ExpandMore />
            ) : (
              <ExpandLess onClick={() => onCollapse(open)} />
            )}
          </HeaderIconContainer>
        </HeaderTitle>
      </HeaderContainer>
      {props.children}
    </Container>
  );
};

export default Drawer;
