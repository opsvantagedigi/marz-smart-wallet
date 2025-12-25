"use client";
import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const CATEGORIES = ["All", "Billing", "API Usage", "Errors", "System Updates"];

const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    category: "Billing",
    title: "Invoice Paid",
    message: "Your December invoice was paid successfully.",
    date: "2025-12-01",
    read: false,
  },
  {
    id: "2",
    category: "API Usage",
    title: "Usage Warning",
    message: "You've used 80% of your monthly Solana RPC quota.",
    date: "2025-12-10",
    read: false,
  },
  {
    id: "3",
    category: "Errors",
    title: "API Error Spike",
    message: "We detected a spike in failed requests from your app.",
    date: "2025-12-12",
    read: true,
  },
  {
    id: "4",
    category: "System Updates",
    title: "New Feature Released",
    message: "Real-time analytics are now available in your dashboard!",
    date: "2025-12-15",
    read: true,
  },
  {
    id: "5",
    category: "Billing",
    title: "Payment Method Expiring",
    message: "Your payment method will expire soon. Please update it.",
    date: "2025-12-18",
    read: false,
  },
];

type Category = "Billing" | "API Usage" | "Errors" | "System Updates";

const MOCK_PREFS: Record<Category, boolean> = {
  Billing: true,
  "API Usage": true,
  Errors: true,
  "System Updates": false,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState("All");
  const [prefs, setPrefs] = useState<Record<Category, boolean>>(MOCK_PREFS);

  const filtered =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.category === filter);

  function markAllRead() {
    setNotifications((n) => n.map((notif) => ({ ...notif, read: true })));
  }

  function togglePref(cat: Category) {
    setPrefs((p) => ({ ...p, [cat]: !p[cat] }));
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="font-orbitron text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
        Notifications
      </h1>
      {/* Filters & Mark all read */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "primary" : "secondary"}
              className={`px-4 py-2 text-xs font-bold ${filter === cat ? "scale-105" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          className="text-green-300 border-green-400 px-4 py-2"
          onClick={markAllRead}
        >
          Mark All Read
        </Button>
      </div>
      {/* Notification List */}
      <Card className="glassmorphic-card mb-8">
        <div className="font-orbitron text-xl font-bold mb-4 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
          Notification List
        </div>
        <ul className="divide-y divide-white/10">
          {filtered.length === 0 && (
            <li className="py-8 text-center text-white/60">No notifications in this category.</li>
          )}
          {filtered.map((notif) => (
            <li
              key={notif.id}
              className={`flex flex-col md:flex-row md:items-center justify-between gap-2 py-4 px-2 transition-all ${
                notif.read ? "opacity-60" : "bg-gradient-to-r from-green-400/10 to-yellow-400/10"
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant={
                      notif.category === "Billing"
                        ? "success"
                        : notif.category === "Errors"
                        ? "warning"
                        : "info"
                    }
                    className={
                      notif.category === "Billing"
                        ? "bg-green-400/20 text-green-300 border-green-400/40"
                        : notif.category === "Errors"
                        ? "bg-yellow-400/20 text-yellow-300 border-yellow-400/40"
                        : notif.category === "API Usage"
                        ? "bg-blue-400/20 text-blue-300 border-blue-400/40"
                        : "bg-pink-400/20 text-pink-300 border-pink-400/40"
                    }
                  >
                    {notif.category}
                  </Badge>
                  {!notif.read && (
                    <span className="ml-2 text-xs text-yellow-300 animate-pulse">● Unread</span>
                  )}
                </div>
                <div className="font-bold text-white/90 mb-1">{notif.title}</div>
                <div className="text-white/70 text-sm mb-1">{notif.message}</div>
                <div className="text-xs text-white/40 font-mono">{notif.date}</div>
              </div>
              {!notif.read && (
                <Button
                  variant="secondary"
                  className="text-xs px-3 py-1 font-bold"
                  onClick={() =>
                    setNotifications((n) =>
                      n.map((x) =>
                        x.id === notif.id ? { ...x, read: true } : x
                      )
                    )
                  }
                >
                  Mark Read
                </Button>
              )}
            </li>
          ))}
        </ul>
      </Card>
      {/* Preferences */}
      <Card className="glassmorphic-card mb-8">
        <div className="font-orbitron text-xl font-bold mb-4 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
          Notification Preferences
        </div>
        <div className="flex flex-col gap-3">
          {CATEGORIES.filter((c): c is Category => c !== "All").map((cat) => (
            <label key={cat} className="flex items-center gap-3 text-white/90">
              <input
                type="checkbox"
                checked={prefs[cat]}
                onChange={() => togglePref(cat)}
                className="accent-green-400 w-5 h-5"
              />
              {cat}
            </label>
          ))}
        </div>
      </Card>
    </div>
  );
}
