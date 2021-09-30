import React, { ReactElement, useEffect } from "react";
import Typography from "../data_display/Typography";

export default function SnackNotif({
  children,
  message,
  run = false,
  className,
  onEnded,
}: {
  children: ReactElement;
  message: string;
  run: boolean;
  className?: string;
  onEnded: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(() => onEnded(), 5000);
    return () => clearTimeout(t);
  }, [run]);

  return (
    <div className={`relative ${className}`}>
      {children}
      <Typography
        variant="caption"
        className={`px-4 py-2 bg-pure-black-1000 text-neutral-200 absolute bottom-full mb-2 transform origin-bottom left-1/2 -translate-x-1/2 transition-transform rounded-xl ${
          !run && "scale-0"
        }`}
      >
        {message}
      </Typography>
    </div>
  );
}
