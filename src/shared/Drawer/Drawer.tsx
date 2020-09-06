import { Collapse } from "@material-ui/core";
import { bodyBackground } from "constants/theme";
import { gray2, initial, white } from "constants/colors";
import { barPaddingCSS } from "constants/mixins";
import { secondaryColor } from "constants/theme";
import { BASE_PAGE_PADDING_REM, elevation1 } from "constants/variables";
import React, { FC } from "react";
import { Subtitle } from "shared/Subtitle/Subtitle";
import styled from "styled-components/macro";
import { ExpandLess, ExpandMore, MenuOpen, Menu } from "@material-ui/icons";
import theme from "styled-theming";

type DrawerProps = {
  position?: "left" | "bottom";
  className?: string;
  open?: boolean;
  onCollapse?: (open: boolean) => void;
  title?: string;
  orientation?: "top-down" | "bottom-up";
};

const textColor = theme("mode", {
  dark: white,
  light: initial,
});

const Container = styled.div<DrawerProps>`
  border-top: 1px solid ${gray2};
  box-shadow: ${elevation1};
  background-color: ${white};
`;

const HeaderContainer = styled.div`
  display: flex;
  ${barPaddingCSS};
  justify-content: space-between;
  cursor: pointer;
  color: ${textColor};
  align-items: center;
  padding: 0.5rem ${BASE_PAGE_PADDING_REM}rem;
`;
const HeaderIconContainer = styled.div`
  svg {
    font-size: 1rem;
  }
  display: flex;
`;

const CollapseWrapper = styled.div`
  background-color: ${bodyBackground};
  padding: 1rem ${BASE_PAGE_PADDING_REM}rem;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
`;

const Drawer: FC<DrawerProps> = (props) => {
  const {
    className = "",
    open = false,
    onCollapse = (open: boolean) => {},
    title = "",
    orientation = "bottom-up",
  } = props;

  const iconUp = orientation === "bottom-up";

  return (
    <Container className={className} open={open}>
      <Collapse in={open}>
        <CollapseWrapper>{props.children}</CollapseWrapper>
      </Collapse>
      <HeaderContainer onClick={() => onCollapse(open)}>
        <Subtitle>{title}</Subtitle>
        <HeaderIconContainer>
          {(iconUp && open) || (!iconUp && !open) ? (
            <ExpandLess onClick={() => onCollapse(open)} />
          ) : (
            <ExpandMore />
          )}
        </HeaderIconContainer>
      </HeaderContainer>
    </Container>
  );
};

export default Drawer;
