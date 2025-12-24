import React from "react";
import theme from "@/styles/theme";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className={`w-full mb-4 ${theme.typography.fontFamily.body}`}>
      <label className="block mb-2 text-white/80 font-bold text-sm">{label}</label>
      <input
        className={`w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-400 ${error ? "border-red-400 focus:ring-red-400" : ""} ${className}`}
        {...props}
      />
      {error && <div className="text-red-400 text-xs mt-1">{error}</div>}
    </div>
  );
}
