import React from "react";
import { priceProps } from "./price.types";
import { IconToman } from "../icons/icons";
import { Badge } from "../badge";
import { Size } from "../types/size.type";

const sizeClasses: Record<Size, { textSize: string; svgSize: number }> = {
  tiny: { textSize: "text-md", svgSize: 16 },
  small: { textSize: "text-xl", svgSize: 18 },
  normal: { textSize: "text-2xl", svgSize: 20 },
  large: { textSize: "text-3xl", svgSize: 22 },
};

const Price: React.FC<priceProps> = ({
  size = "normal",
  className,
  price,
  text = "رایگان",
}) => {
  const svgSize = sizeClasses[size].svgSize;
  return (
    <>
      {price != null && price > 0 ? (
        <span
          className={`flex items-center font-bold gap-1 dark:text-white/90 ${sizeClasses[size].textSize} ${className}`}
        >
          {price.toLocaleString()}
          <IconToman
            strokeWidth={1}
            viewBox="0 0 16 16"
            width={svgSize}
            height={svgSize}
          />
        </span>
      ) : (
        <Badge variant="success" size={size}>
          {text}
        </Badge>
      )}
    </>
  );
};

export default Price;
