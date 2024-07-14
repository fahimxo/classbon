import React from "react";
import { BadgeProp } from "./badge.type";
import classNames from "classnames";
import { Size } from "../types/size.type";

const sizeClasses: Record<Size, string> = {
  normal: "badge-md",
  large: "badge-lg",
  small: "badge-sm",
  tiny: "badge-xs",
};

export const Badge: React.FC<BadgeProp> = ({
  variant,
  className,
  size = "tiny",
  children,
}) => {
  const classes = classNames(`badge`, className, {
    [`badge-${variant}`]: variant,
    [`${sizeClasses[size]}`]: size,
  });
  return <span className={classes}>{children}</span>;
};
