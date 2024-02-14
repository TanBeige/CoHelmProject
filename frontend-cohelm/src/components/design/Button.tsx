import Link from "next/link";
import React, { HTMLAttributes } from "react";
import Fade from "../animations/Fade";
import LoadingCircle from "./LoadingCircle";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "outline";
  disabled?: boolean;
  loading?: boolean;
  children?: JSX.Element | JSX.Element[] | string | string[];
  [key: string]: unknown;
}

export const Button: React.FC<ButtonProps> = ({
  className = "",
  variant = "primary",
  children,
  disabled,
  loading = false,
  ...rest
}): JSX.Element => {
  let buttonColorScheme =
    variant === "primary" ? "bg-blue-600 hover:bg-blue-700" : "";

  let variantClass = "text-white";
  if (variant === "outline") {
    variantClass = "bg-transparent text-black dark:text-white hover:opacity-60";
  }

  const classes = `transition-all 
    flex items-center justify-center px-4 py-2 font-medium ${variantClass} rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    ${disabled ? "opacity-60" : "cursor-pointer"}
    ${buttonColorScheme} 
  `;

  if (loading) {
    return (
      <button className={classes + " " + className} disabled={true} {...rest}>
        <div className="px-4 py-1">
          <Fade fadeKey={"loaderupgrade"} fadeDuration={0.2}>
            <div className="w-4">
              <LoadingCircle color="neutral" />
            </div>
          </Fade>
        </div>
      </button>
    );
  }

  return (
    <button className={classes + " " + className} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
