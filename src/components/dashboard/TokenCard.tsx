"use client";

import { motion } from "framer-motion";

export function TokenCard({ symbol, balance, price }: any) {
  const value = balance * price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-white/10 border border-white/10 shadow-md hover:bg-white/15 transition-all"
    >
      <div className="text-white font-semibold">{symbol}</div>
      <div className="text-white/70 text-sm">{balance.toFixed(4)}</div>
      <div className="text-yellow-300 font-bold mt-2">${value.toFixed(2)}</div>
    </motion.div>
  );
}
