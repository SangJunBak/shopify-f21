import { Zoom } from "@material-ui/core";
import React, { FC } from "react";

type CardZoomProps = { className?: string };

export const CardZoom: FC<CardZoomProps> = (props) => {
  const { className = "" } = props;
  return (
    <div className={className}>
      <Zoom in timeout={500}>
        <div>{props.children}</div>
      </Zoom>
    </div>
  );
};
