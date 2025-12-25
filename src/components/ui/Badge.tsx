import React from "react";
import theme from "@/styles/theme";

export type BadgeVariant = "success" | "warning" | "info";

export default function Badge({
  children,
  variant = "info",
  className = "",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  const base =
    "inline-block px-3 py-1 rounded-full text-xs font-bold " + theme.typography.fontFamily.body;
  let styles = "";
  if (variant === "success") {
    styles = "bg-green-400/20 text-green-300 border border-green-400";
  } else if (variant === "warning") {
    styles = "bg-yellow-400/20 text-yellow-300 border border-yellow-400";
  } else if (variant === "info") {
    styles = "bg-blue-400/20 text-blue-300 border border-blue-400";
  }
  return (
    <span className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </span>
  );
}
