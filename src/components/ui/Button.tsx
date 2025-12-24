import React from "react";
import theme from "@/styles/theme";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  let base =
    "px-6 py-3 rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 " +
    theme.typography.fontFamily.heading;
  let styles = "";
  if (variant === "primary") {
    styles =
      "bg-gradient-to-r from-green-400 to-yellow-400 text-gray-900 shadow-lg hover:scale-105 focus:ring-green-400";
  } else if (variant === "secondary") {
    styles =
      "bg-white/10 border border-green-400 text-green-300 hover:bg-green-400/20 hover:text-yellow-200 focus:ring-yellow-400";
  } else if (variant === "ghost") {
    styles =
      "bg-transparent text-white hover:text-green-400 hover:bg-white/10 border border-transparent focus:ring-green-400";
  }
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
