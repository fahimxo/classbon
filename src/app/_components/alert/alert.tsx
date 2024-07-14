import React from "react";
import classNames from "classnames";
import { IconInfo } from "@/app/_components/icons/icons";
import { AlertProps } from "./alert.types";

const Alert: React.FC<AlertProps> = ({
  variant,
  className,
  showIcon = true,
  children,
}: AlertProps) => {
  const classes = classNames(
    "alert",
    { [`alert-${variant}`]: variant },
    className
  );
  return (
    <div className={classes} data-testid="alert">
      {showIcon && <IconInfo width={18} />}
      {children}
    </div>
  );
};

export default Alert;
