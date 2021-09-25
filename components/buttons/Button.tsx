import React, { cloneElement, ReactElement } from "react";
import Typography from "../data_display/Typography";

export default function Button({
  onClick,
  children,
  icon,
  className,
  size = "medium",
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children?: string;
  icon?: ReactElement;
  className?: string;
  size?: "medium" | "small";
}) {
  return (
    <button
      className={`${
        children && "px-3"
      } bg-primary-500 flex justify-center items-center rounded-lg ${
        size == "medium" ? "h-12" : "h-8"
      } 
      ${children ? "w-auto" : size == "medium" ? "w-12" : "w-8"}
      focus:outline-none active:bg-primary-900 hover:bg-primary-400 ${className}`}
      onClick={onClick}
    >
      {icon &&
        cloneElement(icon, {
          className: `h-5 w-5 text-neutral-50 ${children && "mr-1"}`,
        })}
      <Typography variant="button1" className="text-neutral-50">
        {children && children}
      </Typography>
    </button>
  );
}
