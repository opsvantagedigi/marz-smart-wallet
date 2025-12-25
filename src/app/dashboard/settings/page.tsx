"use client";
import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";

const MOCK_USER = {
  name: "Jane Doe",
  email: "jane@marzwallet.com",
  twoFA: false,
  notifications: {
    apiErrors: true,
    apiUsage: true,
    productUpdates: false,
  },
};

export default function SettingsPage() {
  const [user, setUser] = useState(MOCK_USER);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [twoFA, setTwoFA] = useState(user.twoFA);
  const [notif, setNotif] = useState(user.notifications);
  const [deleting, setDeleting] = useState(false);

  function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault();
    setPassword("");
    setPassword2("");
    alert("Password updated (mock)");
  }

  function handleDelete() {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      alert("Account deleted (mock)");
    }, 1200);
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="font-orbitron text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
        User Settings
      </h1>
      {/* Profile Info */}
      <Card className="glassmorphic-card mb-8">
        <div className="font-orbitron text-xl font-bold mb-2 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
          Profile
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="flex-1">
            <div className="text-white/80 mb-1">Name</div>
            <div className="font-bold text-lg text-green-300">{user.name}</div>
          </div>
          <div className="flex-1">
            <div className="text-white/80 mb-1">Email</div>
            <div className="font-mono text-yellow-300">{user.email}</div>
          </div>
        </div>
      </Card>
      {/* Password Update */}
      <Card className="glassmorphic-card mb-8">
        <div className="font-orbitron text-xl font-bold mb-2 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
          Update Password
        </div>
        <form className="flex flex-col gap-4" onSubmit={handlePasswordUpdate}>
          <Input
            label="New Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            required
          />
          <Button type="submit" className="w-full max-w-xs">
            Update Password
          </Button>
        </form>
      </Card>
      {/* Two-Factor Authentication */}
      <Card className="glassmorphic-card mb-8">
        <div className="font-orbitron text-xl font-bold mb-2 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
          Two-Factor Authentication
        </div>
        <div className="flex items-center gap-4 mb-2">
          <Badge variant={twoFA ? "success" : "info"} className={twoFA ? "bg-green-400/20 text-green-300 border-green-400/40" : "bg-blue-400/20 text-blue-300 border-blue-400/40"}>
            {twoFA ? "Enabled" : "Disabled"}
          </Badge>
          <Button
            variant={twoFA ? "secondary" : "primary"}
            className="px-4 py-2"
            onClick={() => setTwoFA(v => !v)}
          >
            {twoFA ? "Disable" : "Enable"}
          </Button>
        </div>
        <div className="text-xs text-white/60">Protect your account with 2FA. (Mock UI)</div>
      </Card>
      {/* API Notifications */}
      <Card className="glassmorphic-card mb-8">
        <div className="font-orbitron text-xl font-bold mb-2 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
          API Notifications
        </div>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 text-white/90">
            <input
              type="checkbox"
              checked={notif.apiErrors}
              onChange={e => setNotif(n => ({ ...n, apiErrors: e.target.checked }))}
              className="accent-green-400 w-5 h-5"
            />
            API Error Alerts
          </label>
          <label className="flex items-center gap-3 text-white/90">
            <input
              type="checkbox"
              checked={notif.apiUsage}
              onChange={e => setNotif(n => ({ ...n, apiUsage: e.target.checked }))}
              className="accent-yellow-400 w-5 h-5"
            />
            Usage Warnings
          </label>
          <label className="flex items-center gap-3 text-white/90">
            <input
              type="checkbox"
              checked={notif.productUpdates}
              onChange={e => setNotif(n => ({ ...n, productUpdates: e.target.checked }))}
              className="accent-blue-400 w-5 h-5"
            />
            Product Updates
          </label>
        </div>
      </Card>
      {/* Delete Account */}
      <Card className="glassmorphic-card mb-8 border border-red-400/40">
        <div className="font-orbitron text-xl font-bold mb-2 bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
          Danger Zone
        </div>
        <div className="text-white/80 mb-3">Permanently delete your account and all associated data. This action cannot be undone.</div>
        <Button
          variant="secondary"
          className="bg-gradient-to-r from-red-400 to-yellow-400 text-black font-bold w-full max-w-xs"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete Account"}
        </Button>
      </Card>
    </div>
  );
}
