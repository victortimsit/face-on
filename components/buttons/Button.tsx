import React, { cloneElement, ReactElement } from "react";
import Typography from "../data_display/Typography";

export default function Button({
  onClick,
  children,
  icon,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children?: string;
  icon?: ReactElement;
}) {
  return (
    <button
      className="px-3 py-1 bg-primary-500 flex align-center items-center rounded-lg h-12"
      onClick={onClick}
    >
      {icon && cloneElement(icon, { className: "h-5 w-5 text-neutral-50" })}
      <Typography variant="button1" className="text-neutral-50">
        {children && children}
      </Typography>
    </button>
  );
}
