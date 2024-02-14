import React, { ReactNode } from "react";

const CollapseButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <p onClick={onClick} className="inline-block transition-colors text-sm text-gray-500 py-1 px-1 cursor-pointer hover:bg-gray-100 bg-gray-50 select-none rounded">
      {children}
    </p>
  );
};

export default CollapseButton;
