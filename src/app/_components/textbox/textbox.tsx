import React, { forwardRef } from "react";
import { TextBoxProps } from "./textbox.types";
import { Size } from "../types/size.type";
import classNames from "classnames";

const sizeClasses: Record<Size, string> = {
  tiny: "textbox-xs",
  small: "textbox-sm",
  normal: "textbox-md",
  large: "textbox-lg",
};

export const Textbox: React.FC<TextBoxProps> = forwardRef<
  HTMLInputElement,
  TextBoxProps
>(function TetxInput(
  { variant = "ghost", size = "normal", type = "text", className, ...rest },
  ref
) {
  const classes = classNames(
    "textbox",
    "w-full",
    className,
    { [`textbox-${variant}`]: variant },
    { [`${sizeClasses[size]}`]: size }
  );
  return <input ref={ref} className={classes} type={type} {...rest} />;
});
