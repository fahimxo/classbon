import React from "react";
import { ProgressProps } from "./progress.type";
import classNames from "classnames";
import { Size } from "../types/size.type";

const sizeClasses: Record<Size, string> = {
  tiny: "progress-xs",
  small: "progress-sm",
  normal: "progress-md",
  large: "progress-lg",
};
const Progress: React.FC<ProgressProps> = ({
  className,
  value,
  size = "small",
  variant = "neutral",
}) => {
  const classes = classNames("progress", className, {
    [sizeClasses[size]]: size,
    [`progress-${variant}`]: variant,
  });
  return <progress value={value} max={100} className={classes} />;
};

export default Progress;
