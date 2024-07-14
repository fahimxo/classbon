"use client";
import React from "react";
import { tailwindColors } from "../../../../tailwind.config";
import { colord } from "colord";

function Colors() {
  return (
    <div className="flex flex-wrap " lang="en" dir="ltr">
      {Object.entries(tailwindColors).map(([key, value]) => (
        <ColorBox key={key} name={key} value={value} />
      ))}
    </div>
  );
}

export default Colors;

const ColorBox: React.FC<{ name: string; value: string }> = ({
  name,
  value,
}) => {
  const getContrastingTextColor = (value: string) =>
    colord(value).isDark() ? "#dddddd" : "#000";
  return (
    <div
      className="flex flex-col justify-center items-center h-60 w-80"
      style={{ backgroundColor: value, color: getContrastingTextColor(value) }}
    >
      <span>{name}</span>
      <span>{value}</span>
    </div>
  );
};
