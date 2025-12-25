import React from "react";
import theme from "@/styles/theme";

export type CardVariant = "glass" | "bordered" | "elevated";

export default function Card({
  children,
  variant = "glass",
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: CardVariant }) {
  const base =
    "rounded-2xl p-6 w-full " + theme.typography.fontFamily.body +
    " transition-all ";
  let styles = "";
  if (variant === "glass") {
    styles =
      "glassmorphic-card border border-white/10 bg-white/10 backdrop-blur-lg shadow-xl";
  } else if (variant === "bordered") {
    styles =
      "border-2 border-green-400 bg-white/5 shadow-none";
  } else if (variant === "elevated") {
    styles =
      "bg-white/10 shadow-2xl border-none";
  }
  return (
    <div className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </div>
  );
}
