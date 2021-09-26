import React, { cloneElement, ReactElement } from "react";
import Typography from "../data_display/Typography";

export default function Button({
  onClick,
  children,
  icon,
  className,
  variant = "primary",
  size = "medium",
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children?: string;
  icon?: ReactElement;
  className?: string;
  size?: "medium" | "small";
  variant?: "primary" | "secondary" | "tertiary";
}) {
  const btnClassName =
    variant == "primary"
      ? "bg-primary-500 active:bg-primary-900 hover:bg-primary-400"
      : "white active:bg-neutral-200 hover:bg-neutral-100";
  const iconClassName =
    variant == "primary" ? "text-neutral-50" : "text-neutral-800";
  return (
    <button
      className={`${
        children && "px-4"
      } ${btnClassName} flex justify-center items-center rounded-2xl ${
        size == "medium" ? "h-12" : "h-8"
      } 
      ${children ? "w-auto" : size == "medium" ? "w-12" : "w-8"}
      focus:outline-none  ${className}`}
      onClick={onClick}
    >
      {icon &&
        cloneElement(icon, {
          className: `${iconClassName} h-5 w-5 ${children && "mr-1"}`,
        })}
      <Typography variant="button1" className="text-neutral-50">
        {children && children}
      </Typography>
    </button>
  );
}
