import WebSocket from "ws";
const WebSocketServer = WebSocket.Server;
import { IncomingMessage } from "http";
import { getKey, getTierConfig } from "./lib/solanaApiKeyStore";
import { addLog, incrementWsUsage, getUsageForKey } from "./lib/solanaAnalyticsStore";

const PORT = parseInt(process.env.SOLANA_WS_GATEWAY_PORT || "8081");

console.log(`[SolanaWS] Gateway listening on port ${PORT}`);

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (client: WebSocket, req: IncomingMessage) => {
  try {
    const url = new URL(req.url || "", `ws://${req.headers.host}`);
    const pathParts = url.pathname.split("/").filter(Boolean);
    if (pathParts.length < 2 || pathParts[0] !== "v1") {
      client.close(1008, "Invalid URL format");
      return;
    }
    const apiKey = pathParts[1];
    const network = url.searchParams.get("network") === "mainnet" ? "mainnet" : "devnet";
    const keyObj = getKey(apiKey);
    if (!keyObj) {
      client.close(4001, "Invalid API key");
      return;
    }
    const tierConfig = getTierConfig(keyObj.tier);
    if (tierConfig.monthlyWsMessageLimit === 0) {
      client.close(4003, "WebSocket not available on your tier");
      return;
    }
    if (!tierConfig.allowDevnetWs && network === "devnet") {
      client.close(4003, "WebSocket not available on your tier");
      return;
    }
    if (!tierConfig.allowMainnetWs && network === "mainnet") {
      client.close(4003, "WebSocket not available on your tier");
      return;
    }
    // enforce monthly ws message limits
    const usage = getUsageForKey(apiKey);
    const wsUsed = usage?.wsMessages ?? 0;
    if (wsUsed >= tierConfig.monthlyWsMessageLimit) {
      client.close(4004, "WebSocket message limit exceeded for your plan. Please upgrade.");
      return;
    }
    const upstreamUrl =
      network === "mainnet"
        ? process.env.SOLANA_UPSTREAM_MAINNET_WS!
        : process.env.SOLANA_UPSTREAM_DEVNET_WS!;
    if (!upstreamUrl) {
      client.close(4002, "Invalid network");
      return;
    }
    const upstream = new WebSocket(upstreamUrl);
    let open = false;
    upstream.on("open", () => {
      open = true;
      addLog({ key: apiKey, timestamp: Date.now(), method: "WEBSOCKET_CONNECTION", network, success: true, durationMs: 0 });
    });
    upstream.on("message", (data: import("ws").Data) => {
      if (client.readyState === client.OPEN) {
        client.send(data);
      }
    });
    upstream.on("close", () => {
      if (client.readyState === client.OPEN) client.close();
      addLog({ key: apiKey, timestamp: Date.now(), method: "WEBSOCKET_CLOSE", network, success: true, durationMs: 0 });
    });
    upstream.on("error", () => {
      addLog({ key: apiKey, timestamp: Date.now(), method: "WEBSOCKET_ERROR", network, success: false, durationMs: 0 });
      if (client.readyState === client.OPEN) client.close(1011, "Upstream error");
    });
    client.on("message", (data: import("ws").Data) => {
      if (open && upstream.readyState === upstream.OPEN) {
        // increment usage per message
        incrementWsUsage(apiKey, 1);
        const newUsage = getUsageForKey(apiKey)?.wsMessages ?? 0;
        // forward
        upstream.send(data);
        addLog({ key: apiKey, timestamp: Date.now(), method: "WEBSOCKET_MESSAGE", network, success: true, durationMs: 0 });
        // check limit after increment
        if (newUsage >= tierConfig.monthlyWsMessageLimit) {
          // politely close
          if (client.readyState === client.OPEN) client.close(4004, "WebSocket message limit exceeded for your plan. Please upgrade.");
          if (upstream.readyState === upstream.OPEN) upstream.close();
        }
      }
    });
    client.on("close", () => {
      if (upstream.readyState === upstream.OPEN) upstream.close();
      addLog({ key: apiKey, timestamp: Date.now(), method: "WEBSOCKET_CLOSE", network, success: true, durationMs: 0 });
    });
    client.on("error", () => {
      addLog({ key: apiKey, timestamp: Date.now(), method: "WEBSOCKET_ERROR", network, success: false, durationMs: 0 });
    });
  } catch {
    client.close(1011, "Internal error");
  }
});
