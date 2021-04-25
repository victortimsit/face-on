import React, { ReactNode } from "react";

type TypeScale =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "body1"
  | "body2"
  | "button1"
  | "button2"
  | "caption"
  | "overline";

interface Typography {
  variant?: TypeScale;
  component?: TypeScale;
  children?: ReactNode | string;
  className?: string;
}

export default function Typography({
  variant = "body1",
  component = variant,
  className,
  children,
}: Typography) {
  const style = {
    h1: "text-9xl font-bold",
    h2: "text-8xl font-bold",
    h3: "text-7xl font-bold",
    h4: "text-6xl font-bold",
    h5: "text-5xl font-bold",
    body1: "text-lg",
    body2: "text-base",
    button1: "text-lg font-medium",
    button2: "text-base font-medium",
    caption: "text-sm",
    overline: "text-xs",
  };
  switch (component) {
    case "h1":
      return <h1 className={`${style[variant]} ${className}`}>{children}</h1>;
    case "h2":
      return <h2 className={`${style[variant]} ${className}`}>{children}</h2>;
    case "h3":
      return <h3 className={`${style[variant]} ${className}`}>{children}</h3>;
    case "h4":
      return <h4 className={`${style[variant]} ${className}`}>{children}</h4>;
    case "h5":
      return <h5 className={`${style[variant]} ${className}`}>{children}</h5>;
    case "body1":
      return <p className={`${style[variant]} ${className}`}>{children}</p>;
    case "body2":
      return <p className={`${style[variant]} ${className}`}>{children}</p>;
    case "button1":
      return (
        <span className={`${style[variant]} ${className}`}>{children}</span>
      );
    case "button2":
      return (
        <span className={`${style[variant]} ${className}`}>{children}</span>
      );
    case "caption":
      return (
        <span className={`${style[variant]} ${className}`}>{children}</span>
      );
    case "overline":
      return (
        <span className={`${style[variant]} ${className}`}>{children}</span>
      );

    default:
      return <></>;
  }
}
