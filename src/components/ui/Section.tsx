import React from "react";
import theme from "@/styles/theme";

export default function Section({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={`max-w-6xl mx-auto px-4 py-12 md:py-20 ${theme.typography.fontFamily.body} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
