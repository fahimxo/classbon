import classNames from "classnames";
import { loadingProps } from "./loading.types";
import { Size } from "../types/size.type";

const sizeClasses: Record<Size, string> = {
  normal: "loading-md",
  large: "loading-lg",
  small: "loading-sm",
  tiny: "loading-xs",
};

export const Loading: React.FC<loadingProps> = ({
  type = "spinner",
  size = "normal",
  variant,
  className,
}: loadingProps) => {
  const classes = classNames("loading", className, {
    [`loading-${type}`]: type,
    [`loading-${variant}`]: variant,
    [`${sizeClasses[size]}`]: size,
  });
  return (
    <>
      <span className={classes}></span>
    </>
  );
};
