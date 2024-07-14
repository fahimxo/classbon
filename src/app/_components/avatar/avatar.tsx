import React from "react";
import { AvatarProps } from "./avatar.types";
import Image from "next/image";
import { IconUserProfile } from "../icons/icons";
import { Size } from "../types/size.type";
import classNames from "classnames";

const sizeClasses: Record<Size, number> = {
  tiny: 40,
  small: 50,
  normal: 70,
  large: 120,
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size = "normal",
  className,
  variant = "primary",
  alt = "",
}) => {
  const classes = classNames("avatar", className, {
    [`${sizeClasses[size]}`]: size,
    [`avatar-${variant}`]: variant,
  });
  return (
    <div
      className={classes}
      style={{ width: sizeClasses[size], height: sizeClasses[size] }}
      data-testid="avatar"
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={sizeClasses[size]}
          height={sizeClasses[size]}
        />
      ) : (
        <IconUserProfile
          width={sizeClasses[size] / 2}
          height={sizeClasses[size] / 2}
        />
      )}
    </div>
  );
};
