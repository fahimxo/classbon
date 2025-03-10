import React from "react";
import { ButtonProps, ButtonShape } from "./button.types";
import classNames from "classnames";
import { Size } from "../types/size.type";
import { Loading } from "../loading/loading";

const sizeClasses: Record<Size, string> = {
  normal: "",
  large: "btn-lg",
  small: "btn-sm",
  tiny: "btn-xs",
};
const shapeClasses: Record<ButtonShape, string> = {
  default: "",
  wide: "btn-wide",
  full: "btn-block",
  square: "btn-square",
};

export const Button: React.FC<ButtonProps> = ({
  variant,
  size = "normal",
  isDisabled = false,
  isOutline = false,
  shape = "default",
  isLoading = false,
  loadingType = "spinner",
  loadingText = "در حال ارسال درخواست...",
  type = "button",
  isLink = false,
  animatedIcon = false,
  className,
  children,
  ...rest
}: ButtonProps) => {
  const classes = classNames(
    "btn",
    className,
    { "btn-outline": isOutline },
    { "btn-link": isLink },
    { "animated-icon": animatedIcon },
    { "pointer-events-none opacity-80": isLoading },
    { [`btn-${variant}`]: variant },
    { [`${sizeClasses[size]}`]: size },
    { [`${shapeClasses[shape]}`]: shape }
  );
  return (
    <button type={type} className={classes} disabled={isDisabled} {...rest}>
      {isLoading ? (
        <>
          {loadingText} <Loading type={loadingType} />
        </>
      ) : (
        children
      )}
    </button>
  );
};
