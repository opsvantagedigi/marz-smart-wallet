"use client";
import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";

// Mock API keys
type ApiKey = {
  id: string;
  label: string;
  key: string;
  createdAt: string;
  lastUsed: string;
  status: "active" | "revoked";
};

const MOCK_KEYS: ApiKey[] = [
  {
    id: "1",
    label: "Production Key",
    key: "marz_live_4f8a...e9b2",
    createdAt: "2025-12-01",
    lastUsed: "2025-12-24",
    status: "active",
  },
  {
    id: "2",
    label: "Dev Sandbox",
    key: "marz_test_1a2b...c3d4",
    createdAt: "2025-11-10",
    lastUsed: "2025-12-20",
    status: "active",
  },
  {
    id: "3",
    label: "Old Key",
    key: "marz_live_zz99...yy88",
    createdAt: "2025-09-15",
    lastUsed: "2025-10-01",
    status: "revoked",
  },
];

function generateKey() {
  return (
    "marz_" +
    Math.random().toString(36).slice(2, 6) +
    "..." +
    Math.random().toString(36).slice(2, 6)
  );
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(MOCK_KEYS);
  const [newLabel, setNewLabel] = useState("");
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  function handleCopy(key: string, id: string) {
    navigator.clipboard.writeText(key);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 1200);
  }

  function handleCreate() {
    if (!newLabel.trim()) return;
    setCreating(true);
    setTimeout(() => {
      setApiKeys([
        {
          id: Date.now().toString(),
          label: newLabel,
          key: generateKey(),
          createdAt: new Date().toISOString().slice(0, 10),
          lastUsed: "-",
          status: "active",
        },
        ...apiKeys,
      ]);
      setNewLabel("");
      setCreating(false);
    }, 600);
  }

  function handleRevoke(id: string) {
    setApiKeys(keys =>
      keys.map(k => (k.id === id ? { ...k, status: "revoked" } : k))
    );
  }

  function handleRegenerate(id: string) {
    setApiKeys(keys =>
      keys.map(k =>
        k.id === id
          ? { ...k, key: generateKey(), status: "active" }
          : k
      )
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="font-orbitron text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
        API Key Management
      </h1>
      <Card className="mb-8 p-6 flex flex-col md:flex-row items-center gap-4 glassmorphic-card">
        <Input
          className="flex-1 min-w-0"
          label="New API key label (e.g. Staging, My App)"
          value={newLabel}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewLabel(e.target.value)}
          disabled={creating}
        />
        <Button
          onClick={handleCreate}
          disabled={!newLabel.trim() || creating}
          className="ml-0 md:ml-4 bg-gradient-to-r from-green-400 to-yellow-400 text-black font-bold shadow-lg"
        >
          {creating ? "Creating..." : "Create Key"}
        </Button>
      </Card>
      <div className="space-y-6">
        {apiKeys.map(key => (
          <Card
            key={key.id}
            className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 glassmorphic-card border border-white/10 ${
              key.status === "revoked" ? "opacity-60 grayscale" : ""
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-orbitron text-lg font-semibold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                  {key.label}
                </span>
                <Badge
                  className={
                    key.status === "active"
                      ? "bg-green-500/20 text-green-300 border-green-400/40"
                      : "bg-red-500/20 text-red-300 border-red-400/40"
                  }
                >
                  {key.status === "active" ? "Active" : "Revoked"}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base text-white/90 select-all">
                  {key.key}
                </span>
                <Button
                  variant="ghost"
                  className="ml-1 px-2 py-1 text-xs bg-gradient-to-r from-green-400 to-yellow-400 text-black font-bold shadow"
                  onClick={() => handleCopy(key.key, key.id)}
                  disabled={key.status !== "active"}
                >
                  {copiedKeyId === key.id ? "Copied!" : "Copy"}
                </Button>
              </div>
              <div className="text-xs text-white/60 mt-1 flex gap-4">
                <span>Created: {key.createdAt}</span>
                <span>Last Used: {key.lastUsed}</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
              <Button
                variant="secondary"
                className="border-yellow-400/60 text-yellow-300 hover:bg-yellow-400/10"
                onClick={() => handleRegenerate(key.id)}
                disabled={key.status !== "active"}
              >
                Regenerate
              </Button>
              <Button
                variant="secondary"
                className="border-red-400/60 text-red-300 hover:bg-red-400/10"
                onClick={() => handleRevoke(key.id)}
                disabled={key.status !== "active"}
              >
                Revoke
              </Button>
            </div>
          </Card>
        ))}
        {apiKeys.length === 0 && (
          <Card className="p-6 text-center text-white/70 glassmorphic-card">
            No API keys found.
          </Card>
        )}
      </div>
    </div>
  );
}
