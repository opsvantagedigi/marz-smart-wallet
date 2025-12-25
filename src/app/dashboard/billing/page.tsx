"use client";
import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const PLAN = {
  name: "Pro",
  price: "$49/mo",
  requests: 5_000_000,
  overage: "$0.50 per 100k",
  features: [
    "5M Solana RPC requests/mo",
    "Priority routing",
    "24/7 support",
    "Advanced analytics",
  ],
};

const USAGE = {
  used: 3_200_000,
  remaining: 1_800_000,
  overage: 0,
};

const SUBSCRIPTION = {
  status: "active", // "active" | "past_due" | "canceled"
  renews: "2026-01-25",
  payment: "Visa •••• 4242",
};

const INVOICES = [
  { id: "inv_001", date: "2025-12-01", amount: "$49.00", status: "paid" },
  { id: "inv_002", date: "2025-11-01", amount: "$49.00", status: "paid" },
  { id: "inv_003", date: "2025-10-01", amount: "$49.00", status: "paid" },
];

export default function BillingDashboard() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="font-orbitron text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
        Billing Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Current Plan */}
        <Card className="glassmorphic-card">
          <div className="flex items-center justify-between mb-2">
            <span className="font-orbitron text-xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
              Current Plan
            </span>
            <Badge variant="success" className="bg-green-400/20 text-green-300 border-green-400/40">
              {PLAN.name}
            </Badge>
          </div>
          <div className="text-3xl font-bold text-white mb-2">{PLAN.price}</div>
          <ul className="mb-4 text-white/80 text-sm list-disc ml-5">
            {PLAN.features.map(f => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="flex gap-2">
            <Button variant="secondary" className="bg-gradient-to-r from-green-400 to-yellow-400 text-black font-bold">
              Upgrade
            </Button>
            <Button variant="ghost" className="text-yellow-300 border-yellow-400">
              Downgrade
            </Button>
          </div>
        </Card>
        {/* Usage Summary */}
        <Card className="glassmorphic-card">
          <div className="font-orbitron text-xl font-bold mb-2 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
            Usage Summary
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <div className="flex items-center justify-between">
              <span className="text-white/80">Requests Used</span>
              <span className="font-mono text-lg text-green-300">{USAGE.used.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Remaining</span>
              <span className="font-mono text-lg text-yellow-300">{USAGE.remaining.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Overage</span>
              <span className="font-mono text-lg text-red-400">{USAGE.overage.toLocaleString()}</span>
            </div>
          </div>
          <div className="text-xs text-white/60">Plan includes up to 5M requests/mo. Overage: {PLAN.overage}</div>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Subscription Status */}
        <Card className="glassmorphic-card">
          <div className="flex items-center justify-between mb-2">
            <span className="font-orbitron text-xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
              Subscription
            </span>
            <Badge
              variant={SUBSCRIPTION.status === "active" ? "success" : SUBSCRIPTION.status === "past_due" ? "warning" : "info"}
              className={
                SUBSCRIPTION.status === "active"
                  ? "bg-green-400/20 text-green-300 border-green-400/40"
                  : SUBSCRIPTION.status === "past_due"
                  ? "bg-yellow-400/20 text-yellow-300 border-yellow-400/40"
                  : "bg-blue-400/20 text-blue-300 border-blue-400/40"
              }
            >
              {SUBSCRIPTION.status === "active"
                ? "Active"
                : SUBSCRIPTION.status === "past_due"
                ? "Past Due"
                : "Canceled"}
            </Badge>
          </div>
          <div className="text-white/80 mb-1">Renews: <span className="font-mono text-green-300">{SUBSCRIPTION.renews}</span></div>
          <div className="text-white/80">Payment: <span className="font-mono text-yellow-300">{SUBSCRIPTION.payment}</span></div>
        </Card>
        {/* Payment Method */}
        <Card className="glassmorphic-card">
          <div className="font-orbitron text-xl font-bold mb-2 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
            Payment Method
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-lg text-yellow-300">{SUBSCRIPTION.payment}</span>
            <Button variant="secondary" className="text-xs px-3 py-1 font-bold">
              Update
            </Button>
          </div>
          <div className="text-xs text-white/60">Your payment details are securely managed by Hello.</div>
        </Card>
      </div>
      {/* Invoice History */}
      <Card className="glassmorphic-card mb-10 overflow-x-auto">
        <div className="font-orbitron text-xl font-bold mb-4 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
          Invoice History
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-white/70 text-sm">
              <th className="py-2 px-3">Invoice</th>
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Amount</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {INVOICES.map(inv => (
              <tr key={inv.id} className="border-t border-white/10">
                <td className="py-2 px-3 font-mono text-green-300">{inv.id}</td>
                <td className="py-2 px-3 text-white/90">{inv.date}</td>
                <td className="py-2 px-3 text-white/90">{inv.amount}</td>
                <td className="py-2 px-3">
                  <Badge
                    variant={inv.status === "paid" ? "success" : "info"}
                    className={
                      inv.status === "paid"
                        ? "bg-green-400/20 text-green-300 border-green-400/40"
                        : "bg-blue-400/20 text-blue-300 border-blue-400/40"
                    }
                  >
                    {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
