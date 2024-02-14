import React from "react";

const Badge = ({
  label,
  color = "default",
}: {
  label: string;
  color?: "default" | "red" | "green";
}) => {
  let labelColor = "bg-gray-200";
  if (color === "red") {
    labelColor = "bg-red-500 text-white";
  } else if (color === "green") {
    labelColor = "bg-red-500 text-white";
  }
  return (
    <p
      className={`inline-block text-xs rounded-full px-3 py-1 ${labelColor}`}
    >
      {label}
    </p>
  );
};

export default Badge;
