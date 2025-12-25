"use client";
import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";

const MOCK_WEBHOOKS = [
  {
    id: "wh_1",
    url: "https://api.myapp.com/webhooks/solana",
    events: ["invoice.paid", "subscription.updated"],
    enabled: true,
    secret: "whsec_4f8a...e9b2",
    logs: [
      { id: "log1", status: "delivered", date: "2025-12-20", event: "invoice.paid" },
      { id: "log2", status: "failed", date: "2025-12-18", event: "subscription.updated" },
    ],
  },
  {
    id: "wh_2",
    url: "https://hooks.zapier.com/hooks/catch/123456/",
    events: ["subscription.canceled"],
    enabled: false,
    secret: "whsec_1a2b...c3d4",
    logs: [
      { id: "log3", status: "delivered", date: "2025-12-10", event: "subscription.canceled" },
    ],
  },
];

const EVENT_OPTIONS = [
  "subscription.created",
  "subscription.updated",
  "subscription.canceled",
  "invoice.paid",
  "invoice.payment_failed",
];

function generateSecret() {
  return (
    "whsec_" +
    Math.random().toString(36).slice(2, 6) +
    "..." +
    Math.random().toString(36).slice(2, 6)
  );
}

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState(MOCK_WEBHOOKS);
  const [creating, setCreating] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newEvents, setNewEvents] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newUrl.trim() || newEvents.length === 0) return;
    setCreating(true);
    setTimeout(() => {
      setWebhooks([
        {
          id: Date.now().toString(),
          url: newUrl,
          events: newEvents,
          enabled: true,
          secret: generateSecret(),
          logs: [],
        },
        ...webhooks,
      ]);
      setNewUrl("");
      setNewEvents([]);
      setCreating(false);
    }, 600);
  }

  function handleToggle(id: string) {
    setWebhooks(ws => ws.map(w => w.id === id ? { ...w, enabled: !w.enabled } : w));
  }

  function handleRegenerate(id: string) {
    setWebhooks(ws => ws.map(w => w.id === id ? { ...w, secret: generateSecret() } : w));
  }

  function handleCopy(secret: string, id: string) {
    navigator.clipboard.writeText(secret);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1200);
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="font-orbitron text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
        Webhooks Management
      </h1>
      {/* Create Webhook */}
      <Card className="glassmorphic-card mb-8">
        <div className="font-orbitron text-xl font-bold mb-4 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
          Create Webhook
        </div>
        <form className="flex flex-col md:flex-row gap-4 items-end" onSubmit={handleCreate}>
          <Input
            label="Webhook URL"
            type="url"
            value={newUrl}
            onChange={e => setNewUrl(e.target.value)}
            required
            className="flex-1 min-w-0"
          />
          <div className="flex flex-col gap-2">
            <div className="text-white/80 text-xs mb-1">Event Types</div>
            <div className="flex flex-wrap gap-2">
              {EVENT_OPTIONS.map(ev => (
                <label key={ev} className="flex items-center gap-1 text-xs text-white/80">
                  <input
                    type="checkbox"
                    checked={newEvents.includes(ev)}
                    onChange={e =>
                      setNewEvents(arr =>
                        e.target.checked
                          ? [...arr, ev]
                          : arr.filter(x => x !== ev)
                      )
                    }
                    className="accent-green-400"
                  />
                  {ev}
                </label>
              ))}
            </div>
          </div>
          <Button
            type="submit"
            disabled={!newUrl.trim() || newEvents.length === 0 || creating}
            className="bg-gradient-to-r from-green-400 to-yellow-400 text-black font-bold"
          >
            {creating ? "Creating..." : "Create"}
          </Button>
        </form>
      </Card>
      {/* Webhooks List */}
      <div className="space-y-8">
        {webhooks.map(w => (
          <Card key={w.id} className="glassmorphic-card">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <div className="font-orbitron text-lg font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent mb-1">
                  {w.url}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {w.events.map(ev => (
                    <Badge key={ev} variant="info" className="bg-blue-400/20 text-blue-300 border-blue-400/40">
                      {ev}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant={w.enabled ? "success" : "warning"}
                    className={w.enabled ? "bg-green-400/20 text-green-300 border-green-400/40" : "bg-yellow-400/20 text-yellow-300 border-yellow-400/40"}
                  >
                    {w.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                  <Button
                    variant="secondary"
                    className="text-xs px-3 py-1 font-bold"
                    onClick={() => handleToggle(w.id)}
                  >
                    {w.enabled ? "Disable" : "Enable"}
                  </Button>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-white/70">Secret:</span>
                  <span className="font-mono text-green-300 text-xs select-all">{w.secret}</span>
                  <Button
                    variant="ghost"
                    className="text-xs px-2 py-1 font-bold"
                    onClick={() => handleCopy(w.secret, w.id)}
                  >
                    {copiedId === w.id ? "Copied!" : "Copy"}
                  </Button>
                  <Button
                    variant="secondary"
                    className="text-xs px-2 py-1 font-bold"
                    onClick={() => handleRegenerate(w.id)}
                  >
                    Regenerate
                  </Button>
                </div>
              </div>
              {/* Delivery Logs */}
              <div className="w-full md:w-64">
                <div className="font-orbitron text-xs font-bold mb-1 text-white/70">Delivery Logs</div>
                <div className="bg-black/30 rounded-lg p-2 max-h-32 overflow-y-auto border border-white/10">
                  {w.logs.length === 0 && (
                    <div className="text-xs text-white/40">No deliveries yet.</div>
                  )}
                  {w.logs.map(log => (
                    <div key={log.id} className="flex items-center gap-2 text-xs mb-1">
                      <span className="font-mono text-green-300">{log.date}</span>
                      <span className="text-white/80">{log.event}</span>
                      <Badge
                        variant={log.status === "delivered" ? "success" : "warning"}
                        className={log.status === "delivered" ? "bg-green-400/20 text-green-300 border-green-400/40" : "bg-yellow-400/20 text-yellow-300 border-yellow-400/40"}
                      >
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
