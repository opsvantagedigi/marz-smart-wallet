"use client";
import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";

const MOCK_TOKENS = [
  {
    id: "dev_1",
    label: "CI/CD Integration",
    token: "devtok_4f8a...e9b2",
    scopes: ["read", "write"],
    createdAt: "2025-11-10",
    status: "active",
  },
  {
    id: "dev_2",
    label: "Admin Script",
    token: "devtok_1a2b...c3d4",
    scopes: ["admin"],
    createdAt: "2025-10-01",
    status: "revoked",
  },
];

const SCOPE_OPTIONS = ["read", "write", "admin"];

function generateToken() {
  return (
    "devtok_" +
    Math.random().toString(36).slice(2, 6) +
    "..." +
    Math.random().toString(36).slice(2, 6)
  );
}

export default function TokensPage() {
  const [tokens, setTokens] = useState(MOCK_TOKENS);
  const [newLabel, setNewLabel] = useState("");
  const [newScopes, setNewScopes] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newLabel.trim() || newScopes.length === 0) return;
    setCreating(true);
    setTimeout(() => {
      setTokens([
        {
          id: Date.now().toString(),
          label: newLabel,
          token: generateToken(),
          scopes: newScopes,
          createdAt: new Date().toISOString().slice(0, 10),
          status: "active",
        },
        ...tokens,
      ]);
      setNewLabel("");
      setNewScopes([]);
      setCreating(false);
    }, 600);
  }

  function handleRevoke(id: string) {
    setTokens(ts => ts.map(t => t.id === id ? { ...t, status: "revoked" } : t));
  }

  function handleCopy(token: string, id: string) {
    navigator.clipboard.writeText(token);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1200);
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="font-orbitron text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
        Developer Tokens
      </h1>
      {/* Create Token */}
      <Card className="glassmorphic-card mb-8">
        <div className="font-orbitron text-xl font-bold mb-4 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
          Create Token
        </div>
        <form className="flex flex-col md:flex-row gap-4 items-end" onSubmit={handleCreate}>
          <Input
            label="Token Label"
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
            required
            className="flex-1 min-w-0"
          />
          <div className="flex flex-col gap-2">
            <div className="text-white/80 text-xs mb-1">Scopes</div>
            <div className="flex flex-wrap gap-2">
              {SCOPE_OPTIONS.map(scope => (
                <label key={scope} className="flex items-center gap-1 text-xs text-white/80">
                  <input
                    type="checkbox"
                    checked={newScopes.includes(scope)}
                    onChange={e =>
                      setNewScopes(arr =>
                        e.target.checked
                          ? [...arr, scope]
                          : arr.filter(x => x !== scope)
                      )
                    }
                    className="accent-green-400"
                  />
                  {scope.charAt(0).toUpperCase() + scope.slice(1)}
                </label>
              ))}
            </div>
          </div>
          <Button
            type="submit"
            disabled={!newLabel.trim() || newScopes.length === 0 || creating}
            className="bg-gradient-to-r from-green-400 to-yellow-400 text-black font-bold"
          >
            {creating ? "Creating..." : "Create"}
          </Button>
        </form>
      </Card>
      {/* Tokens List */}
      <div className="space-y-8">
        {tokens.map(t => (
          <Card key={t.id} className={`glassmorphic-card border border-white/10 ${t.status === "revoked" ? "opacity-60 grayscale" : ""}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <div className="font-orbitron text-lg font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent mb-1">
                  {t.label}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {t.scopes.map(scope => (
                    <Badge key={scope} variant="info" className="bg-blue-400/20 text-blue-300 border-blue-400/40">
                      {scope.charAt(0).toUpperCase() + scope.slice(1)}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-green-300 text-xs select-all">{t.token}</span>
                  <Button
                    variant="ghost"
                    className="text-xs px-2 py-1 font-bold"
                    onClick={() => handleCopy(t.token, t.id)}
                  >
                    {copiedId === t.id ? "Copied!" : "Copy"}
                  </Button>
                  {t.status === "active" && (
                    <Button
                      variant="secondary"
                      className="text-xs px-2 py-1 font-bold"
                      onClick={() => handleRevoke(t.id)}
                    >
                      Revoke
                    </Button>
                  )}
                </div>
                <div className="text-xs text-white/60">Created: {t.createdAt}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={t.status === "active" ? "success" : "warning"}
                  className={t.status === "active" ? "bg-green-400/20 text-green-300 border-green-400/40" : "bg-yellow-400/20 text-yellow-300 border-yellow-400/40"}
                >
                  {t.status === "active" ? "Active" : "Revoked"}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
